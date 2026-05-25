import { useState } from 'react'
import { Link } from 'react-router-dom'
import FadeIn from '../components/FadeIn'
import SectionTitle from '../components/SectionTitle'
import { useCookieConsent } from '../contexts/CookieConsentContext'
import { FORM_SUBMIT_URL } from '../lib/formEndpoint'
import styles from './BoiteAQuestions.module.css'

export default function BoiteAQuestions() {
  const { trackEvent } = useCookieConsent()
  const [status, setStatus] = useState('idle') // 'idle' | 'sending' | 'success' | 'error'

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    const message = form.message?.value?.trim()
    if (!message) return
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
        trackEvent('form_submit', { form: 'boite_questions' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className={styles.section} id="boite-questions">
      <div className="container">
        <SectionTitle
          label="Votre avis"
          title="Boîte à questions"
          subtitle={
            <>
              Une question, une idée ou une suggestion ? Utilisez le formulaire ci-dessous. Celles-ci seront lues par notre équipe et nous veillerons à y répondre lors de notre prochain rendez-vous{' '}
              <Link to="/calendrier" className={styles.link}>jeudi 19 mars à 18h30</Link>.
            </>
          }
        />

        <FadeIn>
          <div className={styles.formWrap}>
            <form
              className={styles.form}
              action={FORM_SUBMIT_URL}
              method="POST"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="_subject" value="Boîte à questions - Sausset Réuni" />
              <input type="hidden" name="Type de demande" value="Boîte à questions (accueil)" />
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
                  <div className={styles.formRow}>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="boite-nom">Nom (facultatif)</label>
                      <input
                        id="boite-nom"
                        name="nom"
                        type="text"
                        className={styles.input}
                        placeholder="Votre nom"
                      />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="boite-prenom">Prénom (facultatif)</label>
                      <input
                        id="boite-prenom"
                        name="prenom"
                        type="text"
                        className={styles.input}
                        placeholder="Votre prénom"
                      />
                    </div>
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="boite-message">Votre question ou demande</label>
                    <textarea
                      id="boite-message"
                      name="message"
                      className={styles.textarea}
                      rows={5}
                      placeholder="Rédigez votre question ou votre demande…"
                      required
                    />
                  </div>
                  <button type="submit" className={styles.submit} disabled={status === 'sending'}>
                    {status === 'sending' ? 'Envoi en cours…' : 'Envoyer'}
                  </button>
                </>
              )}
            </form>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
