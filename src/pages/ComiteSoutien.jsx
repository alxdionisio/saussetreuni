import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import FadeIn from '../components/FadeIn'
import SectionTitle from '../components/SectionTitle'
import Breadcrumb from '../components/Breadcrumb'
import { useCookieConsent } from '../contexts/CookieConsentContext'
import styles from './ComiteSoutien.module.css'

const FORMSPREE_ID = 'mbdagbly'
const FORMSPREE_URL = `https://formspree.io/f/${FORMSPREE_ID}`
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const pourquoiRejoindre = [
  "S'engager concrètement aux côtés de la liste Sausset Réuni",
  'Contribuer activement à un projet pour votre commune',
  "Rencontrer d'autres personnes engagées",
  'Être informé des événements et actualités (WhatsApp & newsletter)',
  'Participer à la vie démocratique du village',
]

export default function ComiteSoutien() {
  const { trackEvent } = useCookieConsent()
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // 'idle' | 'sending' | 'success' | 'error'

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    const prenom = form.prenom?.value?.trim()
    const nom = form.nom?.value?.trim()
    const email = form.email?.value?.trim()
    const consent = form.consent?.checked

    const next = {}
    if (!prenom) next.prenom = 'Ce champ est obligatoire.'
    if (!nom) next.nom = 'Ce champ est obligatoire.'
    if (!email) next.email = 'Ce champ est obligatoire.'
    else if (!EMAIL_REGEX.test(email)) next.email = 'Veuillez entrer une adresse email valide.'
    if (!consent) next.consent = 'Veuillez accepter la politique de confidentialité pour envoyer votre candidature.'

    setErrors(next)
    // Note: consentNewsletter (case newsletter/WhatsApp) est optionnel, pas de validation requise
    if (Object.keys(next).length > 0) return

    setStatus('sending')
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
        trackEvent('form_submit', { form: 'comite_soutien' })
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
      <header className={styles.hero}>
        <div className="container">
          <Breadcrumb onHero variant="light" />
          <SectionTitle
            label="Comité de soutien"
            title="Rejoignez l'équipe sur le terrain"
            subtitle="Le comité de soutien rassemble les habitants qui souhaitent agir concrètement pour Sausset. Chaque engagement compte, à votre rythme."
            light
            titleAs="h1"
          />
        </div>
      </header>

      <div className={styles.content}>
        <div className="container">
          <FadeIn>
            <section className={styles.card}>
              <span className={styles.cardLabel}>Qu'est-ce que c'est ?</span>
              <h2 className={styles.cardTitle}>Un engagement à votre mesure</h2>
              <p className={styles.cardText}>
                Le comité de soutien rassemble les habitants de Sausset-les-Pins qui souhaitent
                soutenir Maxime Marchand et l'équipe Sausset Réuni pour les élections municipales
                de 2026. L'objectif est d'agir sur le terrain selon les disponibilités de chacun.
              </p>
            </section>
          </FadeIn>

          <FadeIn delay={0.1}>
            <section className={styles.card}>
              <span className={styles.cardLabel}>Pourquoi nous rejoindre ?</span>
              <h2 className={styles.cardTitle}>Cinq bonnes raisons</h2>
              <ul className={styles.reasonsList}>
                {pourquoiRejoindre.map((text, i) => (
                  <li key={i} className={styles.reasonsItem}>
                    <span className={styles.reasonsBullet} aria-hidden />
                    {text}
                  </li>
                ))}
              </ul>
            </section>
          </FadeIn>

          <FadeIn delay={0.15}>
            <h2 className={styles.howTitle}>Comment nous rejoindre ?</h2>
            <div className={styles.howGrid}>
              <div className={styles.howCard}>
                <h3 className={styles.howCardTitle}>En personne</h3>
                <p className={styles.howCardText}>
                  À la permanence de campagne au 10 av. Adolphe Fouque : venez aux horaires
                  d'ouverture échanger avec les membres de la liste.
                </p>
                <Link to="/contact" className={styles.howLink}>
                  Voir les infos permanence →
                </Link>
              </div>
              <div className={styles.howCard}>
                <h3 className={styles.howCardTitle}>En ligne</h3>
                <p className={styles.howCardText}>
                  Remplissez le formulaire ci-dessous. Nous vous recontactons sous 24 h.<br/>Vous
                  pouvez aussi nous laisser un message ou vos disponibilités.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>

        <section className={styles.formSection} id="formulaire">
          <div className="container">
            <FadeIn>
              <div className={styles.formWrapper}>
                <h2 className={styles.formTitle}>Formulaire d'inscription</h2>
                <p className={styles.formSubtitle}>
                  Remplissez le formulaire pour rejoindre le comité de soutien. Nous vous
                  recontactons rapidement.
                </p>
                <motion.form
                  className={styles.form}
                  action={FORMSPREE_URL}
                  method="POST"
                  onSubmit={handleSubmit}
                  noValidate
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <input type="hidden" name="_subject" value="Inscription comité de soutien (Sausset Réuni)" />
                  <input type="hidden" name="Type de demande" value="Inscription comité de soutien" />
                  {status === 'success' && (
                    <div className={styles.formFeedback} role="status" aria-live="polite">
                      <span className={styles.formFeedbackIcon} aria-hidden>✓</span>
                      <p className={styles.formFeedbackTitle}>Inscription envoyée</p>
                      <p className={styles.formFeedbackText}>
                        Merci ! Votre demande a bien été reçue. Nous vous recontactons sous 24 h.
                      </p>
                    </div>
                  )}
                  {status === 'error' && (
                    <div className={`${styles.formFeedback} ${styles.formFeedbackError}`} role="alert">
                      <p className={styles.formFeedbackTitle}>Erreur d'envoi</p>
                      <p className={styles.formFeedbackText}>
                        L'envoi a échoué. Vous pouvez réessayer ou nous contacter à{' '}
                        <a href="mailto:contact@sausset-reuni.fr" className={styles.checkboxLink}>contact@sausset-reuni.fr</a>.
                      </p>
                    </div>
                  )}
                  {status !== 'success' && (
                    <>
                  <div className={styles.formRow}>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="prenom">Prénom</label>
                      <input
                        id="prenom"
                        name="prenom"
                        type="text"
                        className={`${styles.input} ${errors.prenom ? styles.inputError : ''}`}
                        placeholder="Votre prénom"
                        onChange={() => clearError('prenom')}
                        aria-invalid={!!errors.prenom}
                        aria-describedby={errors.prenom ? 'comite-prenom-error' : undefined}
                      />
                      {errors.prenom && (
                        <span id="comite-prenom-error" className={styles.fieldError} role="alert">
                          {errors.prenom}
                        </span>
                      )}
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="nom">Nom</label>
                      <input
                        id="nom"
                        name="nom"
                        type="text"
                        className={`${styles.input} ${errors.nom ? styles.inputError : ''}`}
                        placeholder="Votre nom"
                        onChange={() => clearError('nom')}
                        aria-invalid={!!errors.nom}
                        aria-describedby={errors.nom ? 'comite-nom-error' : undefined}
                      />
                      {errors.nom && (
                        <span id="comite-nom-error" className={styles.fieldError} role="alert">
                          {errors.nom}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className={styles.formRow}>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="email">Adresse email</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                        placeholder="votre@email.fr"
                        onChange={() => clearError('email')}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'comite-email-error' : undefined}
                      />
                      {errors.email && (
                        <span id="comite-email-error" className={styles.fieldError} role="alert">
                          {errors.email}
                        </span>
                      )}
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="tel">N° de téléphone</label>
                      <input
                        id="tel"
                        name="tel"
                        type="tel"
                        className={styles.input}
                        placeholder="06 00 00 00 00"
                      />
                    </div>
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="adresse">Adresse postale</label>
                    <input
                      id="adresse"
                      name="adresse"
                      type="text"
                      className={styles.input}
                      placeholder="Votre adresse à Sausset-les-Pins"
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="message">Message ou disponibilités</label>
                    <textarea
                      id="message"
                      name="message"
                      className={styles.textarea}
                      rows={4}
                      placeholder="Votre message, vos disponibilités…"
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={`${styles.checkboxLabel} ${errors.consent ? styles.checkboxLabelError : ''}`}>
                      <input
                        name="consent"
                        type="checkbox"
                        className={styles.checkbox}
                        onChange={() => clearError('consent')}
                        aria-invalid={!!errors.consent}
                        aria-describedby={errors.consent ? 'comite-consent-error' : undefined}
                      />
                      <span>
                        J'accepte que mes données personnelles soient collectées et traitées pour gérer mon
                        inscription au comité de soutien et me recontacter, conformément à la{' '}
                        <Link to="/politique-confidentialite" className={styles.checkboxLink}>
                          politique de confidentialité
                        </Link>
                        . *
                      </span>
                    </label>
                    {errors.consent && (
                      <span id="comite-consent-error" className={styles.fieldError} role="alert">
                        {errors.consent}
                      </span>
                    )}
                  </div>
                  <div className={styles.field}>
                    <label className={styles.checkboxLabel}>
                      <input name="consent_newsletter" type="checkbox" className={styles.checkbox} value="oui" />
                      <span>
                        J'accepte de recevoir les actualités et invitations de la liste (newsletter et/ou
                        groupe WhatsApp). Je peux me désinscrire à tout moment en nous contactant ou via le
                        lien présent dans chaque envoi. Voir la{' '}
                        <Link to="/politique-confidentialite" className={styles.checkboxLink}>
                          politique de confidentialité
                        </Link>
                        .
                      </span>
                    </label>
                  </div>
                  <button type="submit" className={styles.submit} disabled={status === 'sending'}>
                    {status === 'sending' ? 'Envoi en cours…' : 'Envoyer ma candidature'}
                  </button>
                    </>
                  )}
                </motion.form>
              </div>
            </FadeIn>
          </div>
        </section>
      </div>
    </div>
  )
}
