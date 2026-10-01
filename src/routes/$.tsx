import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { getPageByPath } from "@/lib/content.functions";
import { buildHead, breadcrumbLd, ldScript, stripHtml } from "@/lib/seo";
import { Prose } from "@/components/site/Prose";
import { ContactAside } from "@/components/site/ContactAside";
import { PhotoPlaceholder } from "@/components/site/PhotoPlaceholder";
import { Button } from "@/components/ui/button";
import { studio } from "@/lib/site";

export const Route = createFileRoute("/$")({
  loader: async ({ params }) => {
    const path = `/${(params._splat ?? "").replace(/^\/|\/$/g, "")}/`;
    const page = await getPageByPath({ data: { path } });
    if (!page) throw notFound();
    return { page, path };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Pagina non disponibile" }, { name: "robots", content: "noindex" }] };
    }
    const { page, path } = loaderData;
    return buildHead({
      title: page.seo_title ?? `${page.title} — Studio Parotelli`,
      description: page.seo_description ?? stripHtml(page.excerpt ?? page.content_html),
      path,
    });
  },
  component: PaginaImportata,
});

function PaginaImportata() {
  const { page, path } = Route.useLoaderData();
  const vuota = stripHtml(page.content_html, 40).length < 20;

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: page.title, path },
            ]),
          ),
        }}
      />

      <section className="border-b border-border bg-secondary">
        <div className="container-page py-14 md:py-20">
          <nav aria-label="Percorso" className="eyebrow mb-4 flex gap-2">
            <Link to="/" className="hover:text-foreground">
              Home
            </Link>
            <span aria-hidden>/</span>
            <span className="text-foreground">{page.title}</span>
          </nav>
          <h1 className="max-w-3xl font-serif text-3xl leading-tight md:text-5xl">{page.title}</h1>
          {page.excerpt ? (
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{page.excerpt}</p>
          ) : null}
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="brand" size="lg">
              <Link to="/contatti/">Richiedi un preventivo</Link>
            </Button>
            <Button asChild variant="line" size="lg">
              <a href={studio.whatsappHref} target="_blank" rel="noreferrer noopener">
                Scrivici su WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>

      <div className="container-page grid gap-12 py-14 lg:grid-cols-[minmax(0,1fr)_20rem] md:py-20">
        <div>
          {vuota ? (
            <div className="border border-dashed border-foreground/25 bg-secondary p-8">
              <p className="font-serif text-xl">Testo in arrivo</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Questa pagina esiste sul sito ma non ha ancora un testo pubblicato. Inviateci il
                contenuto e lo inseriamo qui, mantenendo lo stesso indirizzo.
              </p>
            </div>
          ) : (
            <Prose html={page.content_html} />
          )}
        </div>
        <ContactAside />
      </div>

      <section className="bg-anthracite text-anthracite-foreground">
        <div className="container-page flex flex-col items-start gap-6 py-14 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-serif text-2xl text-anthracite-foreground md:text-3xl">
              Vuoi capire come procedere nel tuo caso?
            </h2>
            <p className="mt-2 max-w-xl text-sm text-anthracite-foreground/70">
              Prima valutazione senza impegno con un professionista dello studio.
            </p>
          </div>
          <Button asChild variant="brand" size="lg">
            <Link to="/contatti/">Parla con lo studio</Link>
          </Button>
        </div>
      </section>

    </>
  );
}
