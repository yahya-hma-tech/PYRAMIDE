import { useRef, useState, type FormEvent } from "react";
import {
  CheckCircle2,
  CircleAlert,
  Clock3,
  Loader2,
  Mail,
  MapPin,
  PhoneCall,
  Send,
  Siren,
} from "lucide-react";
import Reveal from "./Reveal";
import Field from "./Field";
import { SITE, emailLink, mapsEmbed, mapsLink, phoneLink } from "../config";
import {
  isValidEmail,
  isValidPhone,
  markSubmitted,
  rateLimitRemaining,
  sendForm,
  type FormStatus,
} from "../lib/form";
import { cn } from "../utils/cn";

type Values = {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  company: string;
};

const INITIAL: Values = { name: "", phone: "", email: "", subject: "", message: "", company: "" };

function validate(v: Values) {
  const errors: Partial<Record<keyof Values, string>> = {};
  if (v.name.trim().length < 2) errors.name = "Indiquez votre nom complet.";
  if (!isValidPhone(v.phone)) errors.phone = "Numéro de téléphone invalide.";
  if (!isValidEmail(v.email)) errors.email = "Adresse e-mail invalide.";
  if (v.subject.trim().length < 3) errors.subject = "Indiquez l'objet de votre message.";
  if (v.message.trim().length < 10)
    errors.message = "Décrivez votre demande en quelques mots (10 caractères min.).";
  return errors;
}

