import { Clock3, Mail, MapPin, PhoneCall } from "lucide-react";
import Logo from "./Logo";
import { NAV_LINKS, SERVICES, SITE, emailLink, phoneLink } from "../config";

const SOCIALS = [
  {
    label: "Facebook",
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    label: "LinkedIn",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    label: "Instagram",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.9fr_1fr]">
          {/* Marque */}
          <div>
            <a href="#accueil" aria-label="Pyramide Ascenseur — retour à l'accueil">
              <Logo variant="light" />
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
              {SITE.tagline}. Service d'urgence 24h/24 – 7j/7, techniciens certifiés,
              devis gratuit. {SITE.serviceArea}.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href="#accueil"
                  aria-label={`Pyramide Ascenseur sur ${s.label}`}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:bg-brand hover:text-white"
                >
                  <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="currentColor" aria-hidden="true">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Liens rapides */}
          <nav aria-label="Liens rapides">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-white">
              Liens rapides
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#urgence" className="transition-colors hover:text-white">
                  Urgence 24/7
                </a>
              </li>
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Nos services">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-white">
              Nos services
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {SERVICES.map((s) => (
                <li key={s.title}>
                  <a href="#services" className="transition-colors hover:text-white">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Urgence / contact */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-white">
              Urgence & contact
            </h3>
            <a
              href={phoneLink}
              className="mt-5 inline-flex items-center gap-3 rounded-2xl bg-ember px-5 py-4 font-display text-xl font-extrabold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-ember-600"
              aria-label={`Numéro d'urgence : ${SITE.phoneDisplay}`}
            >
              <PhoneCall className="h-5.5 w-5.5" aria-hidden="true" />
              {SITE.phoneDisplay}
            </a>
            <ul className="mt-6 space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <Clock3 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[#7FB0F7]" aria-hidden="true" />
                <span>
                  {SITE.hours}
                  <span className="block text-slate-400">{SITE.emergencyHours}</span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[#7FB0F7]" aria-hidden="true" />
                <a href={emailLink} className="transition-colors hover:text-white">
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[#7FB0F7]" aria-hidden="true" />
                {SITE.address}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-[13px] text-slate-400 sm:flex-row">
          <p>
            © {year} {SITE.name} — Tous droits réservés.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a href="#/mentions-legales" className="transition-colors hover:text-white">
              Mentions légales
            </a>
            <a href="#/politique-de-confidentialite" className="transition-colors hover:text-white">
              Politique de confidentialité
            </a>
            <span className="text-slate-500">{SITE.legal}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
