import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { getPageByPath } from "@/lib/content.functions";
import { buildHead, accountingServiceLd, breadcrumbLd } from "@/lib/seo";
import { ContactForm } from "@/components/site/ContactForm";
import { AppointmentBooking } from "@/components/site/AppointmentBooking";
import { Prose } from "@/components/site/Prose";
import { studio } from "@/lib/site";

export const Route = createFileRoute("/contatti")({
  loader: () => getPageByPath({ data: { path: "/contatti/" } }),
  head: ({ loaderData }) =>
    buildHead({
      title: loaderData?.seo_title ?? "Contatti e preventivo | Studio Parotelli Milano",
      description:
        loaderData?.seo_description ??
        "Richiedi un preventivo allo Studio Parotelli: Via Benigno Crespi 19, Milano. Telefono 02 303 106 92, WhatsApp 393 56 55 857.",
      path: "/contatti/",
    }),
  component: Contatti,
});

function Contatti() {
  const pagina = Route.useLoaderData();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(accountingServiceLd) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbLd([{ name: "Home", path: "/" }, { name: "Contatti", path: "/contatti/" }])),
        }}
      />
      <section className="border-b border-border bg-secondary">
        <div className="container-page py-14 md:py-20">
          <p className="eyebrow">Contatti</p>
          <h1 className="mt-3 font-serif text-3xl md:text-5xl">Richiedi un preventivo</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Raccontaci di cosa hai bisogno. Ti ricontattiamo con una proposta chiara.
          </p>
        </div>
      </section>
      <div className="container-page grid gap-12 py-14 md:py-20 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
        <div className="border border-border p-6 md:p-8">
          <ContactForm origine="/contatti/" />
        </div>
        <ul className="space-y-6 text-sm">
          <li className="flex gap-3"><MapPin className="mt-0.5 size-4 text-brand" aria-hidden /><span>{studio.sedeLegale}<br />{studio.sedeOperativa}</span></li>
          <li className="flex gap-3"><Phone className="mt-0.5 size-4 text-brand" aria-hidden /><a href={studio.telefonoHref}>{studio.telefono}</a></li>
          <li className="flex gap-3"><MessageCircle className="mt-0.5 size-4 text-brand" aria-hidden /><a href={studio.whatsappHref} target="_blank" rel="noreferrer noopener">WhatsApp {studio.cellulare}</a></li>
          <li className="flex gap-3"><Mail className="mt-0.5 size-4 text-brand" aria-hidden /><span><a href={`mailto:${studio.email}`}>{studio.email}</a><br />PEC {studio.pec}</span></li>
        </ul>
      </div>
      <section id="appuntamento" className="border-t border-border bg-secondary">
        <div className="container-page py-14 md:py-20">
          <p className="eyebrow">Appuntamenti</p>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl">Prenota un incontro</h2>
          <div className="mt-8 border border-border bg-background p-6 md:p-8"><AppointmentBooking origine="/contatti/" /></div>
        </div>
      </section>
      {pagina?.content_html ? (
        <div className="container-page max-w-3xl pb-10">
          <Prose html={pagina.content_html} />
        </div>
      ) : null}
    </>
  );
}
