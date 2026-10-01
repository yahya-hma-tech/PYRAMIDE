import { Award, FileText, ShieldCheck, Zap } from "lucide-react";
import Reveal from "./Reveal";
import { SITE } from "../config";

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Sécurité d'abord",
    text: "Aucune intervention ne se termine sans contrôle complet des organes de sécurité.",
  },
  {
    icon: Zap,
    title: "Réactivité",
    text: "Des équipes d'astreinte positionnées sur tout le territoire, jour et nuit.",
  },
  {
    icon: FileText,
    title: "Transparence",
    text: "Devis détaillé avant chaque travaux, aucun supplément surprise.",
  },
  {
    icon: Award,
    title: "Expertise",
    text: "Techniciens certifiés, formés en continu aux évolutions normatives.",
  },
];

export default function About() {
  return (
    <section id="apropos" className="bg-white py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        {/* Collage photos */}
        <Reveal className="relative">
          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] shadow-soft">
              <img
                src="https://images.pexels.com/photos/8986038/pexels-photo-8986038.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
                alt="Technicien de Pyramide Ascenseur en tenue de protection lors d'une opération de maintenance"
                className="h-[400px] w-full object-cover lg:h-[480px]"
                width="1200"
                height="627"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="absolute -bottom-8 -right-4 hidden w-52 overflow-hidden rounded-3xl border-8 border-white shadow-soft sm:block lg:-right-8">
              <img
                src="https://images.pexels.com/photos/34007236/pexels-photo-34007236.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
                alt="Gros plan sur la machinerie d'un ascenseur en cours de réglage"
                className="h-40 w-full object-cover"
                width="1200"
                height="627"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="absolute -left-4 top-8 rounded-2xl bg-navy px-5 py-4 text-white shadow-soft lg:-left-8">
              <p className="font-display text-3xl font-extrabold leading-none text-white">
                {new Date().getFullYear() - SITE.founded}
                <span className="text-brand"> ans</span>
              </p>
              <p className="mt-1 text-xs font-medium text-slate-300">au service des ascenseurs</p>
            </div>
          </div>
        </Reveal>

        {/* Texte */}
        <div>
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand">À propos</p>
            <h2 className="text-balance mt-3 font-display text-3xl font-extrabold text-navy sm:text-4xl">
              L'ascensoriste de confiance des copropriétés et entreprises d'Île-de-France
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-5 leading-relaxed text-slate-600">
              Fondée en {SITE.founded} par deux techniciens passionnés,{" "}
              <strong className="font-semibold text-navy">{SITE.name}</strong> est née d'un
              constat simple : trop d'ascenseurs en panne attendaient des jours avant d'être
              dépannés. Nous avons bâti l'entreprise autour d'une promesse — répondre vite,
              réparer bien, et tout expliquer.
            </p>
            <p className="mt-4 leading-relaxed text-slate-600">
              Aujourd'hui, nos 12 techniciens certifiés entretiennent plus de 400 appareils et
              réalisent près de 5 000 interventions par an : dépannage d'urgence, contrats
              d'entretien pour syndics et bailleurs, installations neuves et mises en conformité.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <blockquote className="mt-7 rounded-r-2xl border-l-4 border-brand bg-mist/60 px-6 py-5">
              <p className="font-display text-[17px] font-semibold leading-relaxed text-navy">
                « Notre mission : que plus personne ne reste bloqué entre deux étages — ni dans un
                ascenseur, ni dans ses démarches. »
              </p>
              <footer className="mt-2 text-sm font-medium text-slate-500">
                — Karim Haddad, fondateur
              </footer>
            </blockquote>
          </Reveal>
          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            {VALUES.map((value, i) => (
              <Reveal key={value.title} delay={250 + i * 80}>
                <div className="flex h-full gap-4 rounded-2xl border border-slate-100 bg-cloud p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/25 hover:bg-white hover:shadow-card">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mist text-brand">
                    <value.icon className="h-5.5 w-5.5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-[15px] font-bold text-navy">{value.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{value.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
