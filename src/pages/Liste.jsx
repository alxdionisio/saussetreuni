import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import FadeIn from '../components/FadeIn'
import SectionTitle from '../components/SectionTitle'
import Breadcrumb from '../components/Breadcrumb'
import { colistiers, getDisplayName, getImageAlt } from '../data/colistiers'
import { getImageWebpUrl } from '../lib/imageUtils'
import styles from './Liste.module.css'

const base = import.meta.env.BASE_URL || '/'
const portraitWebp = `${base}maxime-marchand.webp`
const portraitFallback = `${base}maxime-marchand.png`

export default function Liste() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className="container">
          <Breadcrumb onHero variant="light" />
          <SectionTitle
            label="Notre liste"
            title="Une liste engagée et dévouée"
            subtitle="Une équipe de Saussetois engagés pour porter le projet Sausset Réuni 2026."
            light
            titleAs="h1"
          />
        </div>
      </header>

      <div className={styles.content}>
        <div className="container">
          <FadeIn>
            <div className={styles.candidateBlock}>
              <div className={styles.candidatePhotoWrap}>
                <picture>
                  <source type="image/webp" srcSet={portraitWebp} />
                  <img
                    src={portraitFallback}
                    alt="Maxime Marchand, candidat maire"
                    width={320}
                    height={400}
                    loading="eager"
                    className={styles.candidatePhoto}
                  />
                </picture>
              </div>
              <div className={styles.candidateMessage}>
                <blockquote className={styles.candidateQuote}>
                  Servir Sausset est avant tout un travail collectif, je suis très fier de l'équipe
                  que j'ai rassemblée pour vous. Une équipe renouvelée et expérimentée, avec des
                  femmes et des hommes investis de manière désintéressée pour notre village.
                </blockquote>
                <p className={styles.candidateSignature}>Maxime Marchand</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className={styles.grid} role="list">
              {colistiers.map((c, i) => (
                <motion.figure
                  key={c.id}
                  className={styles.card}
                  role="listitem"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ delay: Math.min(i * 0.04, 0.6), duration: 0.4 }}
                  whileHover={{ scale: 1.03, transition: { duration: 0.15, ease: 'easeOut' } }}
                >
                  <div className={styles.avatar}>
                    <picture>
                      <source type="image/webp" srcSet={getImageWebpUrl(c.image)} />
                      <img
                        src={c.image}
                        alt={getImageAlt(c)}
                        loading="lazy"
                        width={180}
                        height={180}
                        sizes="(max-width: 640px) 120px, (max-width: 900px) 150px, 180px"
                      />
                    </picture>
                  </div>
                  <figcaption className={styles.name}>{getDisplayName(c)}</figcaption>
                </motion.figure>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className={styles.internalLinks}>
              <Link to="/programme" className={styles.internalLinkBtn}>Découvrir notre programme</Link>
              <Link to="/contact" className={styles.internalLinkBtn}>Nous contacter</Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  )
}
