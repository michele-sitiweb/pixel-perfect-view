import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bot,
  Building2,
  FileCheck2,
  Gavel,
  MessageCircle,
  Receipt,
  Scale,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";
import { getPageByPath, listPosts } from "@/lib/content.functions";
import { buildHead, accountingServiceLd, breadcrumbLd } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Prose } from "@/components/site/Prose";
import { PageLink } from "@/components/site/PageLink";
import { PhotoPlaceholder } from "@/components/site/PhotoPlaceholder";
import { PostCardItem } from "@/components/site/PostCardItem";
import { ContactForm } from "@/components/site/ContactForm";
import { servizi, studio, team } from "@/lib/site";
import { HomeOpening } from "@/components/site/HomeOpening";
import { useHomeDesign } from "@/components/site/HomeDesignProvider";

const TITOLO = "Studio commercialista a Milano | Studio Parotelli";
const DESCRIZIONE =
  "Studio di dottori commercialisti, avvocati e consulenti del lavoro a Milano: contabilità, fiscale, societario, lavoro e consulenza legale per partite IVA, startup e PMI.";

export const Route = createFileRoute("/")({
  loader: async () => {
    const [pagina, ultimi] = await Promise.all([
      getPageByPath({ data: { path: "/" } }),
      listPosts({ data: { page: 1, perPage: 3 } }),
    ]);
    return { pagina, ultimi: ultimi.items };
  },
  head: () => buildHead({ title: TITOLO, description: DESCRIZIONE, path: "/" }),
  component: Home,
});

const icone = [
  Receipt,
  Users,
  Scale,
  Building2,
  Workflow,
  FileCheck2,
  ShieldCheck,
  Receipt,
  Gavel,
  Sparkles,
];

function Home() {
  const { pagina, ultimi } = Route.useLoaderData();
  const { design } = useHomeDesign();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(accountingServiceLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbLd([{ name: "Home", path: "/" }])),
        }}
      />

      <div className={`home-content home-content-${design}`} data-home-design={design}>
      <HomeOpening />

      {/* Servizi */}
      <section className="home-services bg-secondary">
        <div className="container-page py-16 md:py-24">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Servizi</p>
              <h2 className="mt-3 max-w-2xl font-serif text-3xl md:text-4xl">
                Tutto quello che serve a un'impresa, in un unico studio
              </h2>
            </div>
            <Button asChild variant="line">
              <Link to="/contatti/">Chiedi quale serve a te</Link>
            </Button>
          </div>

          <ul className="mt-10 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {servizi.map((s, i) => {
              const Icona = icone[i % icone.length] ?? Receipt;
              return (
                <li key={s.to} className="bg-background">
                  <PageLink
                    to={s.to}
                    className="flex h-full flex-col gap-3 p-6 transition-colors hover:bg-secondary"
                  >
                    <Icona className="size-5 text-brand" aria-hidden strokeWidth={1.5} />
                    <span className="font-serif text-lg">{s.label}</span>
                    <span className="mt-auto inline-flex items-center gap-1 text-sm text-muted-foreground">
                      Scopri <ArrowRight className="size-3.5" aria-hidden />
                    </span>
                  </PageLink>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Automazione e AI */}
      <section className="home-ai bg-anthracite text-anthracite-foreground">
        <div className="container-page grid gap-10 py-16 md:py-24 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow text-anthracite-foreground/60">Novità</p>
            <h2 className="mt-3 font-serif text-3xl text-anthracite-foreground md:text-4xl">
              Automazione e intelligenza artificiale per la tua amministrazione
            </h2>
            <p className="mt-5 text-anthracite-foreground/75">
              Mettiamo ordine nei flussi documentali e riduciamo il lavoro manuale: fatture,
              scadenze, prima nota e controllo di gestione. Strumenti scelti caso per caso, con
              regole chiare su dati e riservatezza.
            </p>
            <Button asChild variant="brand" size="lg" className="mt-8">
              <Link to="/automazione-intelligenza-artificiale/">
                Vedi come lavoriamo
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </div>
          <ul className="grid gap-px bg-anthracite-foreground/15 sm:grid-cols-2">
            {[
              { t: "Fatture e documenti", d: "Raccolta e archiviazione automatica, meno scambi di email." },
              { t: "Scadenze", d: "Promemoria e controlli periodici sugli adempimenti." },
              { t: "Prima nota", d: "Riconciliazioni assistite sui movimenti bancari." },
              { t: "Report", d: "Numeri aggiornati su margini, incassi e costi." },
            ].map((item) => (
              <li key={item.t} className="bg-anthracite p-6">
                <Bot className="size-5 text-brand" aria-hidden strokeWidth={1.5} />
                <p className="mt-3 font-serif text-lg text-anthracite-foreground">{item.t}</p>
                <p className="mt-2 text-sm text-anthracite-foreground/70">{item.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Studio: testo originale del sito */}
      {pagina?.content_html ? (
        <section className="home-about container-page py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <div>
              <p className="eyebrow">Lo studio</p>
              <h2 className="mt-3 font-serif text-3xl md:text-4xl">Chi siamo</h2>
              <Button asChild variant="line" className="mt-6">
                <PageLink to="/lo-studio-2/">Conosci lo studio</PageLink>
              </Button>
            </div>
            <Prose html={pagina.content_html} />
          </div>
        </section>
      ) : null}

      {/* Team */}
      <section className="home-team bg-secondary">
        <div className="container-page py-16 md:py-24">
          <p className="eyebrow">Professionisti</p>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl">Le persone dello studio</h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((p) => (
              <li key={p.to} className="border border-border bg-background p-6">
                <PhotoPlaceholder label="foto del professionista" className="aspect-[4/3]" />
                <p className="mt-5 font-serif text-lg">{p.nome}</p>
                <p className="mt-1 text-sm text-muted-foreground">{p.ruolo}</p>
                <PageLink
                  to={p.to}
                  className="mt-4 inline-flex items-center gap-1 text-sm underline underline-offset-4"
                >
                  Profilo <ArrowRight className="size-3.5" aria-hidden />
                </PageLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Ultimi articoli */}
      {ultimi.length > 0 ? (
        <section className="home-news container-page py-16 md:py-24">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">News</p>
              <h2 className="mt-3 font-serif text-3xl md:text-4xl">Ultimi aggiornamenti</h2>
            </div>
            <Button asChild variant="line">
              <Link to="/news/">Tutte le news</Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {ultimi.map((post) => (
              <PostCardItem key={post.id} post={post} />
            ))}
          </div>
        </section>
      ) : null}

      {/* Contatti */}
      <section id="contattaci" className="home-contact border-t border-border bg-secondary">
        <div className="container-page grid gap-12 py-16 md:py-24 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div>
            <p className="eyebrow">Contatti</p>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl">Richiedi un preventivo</h2>
            <p className="mt-4 text-muted-foreground">
              Scrivici la tua situazione: ti rispondiamo con i passaggi concreti, i tempi e i costi.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              <li>{studio.sedeLegale}</li>
              <li>{studio.sedeOperativa}</li>
              <li>
                <a href={studio.telefonoHref} className="hover:text-foreground">
                  {studio.telefono}
                </a>{" "}
                ·{" "}
                <a href={studio.whatsappHref} className="hover:text-foreground">
                  {studio.cellulare}
                </a>
              </li>
            </ul>
          </div>
          <div className="border border-border bg-background p-6 md:p-8">
            <ContactForm origine="/" />
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
