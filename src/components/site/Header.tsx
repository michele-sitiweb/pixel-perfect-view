import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { servizi, studio } from "@/lib/site";
import { cn } from "@/lib/utils";

const mainNav = [
  { label: "Chi siamo", to: "/lo-studio-2/" },
  { label: "Automazione e AI", to: "/automazione-intelligenza-artificiale/" },
  { label: "News", to: "/news/" },
  { label: "Contatti", to: "/contatti/" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [serviziOpen, setServiziOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const isActive = (to: string) => pathname.replace(/\/?$/, "/") === to;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <div className="container-page flex h-16 items-center justify-between gap-6 md:h-20">
        <Link to="/" className="flex flex-col leading-none" onClick={() => setOpen(false)}>
          <span className="font-serif text-lg font-semibold tracking-tight md:text-xl">
            Studio Parotelli
          </span>
          <span className="mt-1 text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
            Commercialisti · Milano
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          <div
            className="relative"
            onMouseEnter={() => setServiziOpen(true)}
            onMouseLeave={() => setServiziOpen(false)}
          >
            <button
              type="button"
              aria-expanded={serviziOpen}
              onClick={() => setServiziOpen((v) => !v)}
              className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              Servizi
              <ChevronDown className="size-4" aria-hidden />
            </button>
            {serviziOpen ? (
              <div className="absolute left-0 top-full w-[22rem] border border-border bg-card p-2 shadow-raised">
                {servizi.map((s) => (
                  <Link
                    key={s.to}
                    to={s.to}
                    onClick={() => setServiziOpen(false)}
                    className="block rounded-sm px-3 py-2 text-sm text-foreground/85 transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          {mainNav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-foreground",
                isActive(item.to) ? "text-foreground" : "text-foreground/80",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={studio.telefonoHref}
            className="flex items-center gap-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
          >
            <Phone className="size-4" aria-hidden />
            {studio.telefono}
          </a>
          <Button asChild variant="brand">
            <Link to="/contatti/">Preventivo</Link>
          </Button>
        </div>

        <button
          type="button"
          className="-mr-2 inline-flex size-10 items-center justify-center rounded-md lg:hidden"
          aria-label={open ? "Chiudi il menu" : "Apri il menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="container-page flex flex-col py-4">
            <details className="border-b border-border py-1">
              <summary className="cursor-pointer list-none py-3 text-base font-medium">
                Servizi
              </summary>
              <div className="flex flex-col pb-3">
                {servizi.map((s) => (
                  <Link
                    key={s.to}
                    to={s.to}
                    onClick={() => setOpen(false)}
                    className="py-2 pl-3 text-sm text-foreground/80"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            </details>
            {mainNav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="border-b border-border py-4 text-base font-medium"
              >
                {item.label}
              </Link>
            ))}
            <Button asChild variant="brand" size="lg" className="mt-5">
              <Link to="/contatti/" onClick={() => setOpen(false)}>
                Richiedi un preventivo
              </Link>
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
