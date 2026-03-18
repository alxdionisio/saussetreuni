/**
 * Endpoint d'envoi des formulaires (FormSubmit.co — soumissions illimitées).
 * Remplace Formspree pour éviter les blocages liés au quota.
 *
 * À la première utilisation, FormSubmit envoie un email de confirmation à
 * FORM_RECIPIENT_EMAIL ; il faut cliquer sur le lien pour activer la réception.
 */
const FORM_RECIPIENT_EMAIL = 'contact@saussetreuni.fr'
export const FORM_SUBMIT_URL = `https://formsubmit.co/ajax/${FORM_RECIPIENT_EMAIL}`
