import { useRef, useState, type FormEvent } from "react";
import {
  ArrowRight,
  BadgeEuro,
  CalendarCheck,
  CheckCircle2,
  CircleAlert,
  Clock3,
  Loader2,
  PhoneCall,
} from "lucide-react";
import Reveal from "./Reveal";
import { SITE, phoneLink } from "../config";
import {
  isValidEmail,
  isValidPhone,
  markSubmitted,
  rateLimitRemaining,
  sendForm,
  type FormStatus,
} from "../lib/form";
import { cn } from "../utils/cn";
import Field from "./Field";

const SERVICES_OPTIONS = [
  "Dépannage / réparation",
  "Maintenance préventive",
  "Installation d'ascenseur neuf",
  "Modernisation d'ascenseur",
  "Contrat d'entretien",
  "Mise en conformité & sécurité",
];

type Values = {
  name: string;
  phone: string;
  email: string;
  service: string;
  building: string;
  floors: string;
  urgency: string;
  requestType: string;
  message: string;
  company: string; // honeypot
};

const INITIAL: Values = {
  name: "",
  phone: "",
  email: "",
  service: "",
  building: "",
  floors: "",
  urgency: "",
  requestType: "Devis gratuit",
  message: "",
  company: "",
};

function validate(v: Values) {
  const errors: Partial<Record<keyof Values, string>> = {};
  if (v.name.trim().length < 2) errors.name = "Indiquez votre nom complet.";
  if (!isValidPhone(v.phone)) errors.phone = "Numéro de téléphone invalide.";
  if (!isValidEmail(v.email)) errors.email = "Adresse e-mail invalide.";
  if (!v.service) errors.service = "Choisissez un type de service.";
  if (!v.building) errors.building = "Choisissez un type de bâtiment.";
  if (!v.floors) errors.floors = "Indiquez le nombre d'étages.";
  if (!v.urgency) errors.urgency = "Indiquez le niveau d'urgence.";
  return errors;
}

