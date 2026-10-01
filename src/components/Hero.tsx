import { ArrowRight, PhoneCall, ShieldCheck, Star, Siren, Timer } from "lucide-react";
import ElevatorAnimation from "./ElevatorAnimation";
import Reveal from "./Reveal";
import { SITE, phoneLink } from "../config";

const TRUST = [
  { icon: Star, label: "4,9/5 — +320 avis clients" },
  { icon: ShieldCheck, label: "Techniciens certifiés & assurés" },
  { icon: Timer, label: "Intervention moyenne < 45 min" },
];

export default function Hero() {
  return (
    <section id="accueil" className="relative overflow-hidden bg-gradient-to-b from-mist/70 via-white to-white">
      {/* décor */}
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-brand/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:px-8 lg:pb-28 lg:pt-20">
        {/* Texte */}
        <div>
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white/80 px-4 py-1.5 text-[13px] font-semibold text-brand shadow-sm backdrop-blur">
              <Siren className="h-4 w-4 text-ember" aria-hidden="true" />
              Urgence ascenseur 24h/24 – 7j/7 · {SITE.serviceArea}
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="text-balance mt-6 font-display text-4xl font-extrabold leading-[1.12] text-navy sm:text-5xl lg:text-[3.4rem]">
              Réparation, maintenance &amp; installation d'ascenseurs{" "}
              <span className="relative inline-block text-brand">
                sans attente
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 220 12"
                  aria-hidden="true"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M3 9C60 3 160 3 217 8"
                    fill="none"
                    stroke="#1D6FE8"
                    strokeWidth="5"
                    strokeLinecap="round"
                    opacity="0.35"
                  />
                </svg>
              </span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
              Panne, personne bloquée ou projet d'installation : nos techniciens
              interviennent <strong className="font-semibold text-navy">jour et nuit</strong>,
              avec un délai moyen constaté de <strong className="font-semibold text-navy">45 minutes</strong>.
              Devis gratuit, tarifs transparents, toutes marques.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-9 flex flex-col gap-3.5 sm:flex-row sm:items-center">
              <a
                href="#devis"
                className="group inline-flex items-center justify-center gap-2.5 rounded-2xl bg-brand px-7 py-4 font-display text-[15px] font-semibold text-white shadow-lift transition-all duration-300 hover:-translate-y-1 hover:bg-brand-600"
              >
                Demander un devis gratuit
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </a>
              <a
                href={phoneLink}
                className="btn-pulse inline-flex items-center justify-center gap-2.5 rounded-2xl bg-ember px-7 py-4 font-display text-[15px] font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-ember-600"
                aria-label={`Appeler maintenant le ${SITE.phoneDisplay}`}
              >
                <PhoneCall className="h-5 w-5" aria-hidden="true" />
                Appeler maintenant
              </a>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <ul className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm font-medium text-slate-600">
              {TRUST.map((item) => (
                <li key={item.label} className="flex items-center gap-2">
                  <item.icon className="h-4.5 w-4.5 text-brand" aria-hidden="true" />
                  {item.label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Ascenseur animé */}
        <Reveal delay={200} className="relative">
          <div className="relative mx-auto max-w-[480px]">
            <div
              className="absolute -inset-4 rounded-[2.4rem] bg-gradient-to-br from-brand/15 via-transparent to-navy/10"
              aria-hidden="true"
            />
            <div className="relative rounded-[2rem] border border-slate-100 bg-white p-5 shadow-soft">
              <div className="mb-3 flex items-center justify-between">
                <p className="flex items-center gap-2 text-[13px] font-semibold text-navy">
                  <span className="dot-blink h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
                  Cabine de démonstration
                </p>
                <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                  8 étages · en service
                </p>
              </div>
              <ElevatorAnimation />
            </div>

            {/* Badges flottants */}
            <div
              className="animate-soft-float absolute -right-4 top-10 hidden items-center gap-2 rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-soft sm:flex"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-mist text-brand">
                <Timer className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-xs font-semibold leading-tight text-navy">
                &lt; 45 min
                <span className="block font-medium text-slate-500">délai moyen</span>
              </span>
            </div>
            <div
              className="animate-soft-float absolute -left-5 bottom-12 hidden items-center gap-2 rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-soft [animation-delay:1.4s] sm:flex"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-ember/10 text-ember">
                <Siren className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-xs font-semibold leading-tight text-navy">
                Urgence 24/7
                <span className="block font-medium text-slate-500">ligne dédiée</span>
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
