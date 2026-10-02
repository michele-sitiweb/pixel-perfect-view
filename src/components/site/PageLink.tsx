import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

/**
 * Collegamento a una pagina importata dal sito esistente.
 * L'indirizzo resta identico, con la barra finale.
 */
export function PageLink({
  to,
  className,
  children,
  onClick,
}: {
  to: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  const splat = to.replace(/^\//, "").replace(/\/$/, "");
  return (
    <Link to="/$/" params={{ _splat: splat }} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
