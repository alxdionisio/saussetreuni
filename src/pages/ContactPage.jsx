import { useState } from 'react'
import { Link } from 'react-router-dom'
import FadeIn from '../components/FadeIn'
import SectionTitle from '../components/SectionTitle'
import Breadcrumb from '../components/Breadcrumb'
import { useCookieConsent } from '../contexts/CookieConsentContext'
import { FORM_SUBMIT_URL } from '../lib/formEndpoint'
import styles from './ContactPage.module.css'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ContactPage() {
  const { trackEvent } = useCookieConsent()
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // 'idle' | 'sending' | 'success' | 'error'

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    const nom = form.nom?.value?.trim()
    const prenom = form.prenom?.value?.trim()
    const email = form.email?.value?.trim()
    const message = form.message?.value?.trim()
    const consent = form.consent?.checked

    const next = {}
    if (!nom) next.nom = 'Ce champ est obligatoire.'
    if (!prenom) next.prenom = 'Ce champ est obligatoire.'
    if (!email) next.email = 'Ce champ est obligatoire.'
    else if (!EMAIL_REGEX.test(email)) next.email = 'Veuillez entrer une adresse email valide.'
    if (!message) next.message = 'Ce champ est obligatoire.'
    if (!consent) next.consent = 'Veuillez accepter la politique de confidentialité pour envoyer votre message.'

    setErrors(next)
    if (Object.keys(next).length > 0) return

    setStatus('sending')
    try {
      const res = await fetch(FORM_SUBMIT_URL, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
        trackEvent('form_submit', { form: 'contact_page' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const clearError = (name) => {
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }))
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <Breadcrumb onHero variant="light" />
        <header className={styles.header}>
          <SectionTitle
            label="Nous contacter"
            title="Partagez vos idées, vos préoccupations, vos attentes"
            subtitle="Permanence, événements de campagne et formulaire : retrouvez toutes les façons d'échanger avec l'équipe Sausset Réuni."
            light
            titleAs="h1"
          />
        </header>

        <div className={styles.grid}>
          <FadeIn direction="left" className={styles.info}>
            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>Permanence de campagne</h3>
              <p className={styles.infoText}>10 Av. Adolphe Fouque</p>
              <p className={styles.infoSub}>13960 Sausset-les-Pins</p>
              <p className={styles.infoMuted}>
                Venez nous rencontrer aux horaires d'ouverture pour échanger avec l'équipe et les membres de la liste.
              </p>
            </div>

            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>Prochains événements</h3>
              <p className={styles.infoMuted}>
                La campagne est à présent terminée. Merci aux Saussetoises et aux Saussetois
                pour leur engagement à nos côtés et leur confiance.
              </p>
              <Link to="/calendrier" className={styles.calendarLink}>
                Voir le calendrier de campagne →
              </Link>
            </div>

            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>Contact</h3>
              <p>
                <a href="mailto:contact@saussetreuni.fr" className={styles.link}>
                  contact@saussetreuni.fr
                </a>
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="right">
            <form
              className={styles.form}
              action={FORM_SUBMIT_URL}
              method="POST"
              onSubmit={handleSubmit}
              noValidate
            >
              <input type="hidden" name="_subject" value="Nouveau message - Contact (Sausset Réuni)" />
              <input type="hidden" name="Type de demande" value="Contact (page dédiée)" />
              {status === 'success' && (
                <div className={styles.formFeedback} role="status" aria-live="polite">
                  <span className={styles.formFeedbackIcon} aria-hidden>✓</span>
                  <p className={styles.formFeedbackTitle}>Message envoyé</p>
                  <p className={styles.formFeedbackText}>
                    Merci pour votre message. Nous vous répondrons dans les meilleurs délais.
                  </p>
                </div>
              )}
              {status === 'error' && (
                <div className={`${styles.formFeedback} ${styles.formFeedbackError}`} role="alert">
                  <p className={styles.formFeedbackTitle}>Erreur d'envoi</p>
                  <p className={styles.formFeedbackText}>
                    L'envoi a échoué. Vous pouvez réessayer ou nous contacter à{' '}
                    <a href="mailto:contact@saussetreuni.fr" className={styles.link}>contact@saussetreuni.fr</a>.
                  </p>
                </div>
              )}
              {status !== 'success' && (
                <>
              <h3 className={styles.formTitle}>Envoyez-nous un message</h3>
              <div className={styles.formRow}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="contact-nom">Nom</label>
                  <input
                    id="contact-nom"
                    name="nom"
                    type="text"
                    className={`${styles.input} ${errors.nom ? styles.inputError : ''}`}
                    placeholder="Votre nom"
                    onChange={() => clearError('nom')}
                    aria-invalid={!!errors.nom}
                    aria-describedby={errors.nom ? 'contact-nom-error' : undefined}
                  />
                  {errors.nom && (
                    <span id="contact-nom-error" className={styles.fieldError} role="alert">
                      {errors.nom}
                    </span>
                  )}
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="contact-prenom">Prénom</label>
                  <input
                    id="contact-prenom"
                    name="prenom"
                    type="text"
                    className={`${styles.input} ${errors.prenom ? styles.inputError : ''}`}
                    placeholder="Votre prénom"
                    onChange={() => clearError('prenom')}
                    aria-invalid={!!errors.prenom}
                    aria-describedby={errors.prenom ? 'contact-prenom-error' : undefined}
                  />
                  {errors.prenom && (
                    <span id="contact-prenom-error" className={styles.fieldError} role="alert">
                      {errors.prenom}
                    </span>
                  )}
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                    placeholder="votre@email.fr"
                    onChange={() => clearError('email')}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  />
                  {errors.email && (
                    <span id="contact-email-error" className={styles.fieldError} role="alert">
                      {errors.email}
                    </span>
                  )}
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="contact-tel">Téléphone</label>
                  <input
                    id="contact-tel"
                    name="tel"
                    type="tel"
                    className={styles.input}
                    placeholder="06 00 00 00 00"
                  />
                </div>
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="contact-message">Votre message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                  rows={4}
                  placeholder="Vos idées, vos questions…"
                  onChange={() => clearError('message')}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                />
                {errors.message && (
                  <span id="contact-message-error" className={styles.fieldError} role="alert">
                    {errors.message}
                  </span>
                )}
              </div>
              <div className={styles.field}>
                <label className={`${styles.checkboxLabel} ${errors.consent ? styles.checkboxLabelError : ''}`}>
                  <input
                    name="consent"
                    type="checkbox"
                    className={styles.checkbox}
                    onChange={() => clearError('consent')}
                    aria-invalid={!!errors.consent}
                    aria-describedby={errors.consent ? 'contact-consent-error' : undefined}
                  />
                <span>
                  J'accepte que mes données personnelles soient collectées et traitées dans le cadre de cette
                  demande, conformément à la{' '}
                  <Link to="/politique-confidentialite" className={styles.checkboxLink}>
                    politique de confidentialité
                  </Link>
                  . Ces données ne seront utilisées que pour répondre à ma contribution et ne seront en aucun
                  cas transmises à des tiers. *
                </span>
                </label>
                {errors.consent && (
                  <span id="contact-consent-error" className={styles.fieldError} role="alert">
                    {errors.consent}
                  </span>
                )}
              </div>
              <button type="submit" className={styles.submit} disabled={status === 'sending'}>
                {status === 'sending' ? 'Envoi en cours…' : 'Envoyer mon message'}
              </button>
                </>
              )}
            </form>
          </FadeIn>
        </div>
      </div>
    </div>
  )
}
