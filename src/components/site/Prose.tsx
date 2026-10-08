import { cn } from "@/lib/utils";

/** Pulisce solo il "contorno" tecnico di WordPress (stili, script, commenti del builder); il testo resta intatto. */
function pulisci(html: string): string {
  // Lo slider di WordPress ripete le stesse frasi più volte: lo si salta, il testo vero inizia dopo.
  const fineSlider = html.lastIndexOf("n2-");
  if (fineSlider > -1) {
    const inizio = html.slice(fineSlider).search(/<(h[1-6]|p)[\s>]/i);
    if (inizio > -1) html = html.slice(fineSlider + inizio);
  }
  return html
    .replace(/<(\/?)h1\b/gi, "<$1h2")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\s(style|class|id|data-[\w-]+)="[^"]*"/gi, "")
    .replace(/(src|href)="\/wp-content\//g, '$1="https://studioparotelli.com/wp-content/')
    .replace(/<a\b[^>]*>\s*<\/a>/gi, "")
    .replace(/<(p|div|span|h\d)>\s*(&nbsp;|<br\s*\/?>)*\s*<\/\1>/gi, "");
}

/** Rende il testo originale importato dal sito esistente, senza modificarlo. */
export function Prose({ html, className }: { html: string; className?: string }) {
  return (
    <div
      className={cn("prose-studio", className)}
      // I contenuti provengono dal nostro stesso archivio, già ripuliti in fase di importazione.
      dangerouslySetInnerHTML={{ __html: pulisci(html) }}
    />
  );
}
