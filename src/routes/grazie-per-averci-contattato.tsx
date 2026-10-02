import { createFileRoute, Link } from "@tanstack/react-router";
import { getPageByPath } from "@/lib/content.functions";
import { buildHead } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Prose } from "@/components/site/Prose";

export const Route = createFileRoute("/grazie-per-averci-contattato")({
  loader: () => getPageByPath({ data: { path: "/grazie-per-averci-contattato/" } }),
  head: () =>
    buildHead({
      title: "Grazie per averci contattato | Studio Parotelli",
      description: "Abbiamo ricevuto la tua richiesta: lo Studio Parotelli ti ricontatterà al più presto.",
      path: "/grazie-per-averci-contattato/",
      noindex: true,
    }),
  component: Grazie,
});

function Grazie() {
  const pagina = Route.useLoaderData();
  return (
    <div className="container-page max-w-3xl py-20 md:py-28">
      <p className="eyebrow">Richiesta inviata</p>
      <h1 className="mt-3 font-serif text-4xl md:text-5xl">Grazie per averci contattato</h1>
      <p className="mt-5 text-lg text-muted-foreground">
        Abbiamo ricevuto il tuo messaggio. Un professionista dello studio ti risponderà al più presto.
      </p>
      {pagina?.content_html ? <Prose html={pagina.content_html} className="mt-8" /> : null}
      <div className="mt-10 flex flex-wrap gap-3">
        <Button asChild variant="brand"><Link to="/">Torna alla home</Link></Button>
        <Button asChild variant="line"><Link to="/news/">Leggi le news</Link></Button>
      </div>
    </div>
  );
}
