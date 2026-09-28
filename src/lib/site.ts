export const SITE_URL = "https://studioparotelli.com";

export const studio = {
  nome: "Studio Parotelli",
  ragioneSociale: "SP Consulting S.r.l.",
  piva: "13446740964",
  sedeLegale: "Via Benigno Crespi 19, 20159 Milano (MI)",
  sedeOperativa: "Sede operativa in Brianza",
  citta: "Milano",
  telefono: "02 303 106 92",
  telefonoHref: "tel:+390230310692",
  cellulare: "393 56 55 857",
  whatsapp: "393565655857",
  whatsappHref:
    "https://wa.me/393565655857?text=" +
    encodeURIComponent("Buongiorno, vorrei informazioni sui vostri servizi."),
  email: "info@studioparotelli.com",
  pec: "spconsulting10@pec.it",
  facebook: "https://www.facebook.com/studioparotelli",
  instagram: "https://www.instagram.com/studioparotelli",
} as const;

export type NavItem = { label: string; to: string };

export const servizi: NavItem[] = [
  { label: "Contabilità e fiscale", to: "/attivita-ordinarie/" },
  { label: "Consulenza del lavoro", to: "/consulenza-del-lavoro/" },
  { label: "Consulenza legale", to: "/consulenza-legale/" },
  { label: "Costituzione Srls", to: "/costituzione-srls/" },
  { label: "Societario", to: "/societario/" },
  { label: "Cessione quote societarie", to: "/cessione-quote-societarie/" },
  { label: "Responsabilità enti e società", to: "/responsabilita-enti-e-societa/" },
  { label: "Fatturazione elettronica", to: "/fatturazione-elettronica/" },
  { label: "Registrazione marchi e brevetti", to: "/registrazione-marchi-e-brevetti/" },
  { label: "Aprire una partita IVA forfettaria", to: "/aprire-una-partita-iva-forfettaria/" },
];

export const altrePagine: NavItem[] = [
  { label: "Penale societario e tributario", to: "/penale-societario-e-tributario/" },
  { label: "Cambiare commercialista", to: "/cambiare-commercialista/" },
  { label: "Consulenza online", to: "/consulenza-online/" },
  { label: "Anatocismo bancario", to: "/anatocismo-bancario/" },
  { label: "Organo di controllo", to: "/organo-di-controllo/" },
  { label: "Revisione legale", to: "/revisione-legale/" },
  { label: "Domande di ottenimento fondi", to: "/domande-di-ottenimento-fondi/" },
  { label: "D.Lgs. 231/2001", to: "/decreto-legislativo-8-giugno-2001-n-231/" },
  { label: "Startup innovative", to: "/startup-innovative/" },
  { label: "Conservazione sostitutiva", to: "/conservazione-sostitutiva/" },
  { label: "Liquidazione senza notaio", to: "/liquidazione-senza-notaio/" },
  { label: "Liquidazione con notaio", to: "/liquidazione-con-notaio/" },
  { label: "Chiusura società (anche con debiti)", to: "/chiusura-societa-anche-con-debiti/" },
];

export const team: { nome: string; ruolo: string; to: string }[] = [
  { nome: "Dott. Paolo Castella", ruolo: "Dottore commercialista", to: "/dott-paolo-castella/" },
  { nome: "Dott.ssa Elisa Cremon", ruolo: "Consulente", to: "/dottoressa-elisa-cremon/" },
  { nome: "Avv. Andrea Lagati", ruolo: "Avvocato", to: "/avvocato-andrea-lagati/" },
];

export const serviziPerForm = [
  ...servizi.map((s) => s.label),
  "Automazione e AI",
  "Altro",
];

export function absoluteUrl(path: string) {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function formatDataIt(value: string | Date) {
  const d = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

export function tempoDiLettura(html: string) {
  const parole = html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(parole / 200));
}
