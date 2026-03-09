import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import FadeIn from '../components/FadeIn'
import SectionTitle from '../components/SectionTitle'
import Breadcrumb from '../components/Breadcrumb'
import styles from './Programme.module.css'

const PROGRAMME_PDF_ORIGINAL = 'Sausset Reuni 2026 - Le programme.pdf'
const PROGRAMME_PDF_SAFE = 'programme-sausset-reuni-2026.pdf'
const ZOOM_MIN = 50
const ZOOM_MAX = 200
const ZOOM_STEP = 25
const DESKTOP_BREAKPOINT = 901

export default function Programme() {
  const [zoom, setZoom] = useState(100)
  const [showEmbed, setShowEmbed] = useState(true)
  const [mobileOpening, setMobileOpening] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`)
    const update = () => setShowEmbed(mql.matches)
    update()
    mql.addEventListener('change', update)
    return () => mql.removeEventListener('change', update)
  }, [])
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') || ''
  const pdfBaseUrl = import.meta.env.DEV
    ? `/${encodeURIComponent(PROGRAMME_PDF_ORIGINAL)}`
    : `${base}/${PROGRAMME_PDF_SAFE}`
  // Paramètres du lecteur PDF intégré (Chrome/Edge) : masquer barre d’outils et panneau latéral
  const hashParams = zoom <= 100
    ? 'toolbar=0&navpanes=0&view=FitH&page=1'
    : `toolbar=0&navpanes=0&zoom=${zoom}&page=1`
  const pdfUrl = `${pdfBaseUrl}#${hashParams}`
  const zoomOut = () => setZoom((z) => Math.max(ZOOM_MIN, z - ZOOM_STEP))
  const zoomIn = () => setZoom((z) => Math.min(ZOOM_MAX, z + ZOOM_STEP))

  const handleMobilePdfOpen = (e) => {
    setMobileOpening(true)
    setTimeout(() => setMobileOpening(false), 2500)
  }

  return (
    <section className={styles.section} id="programme">
      <div className="container">
        <Breadcrumb onHero />
        <SectionTitle
          label="Notre programme"
          title="Un projet pour chaque Saussetois"
          subtitle="Notre programme a été élaboré avec les Saussetois et les Saussetoises. Il répond aux besoins réels de notre commune et évolue au fil des échanges."
          titleAs="h1"
        />

        <p className={styles.intro}>
          Le programme détaillé est disponible ci-dessous.
        </p>

        <FadeIn>
          {showEmbed && (
          <div className={styles.pdfEmbed}>
            <div className={styles.pdfZoomBar}>
              <button
                type="button"
                className={styles.pdfZoomBtn}
                onClick={zoomOut}
                disabled={zoom <= ZOOM_MIN}
                aria-label="Réduire le zoom"
              >
                −
              </button>
              <span className={styles.pdfZoomLabel}>{zoom} %</span>
              <button
                type="button"
                className={styles.pdfZoomBtn}
                onClick={zoomIn}
                disabled={zoom >= ZOOM_MAX}
                aria-label="Augmenter le zoom"
              >
                +
              </button>
            </div>
            <iframe
              key={zoom}
              src={pdfUrl}
              title="Programme Sausset Réuni 2026"
              className={styles.pdfIframe}
            />
          </div>
          )}
          <div className={styles.pdfMobileCta}>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.pdfMobileBtn}
              onClick={handleMobilePdfOpen}
            >
              {mobileOpening ? 'Ouverture du PDF…' : 'Ouvrir le programme (PDF)'}
            </a>
          </div>
        </FadeIn>

        <div className={styles.internalLinks}>
          <Link to="/programme/projections" className={styles.projectionsCta}>Découvrir les projections</Link>
          <div className={styles.internalLinksSecondary}>
            <Link to="/calendrier" className={styles.internalLinkBtn}>Voir le calendrier des événements</Link>
            <Link to="/contact" className={styles.internalLinkBtn}>Nous contacter</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
