import { createServerFn } from "@tanstack/react-start";

export type ContactInput = {
  nome: string;
  email: string;
  telefono?: string;
  azienda?: string;
  servizio: string;
  messaggio: string;
  consensoPrivacy: boolean;
  origine?: string;
};

function validate(input: ContactInput): ContactInput {
  const nome = (input.nome ?? "").trim();
  const email = (input.email ?? "").trim();
  const messaggio = (input.messaggio ?? "").trim();
  if (nome.length < 2) throw new Error("Inserisci il tuo nome.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Inserisci un'email valida.");
  if (messaggio.length < 10) throw new Error("Scrivi qualche riga sulla tua richiesta.");
  if (!input.consensoPrivacy) throw new Error("È necessario il consenso al trattamento dei dati.");
  return {
    nome: nome.slice(0, 120),
    email: email.slice(0, 180),
    telefono: (input.telefono ?? "").trim().slice(0, 40),
    azienda: (input.azienda ?? "").trim().slice(0, 150),
    servizio: (input.servizio ?? "Altro").trim().slice(0, 120),
    messaggio: messaggio.slice(0, 4000),
    consensoPrivacy: true,
    origine: (input.origine ?? "/contatti/").slice(0, 200),
  };
}

export const inviaRichiesta = createServerFn({ method: "POST" })
  .inputValidator((input: ContactInput) => validate(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("contact_requests").insert({
      nome: data.nome,
      email: data.email,
      telefono: data.telefono || null,
      azienda: data.azienda || null,
      servizio: data.servizio,
      messaggio: data.messaggio,
      origine: data.origine ?? null,
      consenso_privacy: true,
    });
    if (error) {
      console.error("Salvataggio richiesta non riuscito:", error.message);
      throw new Error("Non siamo riusciti a registrare la richiesta. Riprova tra poco.");
    }
    return { ok: true as const };
  });