export default function ContactSection() {
  const [values, setValues] = useState<Values>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [sentName, setSentName] = useState("");
  const startedAt = useRef(Date.now());

  const set = (key: keyof Values) => (value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (values.company) {
      setStatus("success");
      return;
    }
    const wait = rateLimitRemaining();
    if (wait > 0) {
      setStatus("error");
      setErrorMsg(`Vous venez d'envoyer un message. Merci de patienter ${wait} s ou de nous appeler.`);
      return;
    }
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("sending");
    setErrorMsg("");
    try {
      await sendForm(SITE.formEndpoint, {
        form: "contact",
        name: values.name,
        phone: values.phone,
        email: values.email,
        subject: values.subject,
        message: values.message,
        started_at: String(startedAt.current),
      });
      markSubmitted();
      setSentName(values.name.trim().split(" ")[0]);
      setStatus("success");
      setValues(INITIAL);
    } catch {
      setStatus("error");
      setErrorMsg(
        "L'envoi automatique n'a pas abouti. Contactez-nous directement par e-mail ou par téléphone, nous vous répondrons rapidement.",
      );
    }
  }

  const inputCls = (hasError: boolean) =>
    cn(
      "w-full rounded-xl border-2 bg-cloud/60 px-4 py-3 text-[15px] text-navy outline-none transition-all duration-200 placeholder:text-slate-400 focus:bg-white",
      hasError ? "border-red-300 focus:border-red-400" : "border-slate-200 hover:border-brand/40 focus:border-brand",
    );

  return (
    <section id="contact" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand">Contact</p>
          <h2 className="text-balance mt-3 font-display text-3xl font-extrabold text-navy sm:text-4xl">
            Parlons de votre ascenseur
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Par téléphone, par e-mail ou via le formulaire : vous avez toujours un
            interlocuteur technique au bout du fil.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          {/* Coordonnées */}
          <div className="space-y-5">
            {[
              {
                icon: PhoneCall,
                title: "Téléphone",
                content: (
                  <a href={phoneLink} className="font-semibold text-navy transition-colors hover:text-brand">
                    {SITE.phoneDisplay}
                  </a>
                ),
                sub: SITE.emergencyHours,
              },
              {
                icon: Mail,
                title: "E-mail",
                content: (
                  <a href={emailLink} className="font-semibold text-navy transition-colors hover:text-brand">
                    {SITE.email}
                  </a>
                ),
                sub: "Réponse sous 24 h ouvrées",
              },
              {
                icon: MapPin,
                title: "Atelier & bureaux",
                content: (
                  <a
                    href={mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-navy transition-colors hover:text-brand"
                  >
                    {SITE.address}
                  </a>
                ),
                sub: `Zone d'intervention : ${SITE.serviceArea}`,
              },
              {
                icon: Clock3,
                title: "Horaires",
                content: <p className="font-semibold text-navy">{SITE.hours}</p>,
                sub: SITE.emergencyHours,
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <div className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-cloud p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/25 hover:bg-white hover:shadow-card">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-mist text-brand">
                    <item.icon className="h-5.5 w-5.5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">{item.title}</p>
                    <div className="mt-0.5">{item.content}</div>
                    <p className="mt-0.5 text-sm text-slate-500">{item.sub}</p>
                  </div>
                </div>
              </Reveal>
            ))}

            <Reveal delay={350}>
              <a
                href={phoneLink}
                className="group flex items-center gap-4 rounded-2xl bg-ember p-5 text-white shadow-[0_16px_36px_-14px_rgba(255,122,26,0.65)] transition-all duration-300 hover:-translate-y-1 hover:bg-ember-600"
                aria-label={`Urgence ascenseur : appeler le ${SITE.phoneDisplay}`}
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/20">
                  <Siren className="h-6 w-6" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-display text-base font-bold">Urgence ascenseur ?</span>
                  <span className="block text-sm text-white/85">
                    Appelez le {SITE.phoneDisplay} — 24h/24, 7j/7
                  </span>
                </span>
              </a>
            </Reveal>
          </div>

          {/* Formulaire contact */}
          <Reveal delay={150}>
            <div className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-soft sm:p-9">
              {status === "success" ? (
                <div className="flex min-h-[420px] flex-col items-center justify-center text-center" role="alert">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
                    <CheckCircle2 className="h-9 w-9" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-bold text-navy">Message envoyé !</h3>
                  <p className="mt-2 max-w-sm text-slate-600">
                    Merci{sentName ? ` ${sentName}` : ""} ! Nous vous répondons sous
                    24 h ouvrées. Pour toute urgence, appelez le {SITE.phoneDisplay}.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setStatus("idle");
                      startedAt.current = Date.now();
                    }}
                    className="mt-7 inline-flex items-center gap-2 rounded-xl border-2 border-brand/25 px-5 py-2.5 text-sm font-semibold text-brand transition-all hover:-translate-y-0.5 hover:border-brand"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate aria-describedby={errorMsg ? "contact-error" : undefined}>
                  <h3 className="font-display text-xl font-bold text-navy">Envoyez-nous un message</h3>
                  <p className="mt-1 text-sm text-slate-500">Tous les champs sont obligatoires.</p>

                  {/* Honeypot */}
                  <div className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden" aria-hidden="true">
                    <label>
                      Société (ne pas remplir)
                      <input
                        type="text" name="company" tabIndex={-1} autoComplete="off"
                        value={values.company} onChange={(e) => set("company")(e.target.value)}
                      />
                    </label>
                  </div>

                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <Field label="Nom complet *" error={errors.name}>
                      <input
                        type="text" name="name" autoComplete="name" placeholder="Ex. : Marie Dupont"
                        value={values.name} onChange={(e) => set("name")(e.target.value)}
                        aria-invalid={!!errors.name} required className={inputCls(!!errors.name)}
                      />
                    </Field>
                    <Field label="Téléphone *" error={errors.phone}>
                      <input
                        type="tel" name="phone" autoComplete="tel" placeholder="Ex. : 06 12 34 56 78"
                        value={values.phone} onChange={(e) => set("phone")(e.target.value)}
                        aria-invalid={!!errors.phone} required className={inputCls(!!errors.phone)}
                      />
                    </Field>
                    <Field label="E-mail *" error={errors.email}>
                      <input
                        type="email" name="email" autoComplete="email" placeholder="vous@exemple.fr"
                        value={values.email} onChange={(e) => set("email")(e.target.value)}
                        aria-invalid={!!errors.email} required className={inputCls(!!errors.email)}
                      />
                    </Field>
                    <Field label="Sujet *" error={errors.subject}>
                      <input
                        type="text" name="subject" placeholder="Ex. : Contrat de maintenance"
                        value={values.subject} onChange={(e) => set("subject")(e.target.value)}
                        aria-invalid={!!errors.subject} required className={inputCls(!!errors.subject)}
                      />
                    </Field>
                    <Field label="Message *" error={errors.message} className="sm:col-span-2">
                      <textarea
                        name="message" rows={5} placeholder="Décrivez votre demande…"
                        value={values.message} onChange={(e) => set("message")(e.target.value)}
                        aria-invalid={!!errors.message} required className={inputCls(!!errors.message)}
                      />
                    </Field>
                  </div>

                  {status === "error" && errorMsg && (
                    <p
                      id="contact-error" role="alert"
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
                        Envoyer le message
                        <Send className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" aria-hidden="true" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>

        {/* Carte */}
        <Reveal className="mt-12">
          <div className="overflow-hidden rounded-[2rem] border border-slate-100 shadow-card">
            <iframe
              src={mapsEmbed}
              title={`Plan d'accès — ${SITE.name}, ${SITE.address}`}
              className="h-80 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
