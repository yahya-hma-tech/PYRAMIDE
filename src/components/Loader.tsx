import { useEffect, useState } from "react";
import { cn } from "../utils/cn";
import { usePrefersReducedMotion } from "../lib/hooks";
import { LogoMark } from "./Logo";

/**
 * Écran de chargement : deux portes d'ascenseur bleu marine qui s'ouvrent
 * sur le site, avec le logo Pyramide au centre.
 */
export default function Loader() {
  const reduced = usePrefersReducedMotion();
  const [opening, setOpening] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("overflow-hidden");
    const t1 = window.setTimeout(() => setOpening(true), reduced ? 200 : 800);
    const t2 = window.setTimeout(
      () => {
        setGone(true);
        document.documentElement.classList.remove("overflow-hidden");
      },
      reduced ? 550 : 1850,
    );
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      document.documentElement.classList.remove("overflow-hidden");
    };
  }, [reduced]);

  if (gone) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-navy"
      role="status"
      aria-busy={!opening}
      aria-label="Chargement du site Pyramide Ascenseur"
    >
      {/* Porte gauche */}
      <div
        className={cn(
          "absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#081527] to-navy transition-transform duration-[950ms] ease-[cubic-bezier(0.7,0,0.3,1)]",
          opening && "-translate-x-full",
        )}
      />
      {/* Porte droite */}
      <div
        className={cn(
          "absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-[#081527] to-navy transition-transform duration-[950ms] ease-[cubic-bezier(0.7,0,0.3,1)]",
          opening && "translate-x-full",
        )}
      />
      {/* Joint lumineux entre les portes */}
      <div
        className={cn(
          "absolute inset-y-0 left-1/2 w-px bg-brand/60 transition-opacity duration-300",
          opening && "opacity-0",
        )}
      />

      {/* Logo central */}
      <div
        className={cn(
          "relative z-10 flex flex-col items-center gap-4 transition-all duration-500",
          opening && "scale-90 opacity-0",
        )}
      >
        <LogoMark className="h-20 w-20 drop-shadow-[0_10px_30px_rgba(29,111,232,0.45)]" />
        <div className="text-center leading-none">
          <p className="font-display text-xl font-extrabold tracking-[0.12em] text-white">
            PYRAMIDE
          </p>
          <p className="mt-1.5 font-display text-[11px] font-semibold tracking-[0.4em] text-[#7FB0F7]">
            ASCENSEUR
          </p>
        </div>
        <p className="mt-2 text-xs font-medium tracking-wide text-white/50">
          Ouverture des portes…
        </p>
      </div>
    </div>
  );
}
