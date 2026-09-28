import { Camera } from "lucide-react";
import { cn } from "@/lib/utils";

/** Riquadro segnaposto: verrà sostituito con una foto vera. */
export function PhotoPlaceholder({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 border border-dashed border-foreground/25 bg-secondary p-6 text-center",
        className,
      )}
    >
      <Camera className="size-5 text-muted-foreground" aria-hidden />
      <span className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</span>
    </div>
  );
}
