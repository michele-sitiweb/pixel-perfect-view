import { cn } from "@/lib/utils";

/** Rende il testo originale importato dal sito esistente, senza modificarlo. */
export function Prose({ html, className }: { html: string; className?: string }) {
  return (
    <div
      className={cn("prose-studio", className)}
      // I contenuti provengono dal nostro stesso archivio, già ripuliti in fase di importazione.
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
