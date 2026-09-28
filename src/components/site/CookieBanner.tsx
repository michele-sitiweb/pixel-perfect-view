import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

const KEY = "sp-cookie-consent";

type Consent = { necessari: true; statistiche: boolean; marketing: boolean };

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [custom, setCustom] = useState(false);
  const [statistiche, setStatistiche] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    if (!window.localStorage.getItem(KEY)) setVisible(true);
  }, []);

  const save = (consent: Consent) => {
    window.localStorage.setItem(KEY, JSON.stringify({ ...consent, data: new Date().toISOString() }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Preferenze cookie"
      className="fixed inset-x-0 bottom-16 z-[60] border-t border-border bg-card p-5 shadow-raised lg:bottom-0"
    >
      <div className="container-page flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl text-sm text-muted-foreground">
          <p className="font-semibold text-foreground">Cookie</p>
          <p className="mt-1">
            Usiamo cookie tecnici necessari al funzionamento del sito e, solo con il tuo consenso,
            cookie di statistica e di marketing. Puoi accettare, rifiutare o scegliere. Dettagli
            nella{" "}
            <Link to="/privacy/" className="underline underline-offset-2">
              pagina privacy
            </Link>
            .
          </p>

          {custom ? (
            <div className="mt-4 space-y-2">
              <label className="flex items-center gap-2 text-foreground">
                <input type="checkbox" checked readOnly className="size-4 accent-[var(--brand)]" />
                Cookie necessari (sempre attivi)
              </label>
              <label className="flex items-center gap-2 text-foreground">
                <input
                  type="checkbox"
                  checked={statistiche}
                  onChange={(e) => setStatistiche(e.target.checked)}
                  className="size-4 accent-[var(--brand)]"
                />
                Statistiche
              </label>
              <label className="flex items-center gap-2 text-foreground">
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  className="size-4 accent-[var(--brand)]"
                />
                Marketing
              </label>
            </div>
          ) : null}
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 lg:w-auto">
          <Button variant="brand" onClick={() => save({ necessari: true, statistiche: true, marketing: true })}>
            Accetta
          </Button>
          <Button
            variant="line"
            onClick={() => save({ necessari: true, statistiche: false, marketing: false })}
          >
            Rifiuta
          </Button>
          <Button
            variant="line"
            onClick={() =>
              custom ? save({ necessari: true, statistiche, marketing }) : setCustom(true)
            }
          >
            {custom ? "Salva scelte" : "Personalizza"}
          </Button>
        </div>
      </div>
    </div>
  );
}
