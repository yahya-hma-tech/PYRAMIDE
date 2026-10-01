import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarCheck,
  FileSignature,
  Siren,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import Reveal from "./Reveal";
import { SERVICES } from "../config";
import { cn } from "../utils/cn";

const ICONS: Record<string, LucideIcon> = {
  wrench: Wrench,
  "calendar-check": CalendarCheck,
  building: Building2,
  siren: Siren,
  "file-signature": FileSignature,
  "badge-check": BadgeCheck,
};

export default function Services() {
  return (
    <section id="services" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand">Nos services</p>
          <h2 className="text-balance mt-3 font-display text-3xl font-extrabold text-navy sm:text-4xl">
            Tout ce dont votre ascenseur a besoin, sous un même toit
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            De la maintenance préventive à la modernisation complète, nos techniciens
            interviennent sur toutes les marques et tous les types d'appareils.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[service.icon] ?? Wrench;
            const urgent = "urgent" in service && service.urgent;
            return (
              <Reveal key={service.title} delay={(i % 3) * 90}>
                <article
                  className={cn(
                    "group relative flex h-full flex-col rounded-3xl border bg-cloud p-7 transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-lift",
                    urgent
                      ? "border-ember/25 hover:border-ember/50"
                      : "border-slate-100 hover:border-brand/30",
                  )}
                >
                  {urgent && (
                    <span className="absolute -top-3 right-6 inline-flex items-center gap-1.5 rounded-full bg-ember px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-md">
                      <Siren className="h-3 w-3" aria-hidden="true" />
                      24/7
                    </span>
                  )}
                  <span
                    className={cn(
                      "flex h-13 w-13 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-105",
                      urgent
                        ? "bg-ember/10 text-ember group-hover:bg-ember group-hover:text-white"
                        : "bg-mist text-brand group-hover:bg-brand group-hover:text-white",
                    )}
                  >
                    <Icon className="h-6.5 w-6.5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold text-navy">
                    {service.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-slate-600">
                    {service.text}
                  </p>
                  <a
                    href="#devis"
                    className={cn(
                      "mt-5 inline-flex items-center gap-2 text-sm font-semibold transition-colors",
                      urgent ? "text-ember hover:text-ember-600" : "text-brand hover:text-brand-700",
                    )}
                    aria-label={`Demander un devis : ${service.title}`}
                  >
                    Demander ce service
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </a>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