export default function QuoteSection() {
  const [values, setValues] = useState<Values>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [sentLabel, setSentLabel] = useState("");
  const startedAt = useRef(Date.now());

  const set = (key: keyof Values) => (value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    // Honeypot : un bot qui remplit ce champ invisible obtient un faux succès.
    if (values.company) {
      setStatus("success");
      return;
    }
    const wait = rateLimitRemaining();
    if (wait > 0) {
      setStatus("error");
      setErrorMsg(
        `Vous venez d'envoyer une demande. Merci de patienter ${wait} s ou de nous appeler directement.`,
      );
      return;
    }

    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("sending");
    setErrorMsg("");
    try {
      await sendForm(SITE.formEndpoint, {
        form: "devis",
        name: values.name,
        phone: values.phone,
        email: values.email,
        service: values.service,
        building: values.building,
        floors: values.floors,
        urgency: values.urgency,
        requestType: values.requestType,
        message: values.message,
        subject: `${values.requestType} — ${values.service}`,
        started_at: String(startedAt.current),
      });
      markSubmitted();
      setSentLabel(values.requestType);
      setStatus("success");
      setValues(INITIAL);
    } catch {
      setStatus("error");
      setErrorMsg(
        "L'envoi automatique n'a pas abouti (serveur e-mail indisponible). Écrivez-nous directement ou appelez-nous : réponse garantie.",
      );
    }
  }

  return (
    <section id="devis" className="bg-gradient-to-b from-mist/60 to-cloud py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-8">
        {/* Argumentaire */}
        <div>
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand">
              Devis & consultation gratuits
            </p>
            <h2 className="text-balance mt-3 font-display text-3xl font-extrabold text-navy sm:text-4xl">
              Votre devis gratuit en moins de 24 h, sans engagement
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Décrivez votre besoin : un technicien-conseil vous rappelle, affine la demande
              avec vous et vous envoie un chiffrage détaillé. La consultation téléphonique est
              également <strong className="font-semibold text-navy">100&nbsp;% offerte</strong>.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <ul className="mt-8 space-y-4">
              {[
                { icon: Clock3, text: "Réponse sous 24 h ouvrées, rappel immédiat en cas d'urgence" },
                { icon: BadgeEuro, text: "Chiffrage poste par poste, zéro frais caché, zéro engagement" },
                { icon: CalendarCheck, text: "Visite technique offerte pour tout contrat d'entretien" },
              ].map((item) => (
                <li key={item.text} className="flex items-start gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-brand shadow-card">
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="pt-2 text-[15px] font-medium text-slate-700">{item.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-9 rounded-2xl border border-brand/15 bg-white p-6 shadow-card">
              <p className="text-sm font-medium text-slate-500">Vous préférez en parler de vive voix ?</p>
              <a
                href={phoneLink}
                className="mt-2 inline-flex items-center gap-3 font-display text-2xl font-extrabold text-navy transition-colors hover:text-brand"
                aria-label={`Appeler le ${SITE.phoneDisplay}`}
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mist text-brand">
                  <PhoneCall className="h-5.5 w-5.5" aria-hidden="true" />
                </span>
                {SITE.phoneDisplay}
              </a>
              <p className="mt-2 text-sm text-slate-500">{SITE.hours} · {SITE.emergencyHours}</p>
            </div>
          </Reveal>
        </div>

        {/* Formulaire */}
        <Reveal delay={150}>
          <div className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-soft sm:p-9">
            {status === "success" ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center text-center" role="alert">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
                  <CheckCircle2 className="h-9 w-9" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-2xl font-bold text-navy">
                  Demande bien reçue !
                </h3>
                <p className="mt-2 max-w-sm text-slate-600">
                  Merci pour votre confiance. Un technicien-conseil vous recontacte sous 24 h
                  ouvrées avec votre {(sentLabel || "devis").toLowerCase()} — ou bien
                  plus tôt si vous avez signalé une urgence.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setStatus("idle");
                    startedAt.current = Date.now();
                  }}
                  className="mt-7 inline-flex items-center gap-2 rounded-xl border-2 border-brand/25 px-5 py-2.5 text-sm font-semibold text-brand transition-all hover:-translate-y-0.5 hover:border-brand"
                >
                  Envoyer une autre demande
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate aria-describedby={errorMsg ? "devis-error" : undefined}>
                <h3 className="font-display text-xl font-bold text-navy">
                  Formulaire de demande
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Les champs marqués d'un * sont obligatoires.
                </p>

                {/* Honeypot anti-spam (invisible pour les humains) */}
                <div className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden" aria-hidden="true">
                  <label>
                    Société (ne pas remplir)
                    <input
                      type="text"
                      name="company"
                      tabIndex={-1}
                      autoComplete="off"
                      value={values.company}
                      onChange={(e) => set("company")(e.target.value)}
                    />
                  </label>
                </div>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <Field label="Nom complet *" error={errors.name}>
                    <input
                      type="text" name="name" autoComplete="name" placeholder="Ex. : Marie Dupont"
                      value={values.name} onChange={(e) => set("name")(e.target.value)}
                      aria-invalid={!!errors.name} required
                      className={inputCls(!!errors.name)}
                    />
                  </Field>
                  <Field label="Téléphone *" error={errors.phone}>
                    <input
                      type="tel" name="phone" autoComplete="tel" placeholder="Ex. : 06 12 34 56 78"
                      value={values.phone} onChange={(e) => set("phone")(e.target.value)}
                      aria-invalid={!!errors.phone} required
                      className={inputCls(!!errors.phone)}
                    />
                  </Field>
                  <Field label="E-mail *" error={errors.email} className="sm:col-span-2">
                    <input
                      type="email" name="email" autoComplete="email" placeholder="vous@exemple.fr"
                      value={values.email} onChange={(e) => set("email")(e.target.value)}
                      aria-invalid={!!errors.email} required
                      className={inputCls(!!errors.email)}
                    />
                  </Field>
                  <Field label="Type de service *" error={errors.service}>
                    <select
                      name="service" value={values.service} onChange={(e) => set("service")(e.target.value)}
                      aria-invalid={!!errors.service} required
                      className={inputCls(!!errors.service, !values.service)}
                    >
                      <option value="" disabled>Choisissez…</option>
                      {SERVICES_OPTIONS.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Type de bâtiment *" error={errors.building}>
                    <select
                      name="building" value={values.building} onChange={(e) => set("building")(e.target.value)}
                      aria-invalid={!!errors.building} required
                      className={inputCls(!!errors.building, !values.building)}
                    >
                      <option value="" disabled>Choisissez…</option>
                      <option value="Résidentiel">Résidentiel (copropriété, logement)</option>
                      <option value="Commercial / tertiaire">Commercial / tertiaire (bureaux, commerces)</option>
                      <option value="Industriel">Industriel (entrepôt, site logistique)</option>
                    </select>
                  </Field>
                  <Field label="Nombre d'étages *" error={errors.floors}>
                    <select
                      name="floors" value={values.floors} onChange={(e) => set("floors")(e.target.value)}
                      aria-invalid={!!errors.floors} required
                      className={inputCls(!!errors.floors, !values.floors)}
                    >
                      <option value="" disabled>Choisissez…</option>
                      <option value="RDC + 1 à 3">RDC + 1 à 3 étages</option>
                      <option value="RDC + 4 à 7">RDC + 4 à 7 étages</option>
                      <option value="RDC + 8 à 15">RDC + 8 à 15 étages</option>
                      <option value="Plus de 15">Plus de 15 étages</option>
                    </select>
                  </Field>
                  <Field label="Niveau d'urgence *" error={errors.urgency}>
                    <select
                      name="urgency" value={values.urgency} onChange={(e) => set("urgency")(e.target.value)}
                      aria-invalid={!!errors.urgency} required
                      className={inputCls(!!errors.urgency, !values.urgency)}
                    >
                      <option value="" disabled>Choisissez…</option>
                      <option value="Critique — personnes bloquées / panne totale">Critique — personnes bloquées / panne totale</option>
                      <option value="Sous 48 h">Sous 48 h</option>
                      <option value="Sous 1 à 2 semaines">Sous 1 à 2 semaines</option>
                      <option value="Projet / étude">Projet / simple étude</option>
                    </select>
                  </Field>

                  <fieldset className="sm:col-span-2">
                    <legend className="mb-2 text-sm font-semibold text-navy">
                      Votre demande concerne *
                    </legend>
                    <div className="grid gap-3 sm:grid-cols-2" role="radiogroup">
                      {["Devis gratuit", "Consultation gratuite"].map((option) => (
                        <label
                          key={option}
                          className={cn(
                            "flex cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-3 text-sm font-semibold transition-all",
                            values.requestType === option
                              ? "border-brand bg-mist text-navy"
                              : "border-slate-200 text-slate-600 hover:border-brand/40",
                          )}
                        >
                          <input
                            type="radio" name="requestType" value={option}
                            checked={values.requestType === option}
                            onChange={(e) => set("requestType")(e.target.value)}
                            className="h-4 w-4 accent-brand"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <Field label="Votre message (facultatif)" className="sm:col-span-2">
                    <textarea
                      name="message" rows={4}
                      placeholder="Décrivez la panne, la marque de l'ascenseur, l'adresse de l'immeuble…"
                      value={values.message} onChange={(e) => set("message")(e.target.value)}
                      className={inputCls(false)}
                    />
                  </Field>
                </div>

                {status === "error" && errorMsg && (
                  <p
                    id="devis-error" role="alert"
                    className="mt-5 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700"
                  >
                    <CircleAlert className="mt-0.5 h-4.5 w-4.5 shrink-0" aria-hidden="true" />
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit" disabled={status === "sending"}
                  className="group mt-7 inline-flex w-full items-center justify-center gap-2.5 rounded-2xl bg-brand px-7 py-4 font-display text-[15px] font-semibold text-white shadow-lift transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                      Envoi en cours…
                    </>
                  ) : (
                    <>
                      Recevoir mon devis gratuit
                      <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                    </>
                  )}
                </button>
                <p className="mt-4 text-xs leading-relaxed text-slate-400">
                  En envoyant ce formulaire, vous acceptez d'être recontacté au sujet de votre
                  demande. Vos données ne sont jamais transmises à des tiers.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function inputCls(hasError: boolean, isPlaceholder = false) {
  return cn(
    "w-full rounded-xl border-2 bg-cloud/60 px-4 py-3 text-[15px] text-navy outline-none transition-all duration-200 placeholder:text-slate-400 focus:bg-white",
    hasError
      ? "border-red-300 focus:border-red-400"
      : "border-slate-200 hover:border-brand/40 focus:border-brand",
    isPlaceholder && "text-slate-400",
  );
}
