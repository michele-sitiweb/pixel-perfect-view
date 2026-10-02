import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import type { ErrorComponentProps } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileActionBar, WhatsAppFloat } from "@/components/site/MobileActionBar";
import { CookieBanner } from "@/components/site/CookieBanner";
import { Button } from "@/components/ui/button";

function NotFoundComponent() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="eyebrow">Errore 404</p>
      <h1 className="mt-3 font-serif text-4xl md:text-5xl">Questa pagina non esiste</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        L'indirizzo che hai aperto non corrisponde a nessuna pagina dello studio. Puoi tornare alla
        home, leggere le ultime news o scriverci direttamente.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild variant="brand">
          <Link to="/">Torna alla home</Link>
        </Button>
        <Button asChild variant="line">
          <Link to="/news/">Vai alle news</Link>
        </Button>
        <Button asChild variant="line">
          <Link to="/contatti/">Contattaci</Link>
        </Button>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <h1 className="font-serif text-3xl">La pagina non si è caricata</h1>
      <p className="mt-3 max-w-lg text-muted-foreground">
        Si è verificato un problema temporaneo. Puoi riprovare o tornare alla home.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button
          variant="brand"
          onClick={() => {
            router.invalidate();
            reset();
          }}
        >
          Riprova
        </Button>
        <Button asChild variant="line">
          <a href="/">Torna alla home</a>
        </Button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { property: "og:site_name", content: "Studio Parotelli" },
      { property: "og:locale", content: "it_IT" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Manrope:wght@400;500;600;700&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="it">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isAdmin = pathname.startsWith("/admin");

  return (
    <QueryClientProvider client={queryClient}>
      {isAdmin ? (
        /* Required: nested routes render here. */
        <Outlet />
      ) : (
        <>
          <Header />
          <main className="min-h-[50vh]">
            {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
            <Outlet />
          </main>
          <Footer />
          <MobileActionBar />
          <WhatsAppFloat />
          <CookieBanner />
        </>
      )}
    </QueryClientProvider>
  );
}
