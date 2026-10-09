import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowDownRight, Briefcase, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageLink } from "@/components/site/PageLink";
import { useHomeDesign } from "@/components/site/HomeDesignProvider";
import { studio } from "@/lib/site";
import office from "@/assets/office-editorial.jpg";

export function HomeOpening() {
  const { design } = useHomeDesign();
  if (design === "classico") return <OpeningClassico />;
  if (design === "luminoso") return <OpeningLuminoso />;
  if (design === "impatto") return <OpeningImpatto />;
  if (design === "atelier") return <OpeningAtelier />;
  if (design === "moderno") return <OpeningModerno />;
  if (design === "prestigio") return <OpeningPrestigio />;
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
const descrizione =
  "Seguiamo partite IVA, startup e PMI nell'aprire, gestire, vendere o chiudere una società. Un unico studio per fisco, lavoro, diritto e adempimenti.";

function OpeningClassico() {
  return (
    <section className="home-opening hero-classico">
      <div className="hero-classico-topbar">
        <div className="container-page flex flex-wrap justify-between gap-2 py-2 text-xs">
          <span>{studio.sedeLegale}</span>
          <a href={studio.telefonoHref} className="inline-flex items-center gap-1"><Phone className="size-3" aria-hidden /> {studio.telefono}</a>
        </div>
      </div>
      <div className="hero-classico-body">
        <img src={office} width={1536} height={1024} alt="" aria-hidden className="hero-classico-img" fetchPriority="high" />
        <div className="container-page relative z-10 flex min-h-[34rem] flex-col items-center justify-center py-20 text-center">
          <p className="font-serif text-6xl italic leading-none md:text-7xl">MP&amp;P</p>
          <p className="mt-4 font-serif text-3xl uppercase tracking-[0.12em] md:text-5xl">Studio Parotelli</p>
          <h1 className="mt-4 text-base font-semibold md:text-lg">Studio commercialista a Milano</h1>
          <p className="mt-2 text-sm italic opacity-80">Consulenza tributaria, legale e societaria</p>
          <p className="hero-classico-motto mt-8 font-serif text-xl italic md:text-2xl">«Precisione, affidabilità e costante aggiornamento»</p>
          <Button asChild size="lg" className="hero-classico-btn mt-10"><Link to="/contatti/">Richiedi una consulenza</Link></Button>
        </div>
      </div>
      <p className="sr-only">{descrizione}</p>
    </section>
  );
}

function OpeningLuminoso() {
  return (
    <section className="home-opening hero-luminoso">
      <div className="container-page grid items-center gap-10 py-16 md:py-24 lg:grid-cols-2">
        <div>
          <span className="inline-block border border-current px-3 py-1 text-xs uppercase opacity-70">Studio Parotelli</span>
          <h1 className="hero-luminoso-title mt-6 text-5xl font-light leading-[1.05] md:text-6xl">
            Studio commercialista Milano per
            <span className="mt-2 flex items-center gap-3 font-semibold"><ArrowDownRight className="hero-luminoso-arrow size-10" aria-hidden strokeWidth={1.5} /> la tua impresa</span>
          </h1>
          <p className="mt-8 max-w-lg text-[0.95rem] leading-relaxed text-foreground/80">{descrizione}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="hero-luminoso-btn"><Link to="/contatti/">Scopri di più <ArrowRight className="size-4" aria-hidden /></Link></Button>
            <Button asChild variant="line" size="lg"><a href={studio.whatsappHref} target="_blank" rel="noreferrer noopener"><MessageCircle className="size-4" aria-hidden /> WhatsApp</a></Button>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="hero-luminoso-badge flex size-64 items-center justify-center rounded-full md:size-80">
            <Briefcase className="size-28 md:size-36" aria-hidden strokeWidth={1.1} />
          </div>
        </div>
      </div>
    </section>
  );
}

function OpeningImpatto() {
  return (
    <section className="home-opening hero-impatto">
      <img src={office} width={1536} height={1024} alt="" aria-hidden className="hero-impatto-img" fetchPriority="high" />
      <div className="container-page relative z-10 grid min-h-[36rem] items-center gap-10 py-20 md:grid-cols-[auto_minmax(0,1fr)]">
        <p className="hero-impatto-vertical hidden font-bold md:block" aria-hidden>Fisco<br />Contabilità<br />Consulenza</p>
        <div>
          <h1 className="text-5xl font-extrabold leading-none md:text-7xl" style={{ fontFamily: "var(--font-sans)" }}>Studio Parotelli</h1>
          <p className="mt-3 text-lg font-semibold">Studio commercialista a Milano</p>
          <p className="mt-8 max-w-md text-lg italic opacity-90">{descrizione}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="hero-impatto-btn rounded-full"><Link to="/contatti/">Contattaci gratuitamente</Link></Button>
            <Button asChild size="lg" className="hero-impatto-btn rounded-full"><a href={studio.telefonoHref}><Phone className="size-4" aria-hidden /> Chiamaci</a></Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function OpeningAtelier() {
  return (
    <section className="home-opening hero-atelier">
      <div className="container-page grid gap-10 py-14 md:py-20 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="hero-atelier-kicker">Studio Parotelli — Milano</p>
          <h1 className="hero-atelier-title mt-6">Studio commercialista <em>a Milano</em></h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">{descrizione}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="brand" size="lg"><Link to="/contatti/">Richiedi un preventivo <ArrowRight className="size-4" aria-hidden /></Link></Button>
            <Button asChild variant="line" size="lg"><a href={studio.whatsappHref} target="_blank" rel="noreferrer noopener"><MessageCircle className="size-4" aria-hidden /> WhatsApp</a></Button>
          </div>
        </div>
        <figure className="hero-atelier-photo lg:col-span-5">
          <img src={office} width={1536} height={1024} alt="Illustrazione di un ambiente professionale contemporaneo" fetchPriority="high" />
          <figcaption>Immagine illustrativa</figcaption>
        </figure>
      </div>
      <div className="border-y border-border">
        <ol className="container-page grid sm:grid-cols-3">
          {[["01", "Contabilità e fiscale", "/attivita-ordinarie/"], ["02", "Consulenza del lavoro", "/consulenza-del-lavoro/"], ["03", "Consulenza legale", "/consulenza-legale/"]].map(([n, l, to]) => (
            <li key={to} className="hero-atelier-index"><PageLink to={to}><span>{n}</span>{l}<ArrowRight className="size-4" aria-hidden /></PageLink></li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function OpeningModerno() {
  return (
    <section className="home-opening hero-moderno">
      <div className="container-page py-10 md:py-14">
        <div className="hero-moderno-grid">
          <div className="hero-moderno-main">
            <p className="hero-moderno-tag">● Consulenza tributaria, legale e societaria</p>
            <h1 className="mt-6">Studio commercialista<br />a Milano.</h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed opacity-80">{descrizione}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="brand" size="lg"><Link to="/contatti/">Richiedi un preventivo <ArrowRight className="size-4" aria-hidden /></Link></Button>
              <Button asChild variant="onDark" size="lg"><a href={studio.telefonoHref}><Phone className="size-4" aria-hidden /> {studio.telefono}</a></Button>
            </div>
          </div>
          <figure className="hero-moderno-photo">
            <img src={office} width={1536} height={1024} alt="Illustrazione di un ambiente professionale contemporaneo" fetchPriority="high" />
            <figcaption>Immagine illustrativa</figcaption>
          </figure>
          <a href={studio.whatsappHref} target="_blank" rel="noreferrer noopener" className="hero-moderno-tile hero-moderno-tile-brand"><MessageCircle className="size-6" aria-hidden /><span>Scrivici su WhatsApp</span></a>
          <a href={`mailto:${studio.email}`} className="hero-moderno-tile"><span className="text-xs uppercase opacity-60">Email</span><span className="break-all">{studio.email}</span></a>
        </div>
      </div>
    </section>
  );
}

function OpeningPrestigio() {
  return (
    <section className="home-opening hero-prestigio">
      <div className="container-page flex flex-col items-center py-16 text-center md:py-24">
        <span className="hero-prestigio-rule" aria-hidden />
        <p className="mt-6 text-xs uppercase tracking-[0.3em] text-muted-foreground">Studio Parotelli · dal cuore di Milano</p>
        <h1 className="hero-prestigio-title mt-6">Studio commercialista<br /><em>a Milano</em></h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">{descrizione}</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="brand" size="lg"><Link to="/contatti/">Richiedi un preventivo</Link></Button>
          <Button asChild variant="line" size="lg"><a href="#appuntamento">Prenota un appuntamento</a></Button>
        </div>
      </div>
      <figure className="hero-prestigio-photo container-page">
        <img src={office} width={1536} height={1024} alt="Illustrazione di un ambiente professionale contemporaneo" fetchPriority="high" />
        <figcaption>Immagine illustrativa</figcaption>
      </figure>
    </section>
  );
}
