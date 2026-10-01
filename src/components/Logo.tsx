import { cn } from "../utils/cn";

type LogoProps = {
  /** dark = fond clair (texte bleu marine) · light = fond foncé (texte blanc) */
  variant?: "dark" | "light";
  className?: string;
  compact?: boolean;
};

/** Sigle pyramide + cabine d'ascenseur (identique au favicon). */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="Sigle Pyramide Ascenseur">
      <defs>
        <linearGradient id="pa-g-left" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1D6FE8" />
          <stop offset="1" stopColor="#0B1F3A" />
        </linearGradient>
        <linearGradient id="pa-g-right" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5B96F0" />
          <stop offset="1" stopColor="#1D6FE8" />
        </linearGradient>
      </defs>
      {/* Pyramide à deux facettes */}
      <path d="M32 4 5 57h27V4Z" fill="url(#pa-g-left)" />
      <path d="M32 4v53h27L32 4Z" fill="url(#pa-g-right)" />
      {/* Flèche montante */}
      <path d="M32 15l6.5 8h-13L32 15Z" fill="#fff" />
      {/* Cabine d'ascenseur */}
      <rect x="24.5" y="29" width="15" height="22" rx="2.5" fill="#fff" />
      <line x1="32" y1="31.5" x2="32" y2="48.5" stroke="#0B1F3A" strokeWidth="1.6" />
    </svg>
  );
}

export default function Logo({ variant = "dark", className, compact = false }: LogoProps) {
  const isLight = variant === "light";
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="h-10 w-10 shrink-0" />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "font-display text-[17px] font-extrabold tracking-[0.08em]",
              isLight ? "text-white" : "text-navy",
            )}
          >
            PYRAMIDE
          </span>
          <span
            className={cn(
              "font-display text-[11.5px] font-semibold tracking-[0.34em]",
              isLight ? "text-[#7FB0F7]" : "text-brand",
            )}
          >
            ASCENSEUR
          </span>
        </span>
      )}
    </span>
  );
}
