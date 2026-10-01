import { Link } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { studio } from "@/lib/site";

export function ContactAside() {
  return (
    <aside className="border border-border bg-secondary p-6 lg:sticky lg:top-28">
      <p className="eyebrow">Parliamone</p>
      <p className="mt-2 font-serif text-xl">Serve una valutazione sul tuo caso?</p>
      <p className="mt-2 text-sm text-muted-foreground">
        Raccontaci la situazione: ti rispondiamo con i passaggi concreti e i costi.
      </p>
      <div className="mt-5 flex flex-col gap-2">
        <Button asChild variant="brand">
          <Link to="/contatti/">Richiedi un preventivo</Link>
        </Button>
        <Button asChild variant="line">
          <a href={studio.whatsappHref} target="_blank" rel="noreferrer noopener">
            <MessageCircle className="size-4" aria-hidden />
            Scrivi su WhatsApp
          </a>
        </Button>
      </div>
      <ul className="mt-6 space-y-3 border-t border-border pt-5 text-sm text-muted-foreground">
        <li className="flex gap-3">
          <Phone className="mt-0.5 size-4 shrink-0" aria-hidden />
          <a href={studio.telefonoHref} className="hover:text-foreground">
            {studio.telefono}
          </a>
        </li>
        <li className="flex gap-3">
          <Mail className="mt-0.5 size-4 shrink-0" aria-hidden />
          <a href={`mailto:${studio.email}`} className="hover:text-foreground">
            {studio.email}
          </a>
        </li>
        <li className="flex gap-3">
          <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
          <span>{studio.sedeLegale}</span>
        </li>
      </ul>
    </aside>
  );
}
