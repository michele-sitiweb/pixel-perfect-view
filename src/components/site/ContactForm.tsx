import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { inviaRichiesta } from "@/lib/contact.functions";
import { Button } from "@/components/ui/button";
import { serviziPerForm, studio } from "@/lib/site";

export function ContactForm({
  origine,
  servizioIniziale,
}: {
  origine?: string;
  servizioIniziale?: string;
}) {
  const navigate = useNavigate();
  const invia = useServerFn(inviaRichiesta);
  const [errore, setErrore] = useState<string | null>(null);
  const [invio, setInvio] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fd = new FormData(form);
    setErrore(null);
    setInvio(true);
    try {
      await invia({
        data: {
          nome: String(fd.get("nome") ?? ""),
          email: String(fd.get("email") ?? ""),
          telefono: String(fd.get("telefono") ?? ""),
          azienda: String(fd.get("azienda") ?? ""),
          attivita: String(fd.get("attivita") ?? ""),
          servizio: String(fd.get("servizio") ?? "Altro"),
          messaggio: String(fd.get("messaggio") ?? ""),
          consensoPrivacy: fd.get("privacy") === "on",
          origine: origine ?? "/contatti/",
        },
      });
      form.reset();
      navigate({ to: "/grazie-per-averci-contattato/" });
    } catch (e) {
      setErrore(e instanceof Error ? e.message : "Invio non riuscito. Riprova.");
    } finally {
      setInvio(false);
    }
  }

  const inputClass =
    "w-full border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-foreground/40 focus:ring-2 focus:ring-ring/40";

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium">Nome e cognome *</span>
        <input name="nome" required autoComplete="name" className={inputClass} />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium">Email *</span>
        <input name="email" type="email" required autoComplete="email" className={inputClass} />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium">Telefono</span>
        <input name="telefono" type="tel" autoComplete="tel" className={inputClass} />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium">Azienda</span>
        <input name="azienda" autoComplete="organization" className={inputClass} />
      </label>
      <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
        <span className="font-medium">Di cosa ti occupi? *</span>
        <input name="attivita" required placeholder="Es. libero professionista, e-commerce, ristorazione…" className={inputClass} />
      </label>
      <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
        <span className="font-medium">Servizio di interesse</span>
        <select
          name="servizio"
          defaultValue={servizioIniziale ?? "Altro"}
          className={inputClass}
        >
          {serviziPerForm.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
        <span className="font-medium">Come possiamo aiutarti? *</span>
        <textarea name="messaggio" required rows={5} className={inputClass} />
      </label>

      <label className="flex items-start gap-3 text-sm text-muted-foreground sm:col-span-2">
        <input
          type="checkbox"
          name="privacy"
          required
          className="mt-1 size-4 accent-[var(--brand)]"
        />
        <span>
          Ho letto l'informativa e acconsento al trattamento dei dati per essere ricontattato. *
        </span>
      </label>

      {errore ? (
        <p role="alert" className="text-sm text-destructive sm:col-span-2">
          {errore}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
        <Button type="submit" variant="brand" size="lg" disabled={invio}>
          {invio ? "Invio in corso…" : "Invia richiesta"}
        </Button>
        <span className="text-sm text-muted-foreground">
          oppure chiama il{" "}
          <a href={studio.telefonoHref} className="underline underline-offset-2">
            {studio.telefono}
          </a>
        </span>
      </div>
    </form>
  );
}
