import { Link } from 'react-router-dom'
import FadeIn from '../components/FadeIn'
import { useCookieConsent } from '../contexts/CookieConsentContext'
import styles from './ContactCTA.module.css'

export default function ContactCTA() {
  const { trackEvent } = useCookieConsent()
  return (
    <section className={styles.section} data-header-bg="light">
      <div className="container">
        <FadeIn>
          <div className={styles.block}>
            <h2 className={styles.title}>Envie d'échanger avec nous ?</h2>
            <p className={styles.subtitle}>
              L'équipe Sausset Réuni est à votre écoute. Permanence, événements ou message en ligne.
            </p>
            <div className={styles.actions}>
              <Link to="/contact" className={styles.ctaPrimary} onClick={() => trackEvent('cta_click', { cta: 'contact', location: 'contact_cta' })}>
                Nous contacter
              </Link>
              <Link to="/calendrier" className={styles.ctaSecondary} onClick={() => trackEvent('cta_click', { cta: 'calendrier', location: 'contact_cta' })}>
                Voir le calendrier
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
