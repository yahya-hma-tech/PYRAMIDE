import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import Reveal from "./Reveal";
import { cn } from "../utils/cn";

const TESTIMONIALS = [
  {
    initials: "KB",
    name: "Karim B.",
    role: "Syndic de copropriété — Paris 12ᵉ",
    text: "Un dimanche soir, trois résidents bloqués en cabine : le technicien était sur place en 35 minutes, calme et rassurant. Depuis, tout notre parc est sous contrat Pyramide.",
  },
  {
    initials: "SL",
    name: "Sophie L.",
    role: "Gestionnaire d'immeubles — Boulogne",
    text: "Le contrat de maintenance a divisé nos pannes par quatre en deux ans. Les visites sont planifiées, tracées, et le carnet d'entretien numérique nous facilite les assemblées générales.",
  },
  {
    initials: "MD",
    name: "Marc D.",
    role: "Particulier — Vincennes",
    text: "Devis limpide, aucun frais surprise, et une équipe qui prend le temps d'expliquer. Ma mère de 82 ans se sent enfin en sécurité dans son immeuble.",
  },
  {
    initials: "NR",
    name: "Nadia R.",
    role: "Office HLM — Créteil",
    text: "Mise en conformité de 14 appareils menée avec une rigueur exemplaire, sans pénaliser les locataires. Les contrôles techniques ont été validés du premier coup.",
  },
  {
    initials: "TP",
    name: "Thomas P.",
    role: "Responsable de site logistique",
    text: "Modernisation complète de nos deux monte-charges sans arrêter l'activité du site. Planification millimétrée et équipe vraiment professionnelle.",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<number | null>(null);

  const go = (dir: number) =>
    setIndex((i) => (i + dir + TESTIMONIALS.length) % TESTIMONIALS.length);

  useEffect(() => {
    if (paused) return;
    timer.current = window.setInterval(() => go(1), 6500);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [paused]);

  return (
    <section id="temoignages" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand">Témoignages</p>
          <h2 className="text-balance mt-3 font-display text-3xl font-extrabold text-navy sm:text-4xl">
            Ils nous font monter leur confiance
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Note moyenne de 4,9/5 sur plus de 320 avis vérifiés.
          </p>
        </Reveal>

        <Reveal delay={150}>
          <div
            className="relative mx-auto mt-12 max-w-4xl"
            role="region"
            aria-roledescription="carrousel"
            aria-label="Témoignages clients"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <div className="overflow-hidden rounded-[2rem]">
              <div
                className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)]"
                style={{ transform: `translateX(-${index * 100}%)` }}
              >
                {TESTIMONIALS.map((t, i) => (
                  <figure
                    key={t.name}
                    className="w-full shrink-0 px-1"
                    role="group"
                    aria-roledescription="diapositive"
                    aria-label={`${i + 1} sur ${TESTIMONIALS.length}`}
                    aria-hidden={i !== index}
                  >
                    <div className="flex h-full flex-col items-center rounded-[2rem] border border-slate-100 bg-cloud px-7 py-10 text-center sm:px-14">
                      <Quote className="h-9 w-9 text-brand/25" aria-hidden="true" />
                      <div className="mt-4 flex gap-1" aria-label="Note : 5 sur 5">
                        {Array.from({ length: 5 }).map((_, s) => (
                          <Star key={s} className="h-4.5 w-4.5 fill-amber-400 text-amber-400" aria-hidden="true" />
                        ))}
                      </div>
                      <blockquote className="mt-5 max-w-2xl font-display text-[17px] font-medium leading-relaxed text-navy">
                        « {t.text} »
                      </blockquote>
                      <figcaption className="mt-7 flex items-center gap-3.5">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy font-display text-sm font-bold text-white">
                          {t.initials}
                        </span>
                        <span className="text-left">
                          <span className="block font-display text-[15px] font-bold text-navy">{t.name}</span>
                          <span className="block text-[13px] text-slate-500">{t.role}</span>
                        </span>
                      </figcaption>
                    </div>
                  </figure>
                ))}
              </div>
            </div>

            {/* Contrôles */}
            <div className="mt-7 flex items-center justify-center gap-5">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Témoignage précédent"
                className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-slate-200 text-navy transition-all duration-300 hover:-translate-y-0.5 hover:border-brand hover:bg-mist hover:text-brand"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <div className="flex gap-2.5">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Aller au témoignage ${i + 1}`}
                    aria-current={i === index}
                    className={cn(
                      "h-2.5 rounded-full transition-all duration-300",
                      i === index ? "w-8 bg-brand" : "w-2.5 bg-slate-300 hover:bg-brand/50",
                    )}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Témoignage suivant"
                className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-slate-200 text-navy transition-all duration-300 hover:-translate-y-0.5 hover:border-brand hover:bg-mist hover:text-brand"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
