import { Star } from "lucide-react";

// Citazioni autentiche dalle recensioni Google dello studio (testo come pubblicato, troncato).
const recensioni = [
  { nome: "Massimiliano He", quando: "3 anni fa", testo: "Sono stato dallo studio per avere una consulenza dal Dottor Del Fiume e mi ha risolto tutti i dubbi del caso. Lui e lo…" },
  { nome: "Cristina Giuliani", quando: "3 anni fa", testo: "Competenti, professionali e sempre disponibili. Avevo chiesto una consulenza e sono stata subito accolta con grand…" },
  { nome: "Sabrina Bottaro", quando: "3 anni fa", testo: "Consiglio questo studio professionale di commercialisti per l'alto livello di qualità del servizio proposto e offerto, per…" },
  { nome: "eleonora tirloni", quando: "3 anni fa", testo: "Sempre disponibili , preparati , più di un semplice commercialista" },
];

const mapsUrl = "https://www.google.com/maps/search/?api=1&query=Studio+Parotelli+Milano";

export function Reviews() {
  return (
    <section className="home-reviews bg-secondary">
      <div className="container-page py-16 md:py-24">
        <div className="text-center">
          <p className="eyebrow">Recensioni Google</p>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl">Cosa dicono di noi i clienti</h2>
        </div>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {recensioni.map((r) => (
            <li key={r.nome} className="flex flex-col items-center border border-border bg-background p-6 text-center">
              <span className="flex size-16 items-center justify-center rounded-full bg-anthracite font-serif text-2xl text-anthracite-foreground" aria-hidden>
                {r.nome.charAt(0).toUpperCase()}
              </span>
              <p className="mt-4 font-semibold">{r.nome}</p>
              <p className="text-sm text-muted-foreground">{r.quando}</p>
              <div className="mt-3 flex gap-0.5 text-brand" aria-label="5 stelle su 5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" aria-hidden />
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed">“{r.testo}”</p>
              <a href={mapsUrl} target="_blank" rel="noreferrer" className="mt-auto pt-4 text-sm text-muted-foreground underline underline-offset-4">
                Leggi di più su Google
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
