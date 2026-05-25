import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCookieConsent } from '../contexts/CookieConsentContext'
import styles from './Hero.module.css'

export default function Hero() {
  const { trackEvent } = useCookieConsent()
  return (
    <section className={styles.hero} id="hero" data-header-bg="dark">
      <div className={styles.heroBg} aria-hidden />
      <div className={styles.overlay} />

      <div className={`container ${styles.content}`}>
        <motion.div
          className={styles.badge}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Élections Municipales - 15 &amp; 22 Mars 2026
        </motion.div>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={styles.titleBrand}>Sausset<br/>Réuni</span>
          <span className={styles.titleTagline}>Votre équipe pour servir Sausset</span>
        </motion.h1>

        <motion.div
          className={styles.actions}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.7 }}
        >
          <Link to="/programme" className={styles.btnPrimary} onClick={() => trackEvent('cta_click', { cta: 'programme', location: 'hero' })}>
            Découvrir notre programme
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link to="/comite-soutien" className={styles.btnSecondary} onClick={() => trackEvent('cta_click', { cta: 'comite_soutien', location: 'hero' })}>
            Rejoindre le comité de soutien
          </Link>
        </motion.div>

      </div>

      <a
        className={styles.credit}
      >
        Photo : © Sausset Réuni 2026
      </a>
    </section>
  )
}
