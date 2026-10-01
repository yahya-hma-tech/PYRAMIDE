import { useState } from "react";
import { ChevronDown, MessageCircleQuestion, PhoneCall } from "lucide-react";
import Reveal from "./Reveal";
import { SITE, phoneLink } from "../config";
import { cn } from "../utils/cn";

const FAQS = [
  {
    q: "En combien de temps intervenez-vous en urgence ?",
    a: "Notre délai moyen constaté est de 45 minutes en Île-de-France, 24h/24 et 7j/7. Les situations avec personnes bloquées en cabine sont toujours traitées en priorité absolue.",
  },
  {
    q: "Intervenez-vous sur toutes les marques d'ascenseurs ?",
    a: "Oui. Nos techniciens sont formés multimarques : Otis, Kone, Schindler, TK Elevator (ThyssenKrupp), Sodimas, CEA, Sorel et la plupart des appareils anciens, y compris hydrauliques et monte-charges.",
  },
  {
    q: "Le devis est-il vraiment gratuit et sans engagement ?",
    a: "Absolument. Après un premier échange téléphonique, nous réalisons si besoin une visite technique gratuite, puis nous vous envoyons un chiffrage détaillé poste par poste. Vous restez libre d'accepter ou non.",
  },
  {
    q: "Que comprend un contrat d'entretien Pyramide ?",
    a: "Selon la formule choisie (Essentiel, Confort ou Premium) : visites périodiques programmées, graissage et réglages, contrôles de sécurité, dépannage prioritaire 24/7, pièces d'usure courantes et carnet d'entretien numérique.",
  },
  {
    q: "Des personnes sont bloquées dans l'ascenseur : que faire ?",
    a: "Rassurez-les et demandez-leur de rester à l'intérieur de la cabine : c'est l'endroit le plus sûr. Elles ne doivent jamais forcer les portes. Appelez immédiatement notre ligne d'urgence : le technicien reste en contact avec elles jusqu'à leur dégagement.",
  },
  {
    q: "Pouvez-vous mettre mon ascenseur aux normes ?",
    a: "Oui. Nous réalisons l'audit complet, chiffrons les travaux de mise en conformité (sécurité des portes, éclairage, interphonie, accessibilité PMR, protection incendie) et constituons les dossiers pour les organismes de contrôle.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-cloud py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8">
        <Reveal>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand">FAQ</p>
          <h2 className="text-balance mt-3 font-display text-3xl font-extrabold text-navy sm:text-4xl">
            Les questions qu'on nous pose le plus souvent
          </h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            Vous ne trouvez pas la réponse à votre question ? Notre équipe vous répond
            au téléphone, sans menu interminable.
          </p>
          <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-brand/15 bg-white p-6 shadow-card">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mist text-brand">
              <MessageCircleQuestion className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <p className="font-display text-lg font-bold text-navy">Une autre question ?</p>
              <p className="mt-1 text-sm text-slate-600">
                Conseiller disponible {SITE.hours.toLowerCase()} — urgences 24h/24.
              </p>
            </div>
            <a
              href={phoneLink}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-600"
            >
              <PhoneCall className="h-4.5 w-4.5" aria-hidden="true" />
              {SITE.phoneDisplay}
            </a>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="space-y-4">
            {FAQS.map((item, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={item.q}
                  className={cn(
                    "overflow-hidden rounded-2xl border bg-white transition-all duration-300",
                    isOpen ? "border-brand/30 shadow-card" : "border-slate-100",
                  )}
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    >
                      <span className="font-display text-[15.5px] font-semibold text-navy">
                        {item.q}
                      </span>
                      <span
                        className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                          isOpen ? "rotate-180 bg-brand text-white" : "bg-mist text-brand",
                        )}
                      >
                        <ChevronDown className="h-4.5 w-4.5" aria-hidden="true" />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    className={cn(
                      "grid transition-all duration-300",
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-[15px] leading-relaxed text-slate-600">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
