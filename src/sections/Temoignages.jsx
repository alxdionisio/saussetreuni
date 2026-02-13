import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FadeIn from '../components/FadeIn'
import SectionTitle from '../components/SectionTitle'
import styles from './Temoignages.module.css'

const temoignages = [
  {
    quote: 'Grâce à la rénovation de l\'école Victor Hugo, nos enfants bénéficient d\'un cadre exceptionnel. C\'est une fierté pour notre commune.',
    name: 'Catherine D.',
    role: 'Parent d\'élève, quartier du Centre',
  },
  {
    quote: 'Maxime est un maire jeune, dynamique et surtout à l\'écoute. Il a toujours été disponible lorsque notre association avait besoin de soutien.',
    name: 'Philippe R.',
    role: 'Président d\'association sportive',
  },
  {
    quote: 'La qualité de vie à Sausset s\'est nettement améliorée ces dernières années. Les espaces publics sont mieux entretenus, c\'est agréable.',
    name: 'Nathalie M.',
    role: 'Commerçante, quartier du Port',
  },
  {
    quote: 'En tant que senior, j\'apprécie l\'attention portée à notre quotidien. Les initiatives pour les aînés sont concrètes et bienvenues.',
    name: 'Jean-Pierre B.',
    role: 'Retraité, quartier du Calendal',
  },
]

export default function Temoignages() {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c === 0 ? temoignages.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === temoignages.length - 1 ? 0 : c + 1))

  return (
    <section className={styles.section} id="temoignages">
      <div className="container">
        <SectionTitle
          label="Témoignages"
          title="Ils soutiennent Sausset Réuni"
          subtitle="Les habitants de Sausset-les-Pins partagent leur expérience."
        />

        <FadeIn>
          <div className={styles.carousel}>
            <button className={styles.arrow} onClick={prev} aria-label="Précédent">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className={styles.cardWrapper}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  className={styles.card}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.35 }}
                >
                  <svg className={styles.quoteIcon} width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/>
                  </svg>
                  <p className={styles.quote}>{temoignages[current].quote}</p>
                  <div className={styles.author}>
                    <span className={styles.authorName}>{temoignages[current].name}</span>
                    <span className={styles.authorRole}>{temoignages[current].role}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <button className={styles.arrow} onClick={next} aria-label="Suivant">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className={styles.dots}>
            {temoignages.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
                onClick={() => setCurrent(i)}
                aria-label={`Témoignage ${i + 1}`}
              />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
