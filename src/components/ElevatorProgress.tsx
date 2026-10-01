import { ChevronsUp } from "lucide-react";
import { useScrollProgress } from "../lib/hooks";

const TRACK_H = 240;
const CABIN_H = 34;

/**
 * « Ascenseur » latéral : la cabine monte au fil du défilement.
 * Un clic ramène tout en haut de la page.
 */
export default function ElevatorProgress() {
  const progress = useScrollProgress();
  const level = Math.min(9, Math.round(progress * 9));

  return (
    <div
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-2.5 lg:flex"
      aria-hidden="false"
    >
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="group relative flex flex-col items-center"
        aria-label={`Progression de la page : ${Math.round(progress * 100)} % — retour en haut`}
        title="Retour en haut"
      >
        <span
          className="relative block w-11 rounded-full border border-slate-200 bg-white/90 shadow-card backdrop-blur"
          style={{ height: TRACK_H }}
        >
          {/* cran d'étages */}
          {Array.from({ length: 9 }).map((_, i) => (
            <span
              key={i}
              className="absolute inset-x-2 h-px bg-slate-200"
              style={{ top: `${((i + 1) / 10) * 100}%` }}
            />
          ))}
          {/* cabine */}
          <span
            className="absolute left-1/2 flex w-[34px] -translate-x-1/2 items-center justify-center rounded-lg bg-brand text-white shadow-[0_6px_16px_-4px_rgba(29,111,232,0.55)] transition-[top] duration-200 ease-out group-hover:bg-ember"
            style={{ height: CABIN_H, top: progress * (TRACK_H - CABIN_H - 6) + 3 }}
          >
            <ChevronsUp className="h-4.5 w-4.5" aria-hidden="true" />
          </span>
        </span>
        <span className="mt-2 rounded-full bg-navy px-2 py-0.5 font-display text-[10px] font-bold text-white">
          {level === 0 ? "RDC" : `Niv. ${level}`}
        </span>
      </button>
    </div>
  );
}
