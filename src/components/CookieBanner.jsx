import { Link } from 'react-router-dom'
import { useCookieConsent } from '../contexts/CookieConsentContext'
import styles from './CookieBanner.module.css'

export default function CookieBanner() {
  const { consent, setConsent } = useCookieConsent()

  if (consent !== null) return null

  return (
    <div className={styles.banner} role="dialog" aria-label="Consentement aux cookies">
      <div className={styles.inner}>
        <p className={styles.text}>
          Ce site utilise des cookies nécessaires à son fonctionnement et, si vous acceptez, des cookies
          optionnels pour la mesure d'audience. En savoir plus dans notre{' '}
          <Link to="/politique-confidentialite" className={styles.link}>
            politique de confidentialité
          </Link>
          .
        </p>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.accept}
            onClick={() => setConsent('accepted')}
          >
            Tout accepter
          </button>
          <button
            type="button"
            className={styles.refuse}
            onClick={() => setConsent('refused')}
          >
            Tout refuser
          </button>
        </div>
      </div>
    </div>
  )
}
