import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import FadeIn from '../components/FadeIn'
import SectionTitle from '../components/SectionTitle'
import { useCookieConsent } from '../contexts/CookieConsentContext'
import { colistiers, getDisplayName, getImageAlt } from '../data/colistiers'
import styles from './ListePreview.module.css'

export default function ListePreview() {
  const scrollRef = useRef(null)
  const { trackEvent } = useCookieConsent()

  const scroll = (direction) => {
    const el = scrollRef.current
    if (!el) return
    const firstSlide = el.querySelector(`.${styles.slide}`)
    const gap = 20
    const step = firstSlide ? firstSlide.offsetWidth + gap : 140
    el.scrollBy({ left: direction * step, behavior: 'smooth' })
  }

  return (
    <section className={styles.section} id="liste" data-header-bg="light">
      <div className="container">
        <SectionTitle
          label="Notre liste"
          title="Une équipe engagée et dévouée"
          subtitle="Une équipe de Saussetois engagés pour porter le projet Sausset Réuni 2026. Découvrez les visages de la liste."
        />

        <FadeIn>
          <div className={styles.sliderSection}>
            <button
              type="button"
              className={styles.arrow}
              aria-label="Défiler vers la gauche"
              onClick={() => scroll(-1)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <div className={styles.sliderWrap}>
              <div ref={scrollRef} className={styles.slider} role="list">
              {colistiers.map((c, i) => (
                <div key={c.id} className={styles.slide} role="listitem">
                  <motion.div
                    className={styles.avatarWrap}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-20px' }}
                    transition={{ delay: i * 0.03, duration: 0.35 }}
                  >
                    <div className={styles.avatar}>
                      <img src={c.image} alt={getImageAlt(c)} loading="lazy" />
                    </div>
                    <div className={styles.hoverOverlay}>
                      <span className={styles.hoverName}>{getDisplayName(c)}</span>
                    </div>
                  </motion.div>
                </div>
              ))}
              </div>
            </div>
            <button
              type="button"
              className={`${styles.arrow} ${styles.arrowRight}`}
              aria-label="Défiler vers la droite"
              onClick={() => scroll(1)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </FadeIn>

        <FadeIn>
          <div className={styles.ctaWrap}>
            <Link to="/liste" className={styles.cta} onClick={() => trackEvent('cta_click', { cta: 'liste', location: 'liste_preview' })}>
              Découvrir la liste complète
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
