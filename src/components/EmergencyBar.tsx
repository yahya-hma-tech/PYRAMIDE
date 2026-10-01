import { PhoneCall, Siren } from "lucide-react";
import { SITE, phoneLink } from "../config";

/** Barre d'urgence tout en haut de la page. */
export default function EmergencyBar() {
  return (
    <div className="bg-navy text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 text-[13px] sm:px-6 lg:px-8">
        <p className="flex min-w-0 items-center gap-2">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-70" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-ember" />
          </span>
          <Siren className="h-4 w-4 shrink-0 text-ember" aria-hidden="true" />
          <span className="truncate font-medium">
            Service d'urgence <strong className="font-semibold">24h/24 – 7j/7</strong>
            <span className="hidden sm:inline"> — dépannage ascenseur express</span>
          </span>
        </p>
        <a
          href={phoneLink}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-ember px-3.5 py-1.5 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-ember-600 sm:px-4"
          aria-label={`Appeler Pyramide Ascenseur au ${SITE.phoneDisplay}`}
        >
          <PhoneCall className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="hidden md:inline">{SITE.phoneDisplay}</span>
          <span className="md:hidden">Appeler</span>
        </a>
      </div>
    </div>
  );
}
