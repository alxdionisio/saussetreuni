import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import FadeIn from '../components/FadeIn'
import SectionTitle from '../components/SectionTitle'
import { useCookieConsent } from '../contexts/CookieConsentContext'
import { programmeThemes } from '../data/programme'
import styles from './ProgrammePreview.module.css'

/** Mélange Fisher-Yates puis prend les n premiers. */
function shuffleAndTake(arr, n) {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy.slice(0, n)
}

export default function ProgrammePreview() {
  const { trackEvent } = useCookieConsent()
  const previewThemes = useMemo(() => shuffleAndTake(programmeThemes, 3), [])

  return (
    <section className={styles.section} id="programme" data-header-bg="light">
      <div className="container">
        <SectionTitle
          label="Notre programme"
          title="Un projet pour chaque Saussetois"
          subtitle="Notre programme est disponible. Il a été élaboré avec les Saussetois et les Saussetoises. Découvrez les grandes orientations pour le prochain mandat."
        />

        <FadeIn>
          <div className={styles.cards}>
            {previewThemes.map((t) => (
              <div key={t.id} className={styles.card}>
                <span className={styles.cardIcon}>{t.icon}</span>
                <h3 className={styles.cardTitle}>{t.label}</h3>
                <p className={styles.cardDesc}>
                  {t.intro || (t.items && t.items[0])}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn>
          <div className={styles.ctaWrap}>
            <Link to="/programme" className={styles.cta} onClick={() => trackEvent('cta_click', { cta: 'programme', location: 'programme_preview' })}>
              Découvrir notre programme
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
