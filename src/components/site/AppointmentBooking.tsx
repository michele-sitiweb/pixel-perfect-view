import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { CalendarDays } from "lucide-react";
import { inviaRichiesta } from "@/lib/contact.functions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const orari = ["09:30", "10:30", "11:30", "14:30", "15:30", "16:30", "17:30"];

function prossimiGiorni(n: number): Date[] {
  const out: Date[] = [];
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  while (out.length < n) {
    d.setDate(d.getDate() + 1);
    const g = d.getDay();
    if (g !== 0 && g !== 6) out.push(new Date(d));
  }
  return out;
}

export function AppointmentBooking({ origine = "/contatti/" }: { origine?: string }) {
  const navigate = useNavigate();
  const invia = useServerFn(inviaRichiesta);
  const [giorni, setGiorni] = useState<Date[]>([]);
  const [giorno, setGiorno] = useState<number | null>(null);
  const [ora, setOra] = useState<string | null>(null);
  const [modalita, setModalita] = useState("In studio");
  const [errore, setErrore] = useState<string | null>(null);
  const [invio, setInvio] = useState(false);

  useEffect(() => setGiorni(prossimiGiorni(10)), []);
  const fmt = useMemo(() => new Intl.DateTimeFormat("it-IT", { weekday: "short", day: "numeric", month: "short" }), []);

  const inputClass = "w-full border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/40";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (giorno === null || !ora) return setErrore("Scegli giorno e orario.");
    const fd = new FormData(e.currentTarget);
    const data = new Intl.DateTimeFormat("it-IT", { dateStyle: "full" }).format(giorni[giorno]);
    setErrore(null);
    setInvio(true);
    try {
      await invia({
        data: {
          nome: String(fd.get("nome") ?? ""),
          email: String(fd.get("email") ?? ""),
          telefono: String(fd.get("telefono") ?? ""),
          attivita: String(fd.get("attivita") ?? ""),
          servizio: "Appuntamento",
          messaggio: `Richiesta appuntamento: ${data} alle ${ora} (${modalita}).\n${String(fd.get("note") ?? "")}`,
          consensoPrivacy: fd.get("privacy") === "on",
          origine: `${origine}#appuntamento`,
        },
      });
      navigate({ to: "/grazie-per-averci-contattato/" });
    } catch (err) {
      setErrore(err instanceof Error ? err.message : "Invio non riuscito.");
    } finally {
      setInvio(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6">
      <div>
        <p className="flex items-center gap-2 text-sm font-medium"><CalendarDays className="size-4 text-brand" aria-hidden /> 1. Scegli il giorno</p>
        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
          {giorni.map((d, i) => (
            <button key={d.toISOString()} type="button" onClick={() => setGiorno(i)}
              className={cn("border px-2 py-3 text-sm capitalize transition-colors", giorno === i ? "border-foreground bg-foreground text-background" : "border-border bg-background hover:border-foreground/40")}>
              {fmt.format(d)}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-sm font-medium">2. Scegli l'orario</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {orari.map((o) => (
            <button key={o} type="button" onClick={() => setOra(o)}
              className={cn("border px-4 py-2 text-sm transition-colors", ora === o ? "border-brand bg-brand text-brand-foreground" : "border-border bg-background hover:border-foreground/40")}>
              {o}
            </button>
          ))}
        </div>
        <div className="mt-3 flex gap-4 text-sm">
          {["In studio", "Videochiamata", "Telefono"].map((m) => (
            <label key={m} className="flex items-center gap-2">
              <input type="radio" name="modalita" checked={modalita === m} onChange={() => setModalita(m)} className="accent-[var(--brand)]" /> {m}
            </label>
          ))}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <p className="text-sm font-medium sm:col-span-2">3. I tuoi dati</p>
        <input name="nome" required placeholder="Nome e cognome *" className={inputClass} />
        <input name="email" type="email" required placeholder="Email *" className={inputClass} />
        <input name="telefono" type="tel" placeholder="Telefono" className={inputClass} />
        <input name="attivita" required placeholder="Di cosa ti occupi? *" className={inputClass} />
        <textarea name="note" rows={3} placeholder="Argomento dell'incontro" className={cn(inputClass, "sm:col-span-2")} />
        <label className="flex items-start gap-3 text-sm text-muted-foreground sm:col-span-2">
          <input type="checkbox" name="privacy" required className="mt-1 size-4 accent-[var(--brand)]" />
          <span>Acconsento al trattamento dei dati per essere ricontattato. *</span>
        </label>
      </div>
      {errore ? <p role="alert" className="text-sm text-destructive">{errore}</p> : null}
      <p className="text-xs text-muted-foreground">La richiesta viene confermata dallo studio via email o telefono.</p>
      <Button type="submit" variant="brand" size="lg" disabled={invio} className="justify-self-start">
        {invio ? "Invio in corso…" : "Richiedi appuntamento"}
      </Button>
    </form>
  );
}
