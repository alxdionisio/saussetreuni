import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useCookieConsent } from '../contexts/CookieConsentContext'
import Breadcrumb from '../components/Breadcrumb'
import styles from './NotFoundPage.module.css'

const PAGE_TITLE = 'Page introuvable - Sausset Réuni 2026'
const PAGE_DESCRIPTION =
  'Cette page n’existe pas ou a été déplacée. Retournez à l’accueil du site Sausset Réuni 2026 ou contactez-nous.'

export default function NotFoundPage() {
  const { pathname } = useLocation()
  const { trackEvent, consent } = useCookieConsent()

  useEffect(() => {
    if (consent === 'accepted') {
      trackEvent('page_not_found', { path: pathname })
    }
  }, [pathname, consent, trackEvent])

  return (
    <>
      <Helmet>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className={styles.page}>
        <div className={styles.content}>
          <Breadcrumb onHero />
          <p className={styles.code} aria-hidden>
            404
          </p>
          <h1 className={styles.title}>Cette page a pris le large</h1>
          <p className={styles.text}>
            Le lien que vous avez suivi ne mène nulle part - ou plus.<br/>Pas de panique&nbsp;:
            vous pouvez retrouver votre chemin en un clic.
          </p>
          <nav className={styles.nav} aria-label="Navigation de secours">
            <Link
              to="/"
              className={styles.primaryLink}
              onClick={() => trackEvent('cta_click', { cta: 'home', location: '404' })}
            >
              Retour à l’accueil
            </Link>
            <Link
              to="/contact"
              className={styles.secondaryLink}
              onClick={() => trackEvent('cta_click', { cta: 'contact', location: '404' })}
            >
              Nous contacter
            </Link>
            <Link
              to="/programme"
              className={styles.secondaryLink}
              onClick={() => trackEvent('cta_click', { cta: 'programme', location: '404' })}
            >
              Voir le programme
            </Link>
          </nav>
        </div>
      </div>
    </>
  )
}
