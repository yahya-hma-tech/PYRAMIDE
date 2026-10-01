/* ============================================================================
   Formulaires — validation côté client, anti-spam (honeypot + limitation
   de débit) et envoi vers send-mail.php
   ========================================================================== */

export type FormStatus = "idle" | "sending" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^(?:\+|00)?[0-9 ().\-]{8,17}$/;

export function isValidEmail(v: string) {
  return EMAIL_RE.test(v.trim());
}

export function isValidPhone(v: string) {
  return PHONE_RE.test(v.trim());
}

/* ---------- Limitation de débit (1 envoi / 60 s par navigateur) ---------- */

const RATE_KEY = "pa_last_submit";
const RATE_WINDOW = 60; // secondes

/** Renvoie le nombre de secondes restantes avant un nouvel envoi (0 = autorisé). */
export function rateLimitRemaining(): number {
  try {
    const last = Number(localStorage.getItem(RATE_KEY) ?? 0);
    const elapsed = (Date.now() - last) / 1000;
    return elapsed < RATE_WINDOW ? Math.ceil(RATE_WINDOW - elapsed) : 0;
  } catch {
    return 0;
  }
}

export function markSubmitted() {
  try {
    localStorage.setItem(RATE_KEY, String(Date.now()));
  } catch {
    /* navigation privée : ignorer */
  }
}

/* ---------- Envoi ---------- */

export type FormPayload = Record<string, string> & { form: "contact" | "devis" };

/**
 * Envoie les données vers le script PHP (send-mail.php).
 * Lance une erreur si le serveur répond mal ou si l'hébergement
 * n'exécute pas PHP (dans ce cas, voir README : Formspree / EmailJS).
 */
export async function sendForm(endpoint: string, payload: FormPayload): Promise<void> {
  const body = new FormData();
  Object.entries(payload).forEach(([key, value]) => body.append(key, value));

  const res = await fetch(endpoint, { method: "POST", body });
  let data: { success?: boolean; message?: string } | null = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }
  if (!res.ok || !data?.success) {
    throw new Error(data?.message || "Échec de l'envoi");
  }
}
