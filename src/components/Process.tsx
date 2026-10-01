import { FileCheck, PhoneCall, Search, Wrench } from "lucide-react";
import Reveal from "./Reveal";

const STEPS = [
  {
    icon: PhoneCall,
    num: "01",
    title: "Contact",
    text: "Appelez la ligne d'urgence 24/7 ou décrivez votre besoin via le formulaire : prise en charge immédiate.",
  },
  {
    icon: Search,
    num: "02",
    title: "Diagnostic",
    text: "Un technicien identifie la panne ou audite votre installation sur place, avec mesures et photos.",
  },
  {
    icon: FileCheck,
    num: "03",
    title: "Devis gratuit",
    text: "Chiffrage clair, poste par poste, envoyé sous 24 h ouvrées. Sans aucun engagement de votre part.",
  },
  {
    icon: Wrench,
    num: "04",
    title: "Intervention",
    text: "Réparation, maintenance ou installation réalisée dans les règles de l'art, avec rapport détaillé.",
  },
];

export default function Process() {
  return (
    <section id="processus" className="relative overflow-hidden bg-navy py-20 lg:py-28">
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-brand/15 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#7FB0F7]">
            Comment ça marche
          </p>
          <h2 className="text-balance mt-3 font-display text-3xl font-extrabold text-white sm:text-4xl">
            Une intervention limpide, en 4 étapes
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-300">
            Pas d'opacité, pas de mauvaises surprises : vous savez toujours où en est votre dossier.
          </p>
        </Reveal>

        <ol className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {/* ligne de connexion */}
          <div
            className="absolute left-0 right-0 top-7 hidden border-t-2 border-dashed border-white/15 lg:block"
            aria-hidden="true"
          />
          {STEPS.map((step, i) => (
            <Reveal as="li" key={step.num} delay={i * 110}>
              <div className="group relative h-full rounded-3xl border border-white/10 bg-white/5 p-7 pt-10 backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:border-brand/40 hover:bg-white/10">
                <span className="absolute -top-7 left-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand shadow-lift transition-transform duration-300 group-hover:scale-110">
                  <step.icon className="h-6.5 w-6.5 text-white" aria-hidden="true" />
                </span>
                <span className="absolute right-6 top-5 font-display text-4xl font-extrabold text-white/10 transition-colors duration-300 group-hover:text-white/20">
                  {step.num}
                </span>
                <h3 className="font-display text-lg font-bold text-white">{step.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-300">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
