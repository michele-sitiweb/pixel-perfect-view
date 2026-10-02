import { PageLink } from "@/components/site/PageLink";
import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { servizi, studio } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 bg-anthracite text-anthracite-foreground">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-serif text-xl">Studio Parotelli</p>
          <p className="mt-3 text-sm leading-relaxed text-anthracite-foreground/70">
            Consulenza tributaria, legale e societaria per partite IVA, startup e PMI.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href={studio.facebook}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Facebook"
              className="inline-flex size-9 items-center justify-center border border-anthracite-foreground/20 transition-colors hover:border-brand hover:text-brand"
            >
              <Facebook className="size-4" aria-hidden />
            </a>
            <a
              href={studio.instagram}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Instagram"
              className="inline-flex size-9 items-center justify-center border border-anthracite-foreground/20 transition-colors hover:border-brand hover:text-brand"
            >
              <Instagram className="size-4" aria-hidden />
            </a>
          </div>
        </div>

        <div>
          <p className="eyebrow text-anthracite-foreground/60">Servizi</p>
          <ul className="mt-4 space-y-2 text-sm">
            {servizi.slice(0, 6).map((s) => (
              <li key={s.to}>
                <Link
                  to={s.to}
                  className="text-anthracite-foreground/80 transition-colors hover:text-brand"
                >
                  {s.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/automazione-intelligenza-artificiale/"
                className="text-anthracite-foreground/80 transition-colors hover:text-brand"
              >
                Automazione e AI
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-anthracite-foreground/60">Studio</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <PageLink
                to="/lo-studio-2/"
                className="text-anthracite-foreground/80 transition-colors hover:text-brand"
              >
                Chi siamo
              </PageLink>
            </li>
            <li>
              <Link
                to="/news/"
                className="text-anthracite-foreground/80 transition-colors hover:text-brand"
              >
                News
              </Link>
            </li>
            <li>
              <Link
                to="/contatti/"
                className="text-anthracite-foreground/80 transition-colors hover:text-brand"
              >
                Contatti
              </Link>
            </li>
            <li>
              <PageLink
                to="/cambiare-commercialista/"
                className="text-anthracite-foreground/80 transition-colors hover:text-brand"
              >
                Cambiare commercialista
              </PageLink>
            </li>
            <li>
              <PageLink
                to="/privacy/"
                className="text-anthracite-foreground/80 transition-colors hover:text-brand"
              >
                Privacy e cookie
              </PageLink>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-anthracite-foreground/60">Contatti</p>
          <ul className="mt-4 space-y-3 text-sm text-anthracite-foreground/80">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
              <span>
                {studio.sedeLegale}
                <br />
                {studio.sedeOperativa}
              </span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
              <span>
                <a href={studio.telefonoHref} className="hover:text-brand">
                  {studio.telefono}
                </a>
                <br />
                <a href={studio.whatsappHref} className="hover:text-brand">
                  {studio.cellulare}
                </a>
              </span>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
              <span>
                <a href={`mailto:${studio.email}`} className="hover:text-brand">
                  {studio.email}
                </a>
                <br />
                <a href={`mailto:${studio.pec}`} className="hover:text-brand">
                  {studio.pec}
                </a>
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-anthracite-foreground/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-anthracite-foreground/60 md:flex-row md:items-center md:justify-between">
          <p>
            {studio.ragioneSociale} — P.IVA {studio.piva} — PEC {studio.pec}
          </p>
          <p>© {new Date().getFullYear()} Studio Parotelli. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  );
}
