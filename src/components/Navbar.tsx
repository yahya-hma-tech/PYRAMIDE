import { useEffect, useState } from "react";
import { ArrowRight, Menu, Siren, X } from "lucide-react";
import { NAV_LINKS, phoneLink } from "../config";
import Logo from "./Logo";
import { cn } from "../utils/cn";

/** Barre de navigation collante avec menu mobile. */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "border-slate-200/80 bg-white/90 shadow-[0_6px_24px_-12px_rgba(11,31,58,0.25)] backdrop-blur-xl"
          : "border-transparent bg-white",
      )}
    >
      <nav
        className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Navigation principale"
      >
        <a href="#accueil" aria-label="Pyramide Ascenseur — retour à l'accueil">
          <Logo variant="dark" />
        </a>

        {/* Liens bureau */}
        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="nav-link text-[15px] font-medium text-slate-600 transition-colors hover:text-navy"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="#devis"
            className="group inline-flex items-center gap-2 rounded-xl border-2 border-brand/25 px-4 py-2.5 text-sm font-semibold text-brand transition-all duration-300 hover:-translate-y-0.5 hover:border-brand hover:bg-mist"
          >
            Devis gratuit
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
          <a
            href={phoneLink}
            className="btn-pulse inline-flex items-center gap-2 rounded-xl bg-ember px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-ember-600"
            aria-label="Urgence 24/7 : appeler maintenant"
          >
            <Siren className="h-4 w-4" aria-hidden="true" />
            Urgence 24/7
          </a>
        </div>

        {/* Bouton hamburger */}
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-navy transition-colors hover:bg-cloud lg:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Menu mobile */}
      <div
        id="menu-mobile"
        className={cn(
          "grid overflow-hidden border-t border-slate-100 bg-white transition-all duration-300 lg:hidden",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <ul className="space-y-1 px-4 py-4 sm:px-6">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-[15px] font-medium text-slate-700 transition-colors hover:bg-mist hover:text-navy"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-2.5 border-t border-slate-100 px-4 pb-5 pt-4 sm:px-6">
            <a
              href={phoneLink}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-ember px-4 py-3 text-sm font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              <Siren className="h-4 w-4" aria-hidden="true" />
              Urgence 24/7 — Appeler maintenant
            </a>
            <a
              href="#devis"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-white"
            >
              Demander un devis gratuit
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
