<?php
/**
 * ============================================================================
 * PYRAMIDE ASCENSEUR — send-mail.php
 * Reçoit les formulaires du site (contact + devis) et envoie un e-mail.
 * ----------------------------------------------------------------------------
 * INSTALLATION : déposez ce fichier à côté de index.html (même dossier).
 * Répondez au format JSON — le front-end attend { "success": true }.
 * ============================================================================
 */

/* ======================= 1. CONFIGURATION (à modifier) ==================== */

$CONFIG = [
    // Adresse qui REÇOIT les demandes
    'to'          => 'contact@pyramide-ascenseur.fr',
    // Adresse d'EXPÉDITION (idéalement une adresse de votre domaine,
    // à créer dans cPanel → « Comptes de messagerie »)
    'from'        => 'no-reply@pyramide-ascenseur.fr',
    'from_name'   => 'Site Pyramide Ascenseur',
    // Préfixe du sujet des e-mails reçus
    'subject_tag' => '[Site Web]',
    // Domaine autorisé à appeler ce script (mettez votre domaine en production)
    'cors_origin' => '*',
    // Délai minimal entre deux envois depuis une même IP (secondes)
    'rate_limit'  => 60,
    // Durée minimale de remplissage du formulaire (anti-robots, secondes)
    'min_fill'    => 3,
];

/* ============================ 2. EN-TÊTES HTTP ============================ */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: ' . $CONFIG['cors_origin']);
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

function respond(int $code, bool $success, string $message): void {
    http_response_code($code);
    echo json_encode(['success' => $success, 'message' => $message], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, false, 'Méthode non autorisée.');
}

/* ========================= 3. PROTECTIONS ANTI-SPAM ======================= */

// 3a. Honeypot : le champ "company" est invisible pour les visiteurs humains.
//     Un robot qui le remplit reçoit un faux succès et son message est ignoré.
if (!empty($_POST['company'])) {
    respond(200, true, 'OK');
}

// 3b. Piège temporel : un humain met plus de quelques secondes à remplir le formulaire.
$started = isset($_POST['started_at']) ? (int) $_POST['started_at'] : 0;
if ($started > 0 && (time() - ($started / 1000)) < $CONFIG['min_fill']) {
    respond(429, false, 'Envoi trop rapide, veuillez réessayer.');
}

// 3c. Limitation de débit : 1 envoi / minute / adresse IP.
$ip      = preg_replace('/[^a-zA-Z0-9\.:]/', '', $_SERVER['REMOTE_ADDR'] ?? 'inconnue');
$tmpFile = sys_get_temp_dir() . '/pa_mail_' . md5($ip);
if (file_exists($tmpFile) && (time() - filemtime($tmpFile)) < $CONFIG['rate_limit']) {
    respond(429, false, 'Trop de demandes. Patientez une minute ou appelez-nous.');
}

/* ========================= 4. LECTURE DES CHAMPS ========================== */

function field(string $key, int $max = 2000): string {
    $v = trim((string)($_POST[$key] ?? ''));
    $v = strip_tags($v);                    // pas de HTML
    $v = str_replace(["\r"], '', $v);       // anti injection d'en-têtes
    return mb_substr($v, 0, $max, 'UTF-8');
}

$form       = field('form', 20);            // 'contact' ou 'devis'
$name       = field('name', 120);
$phone      = field('phone', 30);
$email      = field('email', 190);
$subject    = field('subject', 190);
$message    = field('message', 3000);
$service    = field('service', 120);
$building   = field('building', 120);
$floors     = field('floors', 60);
$urgency    = field('urgency', 120);
$requestTyp = field('requestType', 60);

if ($name === '' || $phone === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(422, false, 'Champs obligatoires manquants ou e-mail invalide.');
}

/* ========================= 5. COMPOSITION DU MAIL ========================= */

$typeLabel = $form === 'devis' ? 'Demande de devis / consultation' : 'Message de contact';

$lines   = [];
$lines[] = "=== Nouvelle demande reçue via le site ===";
$lines[] = "Type        : " . $typeLabel;
$lines[] = "Date        : " . date('d/m/Y à H:i');
$lines[] = "";
$lines[] = "Nom         : " . $name;
$lines[] = "Téléphone   : " . $phone;
$lines[] = "E-mail      : " . $email;
if ($service)    $lines[] = "Service     : " . $service;
if ($building)   $lines[] = "Bâtiment    : " . $building;
if ($floors)     $lines[] = "Étages      : " . $floors;
if ($urgency)    $lines[] = "Urgence     : " . $urgency;
if ($requestTyp) $lines[] = "Demande     : " . $requestTyp;
if ($subject)    $lines[] = "Sujet       : " . $subject;
$lines[] = "";
$lines[] = "Message :";
$lines[] = $message !== '' ? $message : '(non renseigné)';
$lines[] = "";
$lines[] = "— IP : " . $ip;
$body = implode("\n", $lines);

$mailSubject = $CONFIG['subject_tag'] . ' ' . ($subject ?: $typeLabel) . ' — ' . $name;
if (function_exists('mb_encode_mimeheader')) {
    $mailSubject = mb_encode_mimeheader($mailSubject, 'UTF-8');
}

$headers = implode("\r\n", [
    'From: ' . $CONFIG['from_name'] . ' <' . $CONFIG['from'] . '>',
    'Reply-To: ' . $name . ' <' . $email . '>',
    'Content-Type: text/plain; charset=utf-8',
    'X-Mailer: PHP/' . PHP_VERSION,
]);

/* ============================ 6. ENVOI ==================================== */

$sent = @mail($CONFIG['to'], $mailSubject, $body, $headers);

if ($sent) {
    @touch($tmpFile); // mémorise l'envoi (limitation de débit)
    respond(200, true, 'Votre demande a bien été envoyée.');
}

respond(500, false, "Le serveur de messagerie n'a pas accepté l'envoi. Contactez-nous par téléphone.");

/* ============================================================================
 * ALTERNATIVE SMTP (recommandée si mail() est bloqué par l'hébergeur) :
 *
 *  1. Téléchargez PHPMailer : https://github.com/PHPMailer/PHPMailer
 *  2. Remplacez l'appel mail() ci-dessus par :
 *
 *     require 'PHPMailer/src/PHPMailer.php';
 *     require 'PHPMailer/src/SMTP.php';
 *     $m = new PHPMailer\PHPMailer\PHPMailer(true);
 *     $m->isSMTP();
 *     $m->Host       = 'smtp.votre-hebergeur.fr';
 *     $m->SMTPAuth   = true;
 *     $m->Username   = 'no-reply@pyramide-ascenseur.fr';
 *     $m->Password   = '••••••••';
 *     $m->SMTPSecure = 'tls';
 *     $m->Port       = 587;
 *     $m->CharSet    = 'UTF-8';
 *     $m->setFrom($CONFIG['from'], $CONFIG['from_name']);
 *     $m->addAddress($CONFIG['to']);
 *     $m->addReplyTo($email, $name);
 *     $m->Subject = $mailSubject;
 *     $m->Body    = $body;
 *     $sent = $m->send();
 *
 * HÉBERGEMENT SANS PHP ? Utilisez Formspree (formspree.io) ou EmailJS :
 * créez un formulaire, copiez l'URL fournie, puis changez la constante
 * « formEndpoint » dans src/config.ts. Voir README.md.
 * ============================================================================
 */
