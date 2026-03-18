import { useState } from 'react'
import FadeIn from '../components/FadeIn'
import SectionTitle from '../components/SectionTitle'
import { useCookieConsent } from '../contexts/CookieConsentContext'
import { FORM_SUBMIT_URL } from '../lib/formEndpoint'
import styles from './Contact.module.css'

export default function Contact() {
  const { trackEvent } = useCookieConsent()
  const [status, setStatus] = useState('idle') // 'idle' | 'sending' | 'success' | 'error'

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
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
        trackEvent('form_submit', { form: 'contact_home' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className={styles.section} id="contact">
      <div className="container">
        <SectionTitle
          label="Nous rejoindre"
          title="Engagez-vous à nos côtés"
          subtitle="Participez à la campagne, posez vos questions ou rejoignez notre équipe de bénévoles."
        />

        <div className={styles.grid}>
          <FadeIn direction="left">
            <div className={styles.info}>
              <div className={styles.infoCard}>
                <h3 className={styles.infoTitle}>📍 Permanence</h3>
                <p>Sausset-les-Pins</p>
                <p className={styles.muted}>Adresse communiquée prochainement</p>
              </div>

              <div className={styles.infoCard}>
                <h3 className={styles.infoTitle}>📅 Prochains événements</h3>
                <div className={styles.event}>
                  <span className={styles.eventDate}>Février 2026</span>
                  <span>Porte-à-porte &amp; ateliers de proximité</span>
                </div>
                <div className={styles.event}>
                  <span className={styles.eventDate}>6 Mars 2026</span>
                  <span>Grande réunion publique — Gymnase</span>
                </div>
                <div className={styles.event}>
                  <span className={styles.eventDate}>15 Mars 2026</span>
                  <span>Premier tour des élections municipales</span>
                </div>
                <div className={styles.event}>
                  <span className={styles.eventDate}>19 Mars 2026</span>
                  <span>Réunion publique à 18h30 — Gymnase A. Calmat</span>
                </div>
              </div>

              <div className={styles.infoCard}>
                <h3 className={styles.infoTitle}>📧 Contact</h3>
                <p>
                  <a href="mailto:contact@saussetreuni.fr" className={styles.link}>
                    contact@saussetreuni.fr
                  </a>
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="right">
            <form
              className={styles.form}
              action={FORM_SUBMIT_URL}
              method="POST"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="_subject" value="Restons en contact - Accueil (Sausset Réuni)" />
              <input type="hidden" name="Type de demande" value="Contact (accueil)" />
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
                    <a href="mailto:contact@sausset-reuni.fr" className={styles.link}>contact@sausset-reuni.fr</a>.
                  </p>
                </div>
              )}
              {status !== 'success' && (
                <>
              <h3 className={styles.formTitle}>Restons en contact</h3>
              <div className={styles.formRow}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="contact-home-prenom">Prénom</label>
                  <input id="contact-home-prenom" name="prenom" type="text" className={styles.input} placeholder="Votre prénom" />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="contact-home-nom">Nom</label>
                  <input id="contact-home-nom" name="nom" type="text" className={styles.input} placeholder="Votre nom" />
                </div>
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="contact-home-email">Email</label>
                <input id="contact-home-email" name="email" type="email" className={styles.input} placeholder="votre@email.fr" required />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="contact-home-message">Message</label>
                <textarea id="contact-home-message" name="message" className={styles.textarea} rows={4} placeholder="Votre message, vos idées, vos questions…" />
              </div>
              <button type="submit" className={styles.submit} disabled={status === 'sending'}>
                {status === 'sending' ? 'Envoi en cours…' : 'Envoyer le message'}
              </button>
                </>
              )}
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
