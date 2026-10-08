import { Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, BookOpenCheck, Laptop, Network, ShieldCheck, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageLink } from "@/components/site/PageLink";
import { Prose } from "@/components/site/Prose";

// Frasi riportate testualmente dalla home del sito originale.
const blocchi = [
  {
    icona: BadgeCheck,
    titolo: "Studio commercialista",
    testo:
      "Sei alla ricerca di un commercialista a Milano che lavori al fianco della tua impresa. Quando si sceglie un professionista nel settore è importante che sia in grado di comunicare in modo semplice e chiaro: uno studio commercialista a Milano che sappia fornire esempi pratici e consigliarti.",
  },
  {
    icona: Network,
    titolo: "Lo Studio Parotelli",
    testo:
      "Lo Studio Parotelli è costituito da un network di professionisti specializzati nei diversi settori capaci di garantire ai propri clienti una consulenza completa e dettagliata: la nostra esperienza e professionalità sono al vostro servizio.",
  },
  {
    icona: Laptop,
    titolo: "Consulenza Online",
    testo:
      "Come Studio Parotelli abbiamo sviluppato un’area privata dedicata alla consulenza online del nostro studio di commercialisti a Milano. In questo modo possiamo fornire le risposte ai vostri interrogativi e risolvere pratiche burocratiche in tempi rapidi e con un notevole risparmio di denaro.",
  },
];

const valori = [
  { icona: Target, label: "Precisione" },
  { icona: ShieldCheck, label: "Affidabilità" },
  { icona: BookOpenCheck, label: "Costante aggiornamento sulle normative" },
];

export function HomeAbout({ html }: { html: string | null | undefined }) {
  return (
    <section className="home-about border-t border-border">
      <div className="container-page py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow">Lo studio · Chi siamo</p>
            <h2 className="mt-3 font-serif text-3xl leading-tight md:text-[2.6rem]">
              Commercialisti a Milano, al fianco di privati e imprese
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-foreground/80">
              <strong className="font-semibold text-foreground">Studio Parotelli</strong> è uno studio di commercialisti a Milano che offre ai propri clienti – sia privati che aziende – un servizio di assistenza a 360°. L’approccio a tutto tondo alla risoluzione dei problemi legati all’ambito fiscale, tributario, societario e legale è possibile grazie ad un team altamente qualificato e specializzato in questi ambiti.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="brand" size="lg">
                <Link to="/contatti/">
                  Richiedi una consulenza <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
              <Button asChild variant="line" size="lg">
                <PageLink to="/lo-studio-2/">Conosci lo studio</PageLink>
              </Button>
            </div>
          </div>

          <ol className="divide-y divide-border border-y border-border">
            {blocchi.map((b, i) => (
              <li key={b.titolo} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-4 py-7 md:grid-cols-[3rem_minmax(0,1fr)] md:gap-6">
                <span className="font-serif text-2xl text-muted-foreground">0{i + 1}</span>
                <div>
                  <h3 className="flex items-center gap-2 font-serif text-xl">
                    <b.icona className="size-5 text-brand" aria-hidden strokeWidth={1.5} />
                    {b.titolo}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{b.testo}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-14 bg-secondary px-6 py-8 md:px-10">
          <p className="text-sm text-muted-foreground">
            La varietà dei servizi offerta è accomunata da:
          </p>
          <ul className="mt-5 grid gap-5 sm:grid-cols-3">
            {valori.map((v) => (
              <li key={v.label} className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center bg-background">
                  <v.icona className="size-5 text-brand" aria-hidden strokeWidth={1.5} />
                </span>
                <span className="font-serif text-lg leading-snug">{v.label}</span>
              </li>
            ))}
          </ul>
        </div>

        {html ? (
          <details className="group mt-8 border-b border-border pb-4">
            <summary className="flex cursor-pointer list-none items-center justify-between py-3 text-sm font-medium">
              Leggi la presentazione completa dello studio
              <ArrowRight className="size-4 transition-transform group-open:rotate-90" aria-hidden />
            </summary>
            <Prose html={html} className="mt-4 max-w-3xl" />
          </details>
        ) : null}
      </div>
    </section>
  );
}
