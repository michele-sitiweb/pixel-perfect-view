import { Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageLink } from "@/components/site/PageLink";
import { useHomeDesign } from "@/components/site/HomeDesignProvider";
import { studio } from "@/lib/site";
import office from "@/assets/office-editorial.jpg";

export function HomeOpening() {
  const { design } = useHomeDesign();
  return (
    <section className={`home-opening home-opening-${design}`}>
      <div className="home-opening-inner container-page">
        <div className="home-opening-copy min-w-0">
          <p className="eyebrow">Consulenza tributaria, legale e societaria</p>
          <p className="home-brand font-serif">Studio Parotelli</p>
          <h1 className="home-title font-serif">Studio commercialista <span>a Milano</span></h1>
          <p className="home-description text-muted-foreground">
            Seguiamo partite IVA, startup e PMI nell'aprire, gestire, vendere o chiudere una
            società. Un unico studio per fisco, lavoro, diritto e adempimenti.
          </p>
          <div className="home-actions flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="brand" size="lg"><Link to="/contatti/">Richiedi un preventivo <ArrowRight className="size-4 shrink-0" aria-hidden /></Link></Button>
            <Button asChild variant="line" size="lg"><a href={studio.whatsappHref} target="_blank" rel="noreferrer noopener"><MessageCircle className="size-4 shrink-0" aria-hidden /> Scrivici su WhatsApp</a></Button>
          </div>
          {design === "servizi" ? (
            <div className="home-quick-links grid gap-0 border-t border-border sm:grid-cols-3">
              <PageLink to="/attivita-ordinarie/">Contabilità e fiscale <ArrowRight className="size-4" aria-hidden /></PageLink>
              <PageLink to="/consulenza-del-lavoro/">Consulenza del lavoro <ArrowRight className="size-4" aria-hidden /></PageLink>
              <PageLink to="/consulenza-legale/">Consulenza legale <ArrowRight className="size-4" aria-hidden /></PageLink>
            </div>
          ) : null}
        </div>
        <figure className="home-opening-photo">
          <img src={office} width={1536} height={1024} alt="Illustrazione di un ambiente professionale contemporaneo" fetchPriority="high" />
          <figcaption>Immagine illustrativa</figcaption>
        </figure>
      </div>
      <div className="home-contact-strip">
        <dl className="container-page grid gap-5 py-5 sm:grid-cols-3">
          <div className="min-w-0"><dt className="eyebrow">Dove</dt><dd className="mt-1 text-sm">{studio.sedeLegale}</dd></div>
          <div><dt className="eyebrow">Telefono</dt><dd className="mt-1 text-sm"><a href={studio.telefonoHref}>{studio.telefono}</a></dd></div>
          <div className="min-w-0"><dt className="eyebrow">Email</dt><dd className="mt-1 break-words text-sm"><a href={`mailto:${studio.email}`}>{studio.email}</a></dd></div>
        </dl>
      </div>
    </section>
  );
}