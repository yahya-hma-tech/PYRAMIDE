/* ============================================================================
   PYRAMIDE ASCENSEUR — CONFIGURATION CENTRALE
   ---------------------------------------------------------------------------
   Modifiez UNIQUEMENT ce bloc pour mettre à jour dans tout le site :
   téléphone, e-mail, WhatsApp, adresse, horaires, endpoint du formulaire.
   ========================================================================== */

export const SITE = {
  name: "Pyramide Ascenseur",
  tagline: "Réparation · Maintenance · Installation d'ascenseurs",

  // --- Téléphone (affichage + lien cliquable) ---
  phoneDisplay: "01 84 60 24 24",
  phoneHref: "+33184602424",

  // --- WhatsApp (format international sans « + ») ---
  whatsappNumber: "33612244848",
  whatsappMessage:
    "Bonjour Pyramide Ascenseur, j'ai besoin d'une intervention. Pouvez-vous me rappeler ?",

  // --- E-mail ---
  email: "contact@pyramide-ascenseur.fr",

  // --- Adresse & horaires ---
  address: "27 rue des Artisans, 94100 Saint-Maur-des-Fossés",
  mapQuery: "Saint-Maur-des-Fossés, France",
  hours: "Lundi – Samedi : 8h00 – 19h00",
  emergencyHours: "Urgences : 24h/24 – 7j/7",
  serviceArea: "Paris & toute l'Île-de-France",

  // --- Envoi des formulaires (script PHP fourni dans /public) ---
  formEndpoint: "send-mail.php",

  // --- Divers ---
  founded: 2007,
  legal: "SAS au capital de 50 000 € — RCS Créteil 512 340 987",
} as const;

export const phoneLink = `tel:${SITE.phoneHref}`;
export const emailLink = `mailto:${SITE.email}`;
export const whatsappLink = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(
  SITE.whatsappMessage,
)}`;
export const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(
  SITE.mapQuery,
)}&output=embed`;
export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  SITE.address,
)}`;

/* Données réutilisables ---------------------------------------------------- */

export const NAV_LINKS = [
  { label: "Accueil", href: "#accueil" },
  { label: "Services", href: "#services" },
  { label: "À propos", href: "#apropos" },
  { label: "Devis", href: "#devis" },
  { label: "Contact", href: "#contact" },
] as const;

export const SERVICES = [
  {
    icon: "wrench",
    title: "Réparation d'ascenseurs",
    text: "Diagnostic précis et réparation de toutes les pannes : moteur, variateur, cartes électroniques, câbles, portes palières. Toutes marques.",
  },
  {
    icon: "calendar-check",
    title: "Maintenance préventive",
    text: "Visites périodiques, graissage, réglages et contrôles de sécurité qui préviennent 9 pannes sur 10 et prolongent la durée de vie de l'appareil.",
  },
  {
    icon: "building",
    title: "Installation & modernisation",
    text: "Pose d'ascenseurs neufs, remplacement complet ou modernisation ciblée : machinerie, cabine, signalisation, automatismes de portes.",
  },
  {
    icon: "siren",
    title: "Dépannage urgent 24/7",
    text: "Panne, blocage, personnes coincées : ligne d'urgence dédiée et intervention express, jour et nuit, week-ends et jours fériés inclus.",
    urgent: true,
  },
  {
    icon: "file-signature",
    title: "Contrats d'entretien",
    text: "Formules Essentiel, Confort et Premium : visites planifiées, dépannage prioritaire, pièces d'usure et reporting pour syndics et gestionnaires.",
  },
  {
    icon: "badge-check",
    title: "Mise en conformité & sécurité",
    text: "Audits réglementaires, travaux de mise aux normes (sécurité, PMR, incendie) et constitution des dossiers administratifs de contrôle.",
  },
] as const;
