import { useEffect, useState } from "react";
import { Globe } from "lucide-react";

const lingue = [
  { code: "it", label: "IT", nome: "Italiano" },
  { code: "en", label: "EN", nome: "English" },
  { code: "fr", label: "FR", nome: "Français" },
  { code: "de", label: "DE", nome: "Deutsch" },
] as const;

function letturaLingua(): string {
  const m = document.cookie.match(/(?:^|; )googtrans=\/it\/(\w+)/);
  return m?.[1] ?? "it";
}

function caricaTraduttore() {
  if (document.getElementById("gt-script")) return;
  (window as unknown as Record<string, unknown>).googleTranslateElementInit = () => {
    const g = (window as unknown as { google?: any }).google;
    if (g?.translate) new g.translate.TranslateElement({ pageLanguage: "it", autoDisplay: false }, "gt-element");
  };
  const s = document.createElement("script");
  s.id = "gt-script";
  s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  document.body.appendChild(s);
}

/** Traduce l'intero sito (anche i testi originali) nella lingua scelta. */
export function LanguageSelector({ className }: { className?: string }) {
  const [lingua, setLingua] = useState("it");

  useEffect(() => {
    const l = letturaLingua();
    setLingua(l);
    if (l !== "it") caricaTraduttore();
  }, []);

  function cambia(code: string) {
    const host = window.location.hostname;
    const scadenza = code === "it" ? "expires=Thu, 01 Jan 1970 00:00:00 GMT" : "max-age=31536000";
    for (const dominio of ["", `domain=${host};`, `domain=.${host};`]) {
      document.cookie = `googtrans=/it/${code}; path=/; ${dominio} ${scadenza}`;
    }
    window.location.reload();
  }

  return (
    <label className={`relative inline-flex items-center gap-1 text-sm ${className ?? ""}`} translate="no">
      <Globe className="pointer-events-none absolute left-2 size-4 text-muted-foreground" aria-hidden />
      <span className="sr-only">Lingua del sito</span>
      <select
        value={lingua}
        onChange={(e) => cambia(e.target.value)}
        className="notranslate h-9 appearance-none border border-input bg-background py-1 pl-7 pr-2 text-sm font-medium outline-none focus:ring-2 focus:ring-ring/40"
      >
        {lingue.map((l) => (
          <option key={l.code} value={l.code}>
            {l.label} · {l.nome}
          </option>
        ))}
      </select>
      <div id="gt-element" className="hidden" />
    </label>
  );
}
