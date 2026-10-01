import { Building, CircleCheck, ShieldCheck, Timer, TrendingUp, Users } from "lucide-react";
import Reveal from "./Reveal";
import { useCountUp, useInView } from "../lib/hooks";

const STATS = [
  { icon: TrendingUp, value: 18, suffix: " ans", label: "d'expérience ascenseur" },
  { icon: Timer, value: 4800, suffix: "", label: "interventions réalisées par an", plus: true },
  { icon: Users, value: 1200, suffix: "", label: "clients accompagnés en Île-de-France", plus: true },
  { icon: Building, value: 45, suffix: " min", label: "de délai moyen d'intervention" },
];

const GUARANTEES = [
  "Toutes marques : Otis, Kone, Schindler, TK Elevator…",
  "Pièces d'origine constructeur garanties",
  "Assurance RC professionnelle & décennale",
  "Techniciens formés en continu aux nouvelles normes",
];

function Stat({ icon: Icon, value, suffix, label, plus }: (typeof STATS)[number]) {
  const { ref, inView } = useInView<HTMLDivElement>(0.4);
  const display = useCountUp(value, inView);
  return (
    <div
      ref={ref}
      className="flex h-full flex-col items-center rounded-3xl border border-slate-100 bg-white p-7 text-center shadow-card"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mist text-brand">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <p className="mt-4 font-display text-4xl font-extrabold tracking-tight text-navy">
        {display}
        <span className="text-brand">{suffix}</span>
        {plus && value >= 1000 ? <span className="text-brand">+</span> : null}
      </p>
      <p className="mt-2 text-sm font-medium leading-snug text-slate-600">{label}</p>
    </div>
  );
}

export default function WhyUs() {
  return (
    <section id="pourquoi" className="bg-cloud py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand">
            Pourquoi nous choisir
          </p>
          <h2 className="text-balance mt-3 font-display text-3xl font-extrabold text-navy sm:text-4xl">
            Des chiffres qui parlent d'eux-mêmes
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Syndics, bailleurs, gestionnaires et particuliers nous confient leurs
            ascenseurs pour une raison simple : nous tenons nos délais.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 90}>
              <Stat {...stat} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {GUARANTEES.map((g) => (
              <li
                key={g}
                className="flex items-start gap-3 rounded-2xl border border-brand/10 bg-mist/60 p-4 text-sm font-medium text-navy"
              >
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                {g}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={250} className="mt-8 text-center">
          <p className="inline-flex items-center gap-2 text-sm text-slate-500">
            <CircleCheck className="h-4 w-4 text-emerald-500" aria-hidden="true" />
            Contrôles techniques suivis et carnet d'entretien numérique remis à chaque client.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
