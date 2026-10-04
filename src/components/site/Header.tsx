import { useState } from "react";
import { PageLink } from "@/components/site/PageLink";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { servizi, studio } from "@/lib/site";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo-mpp.png.asset.json";
import { HomeDesignSelector } from "@/components/site/HomeDesignProvider";

const mainNav = [
    { label: "Automazione e AI", to: "/automazione-intelligenza-artificiale/" },
  { label: "News", to: "/news/" },
  { label: "Contatti", to: "/contatti/" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [serviziOpen, setServiziOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const isActive = (to: string) => pathname.replace(/\/?$/, "/") === to;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="container-page grid h-16 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 md:h-20 xl:flex xl:justify-between">
        <Link to="/" className="flex min-w-0 items-center gap-3 leading-none" onClick={() => setOpen(false)}>
          <img src={logo.url} width={165} height={109} alt="MP&P — Studio Parotelli" className="h-11 w-[67px] shrink-0 object-contain" />
          <span className="flex min-w-0 flex-col">
          <span className="truncate font-serif text-base font-semibold md:text-lg">
            Studio Parotelli
          </span>
          <span className="mt-1 text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
            Commercialisti · Milano
          </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0 xl:flex">
          <div
            className="relative"
            onMouseEnter={() => setServiziOpen(true)}
            onMouseLeave={() => setServiziOpen(false)}
          >
            <Button variant="ghost"
              type="button"
              aria-expanded={serviziOpen}
              onClick={() => setServiziOpen((v) => !v)}
              className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              Servizi
              <ChevronDown className="size-4" aria-hidden />
            </Button>
            {serviziOpen ? (
              <div className="absolute left-0 top-full w-[22rem] border border-border bg-card p-2 shadow-raised">
                {servizi.map((s) => (
                  <PageLink
                    key={s.to}
                    to={s.to}
                    onClick={() => setServiziOpen(false)}
                    className="block rounded-sm px-3 py-2 text-sm text-foreground/85 transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    {s.label}
                  </PageLink>
                ))}
              </div>
            ) : null}
          </div>

          <PageLink to="/lo-studio-2/" className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground">
            Chi siamo
          </PageLink>
          {mainNav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-foreground",
                isActive(item.to) ? "text-foreground" : "text-foreground/80",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 xl:flex">
          <a
            href={studio.telefonoHref}
            className="hidden items-center gap-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground 2xl:flex"
          >
            <Phone className="size-4" aria-hidden />
            {studio.telefono}
          </a>
          <Button asChild variant="brand">
            <Link to="/contatti/">Preventivo</Link>
          </Button>
          {pathname === "/" ? <HomeDesignSelector /> : null}
        </div>

        <Button variant="ghost" size="icon"
          type="button"
          className="-mr-2 inline-flex size-10 items-center justify-center rounded-md xl:hidden"
          aria-label={open ? "Chiudi il menu" : "Apri il menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
        </Button>
      </div>

      {pathname === "/" ? <div className="container-page flex items-center justify-end gap-2 border-t border-border py-2 xl:hidden"><Button asChild variant="brand" size="sm"><Link to="/contatti/">Preventivo</Link></Button><HomeDesignSelector /></div> : null}

      {open ? (
        <div className="max-h-[70dvh] overflow-y-auto border-t border-border bg-background xl:hidden">
          <nav className="container-page flex flex-col py-4">
            <details className="border-b border-border py-1">
              <summary className="cursor-pointer list-none py-3 text-base font-medium">
                Servizi
              </summary>
              <div className="flex flex-col pb-3">
                {servizi.map((s) => (
                  <PageLink
                    key={s.to}
                    to={s.to}
                    onClick={() => setOpen(false)}
                    className="py-2 pl-3 text-sm text-foreground/80"
                  >
                    {s.label}
                  </PageLink>
                ))}
              </div>
            </details>
            <PageLink to="/lo-studio-2/" onClick={() => setOpen(false)} className="border-b border-border py-4 text-base font-medium">
              Chi siamo
            </PageLink>
            {mainNav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="border-b border-border py-4 text-base font-medium"
              >
                {item.label}
              </Link>
            ))}
            <Button asChild variant="brand" size="lg" className="mt-5">
              <Link to="/contatti/" onClick={() => setOpen(false)}>
                Richiedi un preventivo
              </Link>
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
