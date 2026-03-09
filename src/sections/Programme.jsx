import { Link } from 'react-router-dom'
import FadeIn from '../components/FadeIn'
import SectionTitle from '../components/SectionTitle'
import Breadcrumb from '../components/Breadcrumb'
import styles from './Programme.module.css'

const PROGRAMME_PDF_ORIGINAL = 'Sausset Reuni 2026 - Le programme.pdf'
const PROGRAMME_PDF_SAFE = 'programme-sausset-reuni-2026.pdf'

export default function Programme() {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') || ''
  const pdfBaseUrl = import.meta.env.DEV
    ? `/${encodeURIComponent(PROGRAMME_PDF_ORIGINAL)}`
    : `${base}/${PROGRAMME_PDF_SAFE}`
  // Paramètres du lecteur PDF intégré (Chrome/Edge) : masquer barre d’outils et panneau latéral
  const pdfUrl = `${pdfBaseUrl}#toolbar=0&navpanes=0&view=Fit&page=1`

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
          <div className={styles.pdfEmbed}>
            <iframe
              src={pdfUrl}
              title="Programme Sausset Réuni 2026"
              className={styles.pdfIframe}
            />
          </div>
        </FadeIn>

        <div className={styles.internalLinks}>
          <Link to="/calendrier" className={styles.internalLinkBtn}>Voir le calendrier des événements</Link>
          <Link to="/contact" className={styles.internalLinkBtn}>Nous contacter</Link>
        </div>
      </div>
    </section>
  )
}
