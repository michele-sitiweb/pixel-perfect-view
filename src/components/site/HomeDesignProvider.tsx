import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type HomeDesign = "editoriale" | "panoramica" | "essenziale" | "servizi";
export const homeDesigns: { value: HomeDesign; label: string }[] = [
  { value: "editoriale", label: "01 · Editoriale" },
  { value: "panoramica", label: "02 · Panoramica" },
  { value: "essenziale", label: "03 · Essenziale" },
  { value: "servizi", label: "04 · Servizi" },
];
const Context = createContext<{ design: HomeDesign; setDesign: (value: HomeDesign) => void }>({ design: "editoriale", setDesign: () => {} });

export function HomeDesignProvider({ children }: { children: ReactNode }) {
  const [design, updateDesign] = useState<HomeDesign>("editoriale");
  useEffect(() => {
    try {
      const saved = localStorage.getItem("sp-home-design");
      const match = homeDesigns.find((item) => item.value === saved);
      if (match) updateDesign(match.value);
    } catch { /* Storage may be disabled. */ }
  }, []);
  function setDesign(value: HomeDesign) {
    updateDesign(value);
    try { localStorage.setItem("sp-home-design", value); } catch { /* Selection still works without storage. */ }
  }
  return <Context.Provider value={{ design, setDesign }}>{children}</Context.Provider>;
}

export function useHomeDesign() { return useContext(Context); }

export function HomeDesignSelector() {
  const { design, setDesign } = useHomeDesign();
  return (
    <select
      aria-label="Versione della home"
      value={design}
      onChange={(event) => {
        const match = homeDesigns.find((item) => item.value === event.target.value);
        if (match) setDesign(match.value);
      }}
      className="h-10 w-[158px] min-w-0 rounded-md border border-input bg-background px-2 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {homeDesigns.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
    </select>
  );
}