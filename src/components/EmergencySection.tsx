import { CheckCircle2, PhoneCall, Siren, TriangleAlert } from "lucide-react";
import Reveal from "./Reveal";
import { SITE, phoneLink, whatsappLink } from "../config";

const POINTS = [
  "Personnes bloquées dégagées en priorité absolue",
  "Ligne d'urgence dédiée, réponse immédiate jour et nuit",
  "Camion-atelier équipé : pièces des grandes marques à bord",
  "Rapport d'intervention détaillé envoyé sous 24 h",
];

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

export default function EmergencySection() {
  return (
    <section id="urgence" className="relative overflow-hidden bg-navy py-20 lg:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, #fff 0 2px, transparent 2px 34px)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-brand/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* Contenu */}
        <div>
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-ember/30 bg-ember/10 px-4 py-1.5 text-[13px] font-semibold text-ember">
              <Siren className="h-4 w-4" aria-hidden="true" />
              Service d'urgence 24h/24 – 7j/7
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-balance mt-5 font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              Une panne d'ascenseur ? Un technicien chez vous{" "}
              <span className="text-ember">en moins de 45 minutes</span>.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-5 max-w-xl leading-relaxed text-slate-300">
              Ascenseur immobilisé, portes bloquées, personnes coincées en cabine :
              nos équipes d'astreinte prennent la route à toute heure, week-ends et
              jours fériés compris. Une seule priorité : remettre votre ascenseur en
              service, en sécurité, le plus vite possible.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <ul className="mt-7 space-y-3">
              {POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3 text-[15px] text-slate-200">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={400}>
            <div className="mt-9 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <p className="text-sm font-medium text-slate-300">
                Ligne d'urgence — appel direct technicien
              </p>
              <a
                href={phoneLink}
                className="mt-1 block font-display text-3xl font-extrabold tracking-tight text-white transition-colors hover:text-ember sm:text-4xl"
                aria-label={`Urgence : appeler le ${SITE.phoneDisplay}`}
              >
                {SITE.phoneDisplay}
              </a>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a
                  href={phoneLink}
                  className="btn-pulse inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-ember px-6 py-3.5 font-display text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-ember-600"
                >
                  <PhoneCall className="h-4.5 w-4.5" aria-hidden="true" />
                  Appeler le dépannage
                </a>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-display text-sm font-semibold text-navy transition-all duration-300 hover:-translate-y-0.5 hover:bg-mist"
                >
                  <WhatsAppIcon className="h-4.5 w-4.5 text-[#25D366]" />
                  Écrire sur WhatsApp
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Visuel */}
        <Reveal delay={200} className="relative">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-lift">
            <img
              src="https://images.pexels.com/photos/37668423/pexels-photo-37668423.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
              alt="Technicien Pyramide Ascenseur inspectant la machinerie d'un ascenseur lors d'une intervention d'urgence"
              className="h-[420px] w-full object-cover lg:h-[520px]"
              width="1200"
              height="627"
              loading="lazy"
              decoding="async"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/10 to-transparent"
              aria-hidden="true"
            />
            <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/15 bg-navy/70 p-5 backdrop-blur-md">
              <p className="font-display text-lg font-bold text-white">
                Intervention express en {SITE.serviceArea}
              </p>
              <p className="mt-1 text-sm text-slate-300">
                6 équipes d'astreinte positionnées pour un délai moyen constaté de 45 minutes.
              </p>
            </div>
          </div>

          <div className="mt-5 flex items-start gap-3.5 rounded-2xl border border-ember/25 bg-ember/10 p-5">
            <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-ember" aria-hidden="true" />
            <p className="text-sm leading-relaxed text-slate-200">
              <strong className="font-semibold text-white">Des personnes sont bloquées ?</strong>{" "}
              Rassurez-les, demandez-leur de ne jamais forcer les portes ni tenter de sortir
              seules, puis appelez-nous : un technicien arrive et garde le contact par
              l'interphonie de cabine.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
