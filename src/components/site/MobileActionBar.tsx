import { MessageCircle, Phone } from "lucide-react";
import { studio } from "@/lib/site";

/** Su telefono i pulsanti WhatsApp e chiamata restano sempre visibili. */
export function MobileActionBar() {
  return (
    <>
      <div className="h-16 lg:hidden" aria-hidden />
      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 border-t border-border bg-background lg:hidden">
        <a
          href={studio.telefonoHref}
          className="flex items-center justify-center gap-2 py-4 text-sm font-semibold"
        >
          <Phone className="size-4" aria-hidden />
          Chiama
        </a>
        <a
          href={studio.whatsappHref}
          target="_blank"
          rel="noreferrer noopener"
          className="flex items-center justify-center gap-2 bg-brand py-4 text-sm font-semibold text-brand-foreground"
        >
          <MessageCircle className="size-4" aria-hidden />
          WhatsApp
        </a>
      </div>
    </>
  );
}

/** Bottone WhatsApp flottante su desktop. */
export function WhatsAppFloat() {
  return (
    <a
      href={studio.whatsappHref}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Scrivici su WhatsApp"
      className="fixed bottom-6 right-6 z-40 hidden size-14 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-raised transition-transform hover:scale-105 lg:flex"
    >
      <MessageCircle className="size-6" aria-hidden />
    </a>
  );
}
