# Pyramide Ascenseur — Site vitrine

Site one-page complet (React + Vite + Tailwind CSS) pour **Pyramide Ascenseur** :
réparation, maintenance, installation d'ascenseurs et **urgence 24h/24 – 7j/7**.
La compilation produit un site **100 % statique** (HTML + CSS + JS) + un script PHP,
déployable sur n'importe quel hébergement mutualisé (cPanel, OVH, o2switch…).

---

## 1. Structure des dossiers

```
├── index.html                  # En-têtes SEO, Open Graph, JSON-LD, polices
├── src/
│   ├── config.ts               # ★ CONFIGURATION UNIQUE : tél, e-mail, WhatsApp…
│   ├── index.css               # ★ Couleurs + animations du design system
│   ├── App.tsx                 # Composition de la page
│   ├── lib/                    # Hooks (reveal, compteurs) + logique formulaires
│   └── components/             # Toutes les sections (Hero, Services, Devis…)
└── public/                     # Fichiers copiés tels quels dans dist/
    ├── favicon.svg             # Favicon pyramide
    ├── logo-dark.svg           # Logo pour fond clair
    ├── logo-light.svg          # Logo pour fond foncé
    ├── og-cover.jpg            # Image de partage réseaux sociaux
    ├── robots.txt
    ├── sitemap.xml
    └── send-mail.php           # ★ Script d'envoi des formulaires (PHP)
```

Après `npm run build`, le dossier **`dist/`** contient le site prêt à publier.

---

## 2. Personnalisation rapide

| Quoi | Où |
|---|---|
| **Téléphone, e-mail, WhatsApp, adresse, horaires, endpoint du formulaire** | **`src/config.ts`** — un seul endroit, répercuté partout |
| Couleurs (marine, bleu, orange urgence…), polices, ombres | `src/index.css` → bloc `@theme` |
| Textes des sections | `src/components/*.tsx` (un fichier par section) |
| Titres SEO, JSON-LD, Open Graph | `index.html` (penser à aligner le téléphone avec `config.ts`) |
| Images (photos d'intervention) | URL dans `EmergencySection.tsx` / `About.tsx` — remplacez par vos photos placées dans `public/img/` |
| Logo / favicon | `public/favicon.svg`, `public/logo-dark.svg`, `public/logo-light.svg` |
| Destinataire des e-mails de formulaire | `public/send-mail.php` → bloc `$CONFIG` en tête de fichier |

> **Important :** après chaque modification, relancez `npm run build` et
> republiez le contenu de `dist/`.

---

## 3. Tester en local

```bash
npm install        # une seule fois
npm run dev        # serveur de développement (rechargement à chaud)
npm run build      # compilation → dist/
```

Tester le **formulaire avec PHP** en local sur le dossier compilé :

```bash
cd dist
php -S localhost:8000
# http://localhost:8000 — les formulaires appellent send-mail.php
```

---

## 4. Mise en ligne (cPanel / hébergement mutualisé)

1. `npm run build`
2. Ouvrez **cPanel → Gestionnaire de fichiers → `public_html/`**
3. Téléversez **tout le contenu** du dossier `dist/` (index.html, assets/,
   favicon.svg, send-mail.php, robots.txt, sitemap.xml…)
4. Vérifiez que PHP est actif (cPanel → « Sélectionner une version de PHP », 8.x).
5. Créez l'adresse d'expédition `no-reply@votre-domaine.fr`
   (cPanel → « Comptes de messagerie ») et reportez-la dans `send-mail.php`
   (`$CONFIG['from']`).
6. Appelez le site : la page s'affiche, testez un formulaire → un e-mail doit
   arriver sur l'adresse `$CONFIG['to']`.

**Mettre à jour le domaine** : remplacez `https://www.pyramide-ascenseur.fr`
dans `index.html`, `public/robots.txt` et `public/sitemap.xml`.

---

## 5. Brancher le formulaire

### Option A — PHP (fourni, recommandé)
Rien à faire côté front : les formulaires envoient un `POST` vers
`send-mail.php` (constante `formEndpoint` dans `src/config.ts`). Le script
valide, filtre le spam (honeypot, piège temporel, limitation par IP) et envoie
l'e-mail via `mail()`. Si votre hébergeur bloque `mail()`, utilisez le bloc
**SMTP/PHPMailer commenté en bas de `send-mail.php`**.

### Option B — Sans PHP : Formspree
1. Créez un formulaire sur [formspree.io](https://formspree.io) → récupérez
   l'URL du type `https://formspree.io/f/abcdwxyz`.
2. Dans `src/config.ts` : `formEndpoint: "https://formspree.io/f/abcdwxyz"`.
3. Formspree répond `{ ok: true }` ; si besoin ajustez la lecture de la
   réponse dans `src/lib/form.ts`.

### Option C — Sans PHP : EmailJS (100 % navigateur)
1. Installez le SDK : `npm i @emailjs/browser`.
2. Dans `src/lib/form.ts`, remplacez le `fetch` par
   `emailjs.send("service_id", "template_id", payload, "public_key")`.
3. Laissez `formEndpoint` vide.

---

## 6. Accessibilité & performance

- `prefers-reduced-motion` respecté (animations désactivées si demandé)
- Navigation clavier : focus visibles, lien « Aller au contenu », menu mobile au `Échap`
- Contrastes AA, `aria-labels` sur tous les boutons d'action
- Images en `loading="lazy"`, attributs `width/height`, polices `display=swap`
- JSON-LD `LocalBusiness`, `sitemap.xml`, `robots.txt` pour le référencement local
