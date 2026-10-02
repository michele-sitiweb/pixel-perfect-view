import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, FileText, CalendarClock, Landmark, BarChart3, Lock } from "lucide-react";
import { buildHead, breadcrumbLd } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/site/ContactForm";

const PATH = "/automazione-intelligenza-artificiale/";

export const Route = createFileRoute("/automazione-intelligenza-artificiale")({
  head: () =>
    buildHead({
      title: "Automazione e intelligenza artificiale per le imprese | Studio Parotelli",
      description:
        "Lo Studio Parotelli aiuta PMI e partite IVA a ridurre il lavoro amministrativo manuale con automazioni e strumenti di intelligenza artificiale, nel rispetto della riservatezza dei dati.",
      path: PATH,
    }),
  component: Automazione,
});

const ambiti = [
  { icon: FileText, t: "Documenti e fatture", d: "Raccolta automatica di fatture e ricevute, archiviazione ordinata e meno scambi di email." },
  { icon: CalendarClock, t: "Scadenze e adempimenti", d: "Calendario condiviso, promemoria e controlli periodici sulle scadenze fiscali." },
  { icon: Landmark, t: "Banca e prima nota", d: "Riconciliazione assistita dei movimenti bancari con le registrazioni contabili." },
  { icon: BarChart3, t: "Controllo di gestione", d: "Report periodici su incassi, costi e margini per decidere con dati aggiornati." },
];

const passi = [
  { t: "Analisi", d: "Mappiamo i flussi amministrativi attuali e individuiamo dove si perde tempo." },
  { t: "Proposta", d: "Indichiamo gli strumenti adatti, i tempi e i costi, senza vincoli." },
  { t: "Attivazione", d: "Configuriamo le automazioni e formiamo chi le userà in azienda." },
  { t: "Verifica", d: "Controlliamo i risultati e correggiamo dove serve." },
];

function Automazione() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbLd([{ name: "Home", path: "/" }, { name: "Automazione e AI", path: PATH }])),
        }}
      />
      <section className="border-b border-border bg-secondary">
        <div className="container-page py-16 md:py-24">
          <p className="eyebrow">Automazione e AI</p>
          <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-tight md:text-5xl">
            Automazione e intelligenza artificiale per l'amministrazione della tua impresa
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Meno lavoro manuale su documenti, scadenze e contabilità. Scegliamo con te gli strumenti
            utili, li configuriamo e restiamo il riferimento professionale per fisco e adempimenti.
          </p>
          <Button asChild variant="brand" size="lg" className="mt-8">
            <a href="#richiesta">Parliamone <ArrowRight className="size-4" aria-hidden /></a>
          </Button>
        </div>
      </section>

      <section className="container-page py-16 md:py-24">
        <h2 className="font-serif text-3xl md:text-4xl">Dove interveniamo</h2>
        <ul className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-2">
          {ambiti.map(({ icon: Icon, t, d }) => (
            <li key={t} className="bg-background p-6">
              <Icon className="size-5 text-brand" strokeWidth={1.5} aria-hidden />
              <h3 className="mt-3 font-serif text-xl">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-anthracite text-anthracite-foreground">
        <div className="container-page py-16 md:py-24">
          <h2 className="font-serif text-3xl text-anthracite-foreground md:text-4xl">Come lavoriamo</h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-4">
            {passi.map((p, i) => (
              <li key={p.t} className="border-t border-anthracite-foreground/20 pt-5">
                <span className="text-sm text-brand">0{i + 1}</span>
                <h3 className="mt-2 font-serif text-xl text-anthracite-foreground">{p.t}</h3>
                <p className="mt-2 text-sm text-anthracite-foreground/70">{p.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-page py-16 md:py-24">
        <div className="max-w-3xl border border-dashed border-foreground/25 bg-secondary p-8">
          <Lock className="size-5 text-muted-foreground" aria-hidden />
          <h2 className="mt-3 font-serif text-2xl">Dati e riservatezza</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Testo da confermare dallo studio: quali strumenti vengono usati, dove sono conservati i
            dati, chi vi ha accesso e come viene rispettato il segreto professionale.
          </p>
        </div>
      </section>

      <section id="richiesta" className="border-t border-border bg-secondary">
        <div className="container-page grid gap-10 py-16 md:py-24 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="font-serif text-3xl">Vuoi capire cosa si può automatizzare?</h2>
            <p className="mt-4 text-muted-foreground">Descrivici come gestite oggi l'amministrazione.</p>
            <Link to="/contatti/" className="mt-4 inline-block text-sm underline underline-offset-4">Altri contatti</Link>
          </div>
          <div className="border border-border bg-background p-6 md:p-8">
            <ContactForm origine={PATH} servizioIniziale="Automazione e AI" />
          </div>
        </div>
      </section>
    </>
  );
}
