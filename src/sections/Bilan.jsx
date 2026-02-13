import FadeIn from '../components/FadeIn'
import SectionTitle from '../components/SectionTitle'
import styles from './Bilan.module.css'

const items = [
  {
    icon: '🏫',
    title: 'École Victor Hugo',
    desc: 'Réhabilitation complète de l\'école pour offrir un cadre d\'excellence à nos enfants. Un projet à 7 millions d\'euros livré en 2025.',
  },
  {
    icon: '🏗️',
    title: 'Résidence Lilö Bleu',
    desc: 'Création de logements accessibles pour les jeunes Saussetois, favorisant la mixité sociale et l\'ancrage local.',
  },
  {
    icon: '🌊',
    title: 'Protection du littoral',
    desc: 'Préservation de notre patrimoine naturel méditerranéen : plages, calanques et espaces verts entretenus et protégés.',
  },
  {
    icon: '💡',
    title: 'Modernisation des équipements',
    desc: 'Rénovation de l\'éclairage public, réfection des voiries et amélioration du cadre de vie au quotidien.',
  },
  {
    icon: '🤝',
    title: 'Vie associative',
    desc: 'Soutien renforcé aux associations locales, animations culturelles et sportives tout au long de l\'année.',
  },
  {
    icon: '🛡️',
    title: 'Sécurité & tranquillité',
    desc: 'Maintien d\'un cadre de vie serein et sécurisé pour tous les Saussetois, en lien avec les forces de l\'ordre.',
  },
]

export default function Bilan() {
  return (
    <section className={styles.section} id="bilan">
      <div className="container">
        <SectionTitle
          label="Notre bilan"
          title="Ce que nous avons accompli ensemble"
          subtitle="Depuis 2020, notre équipe a mené à bien de nombreux projets pour améliorer le quotidien de chaque Saussetois."
        />

        <div className={styles.grid}>
          {items.map((item, i) => (
            <FadeIn key={i} delay={i * 0.08} direction="up">
              <div className={styles.card}>
                <span className={styles.icon}>{item.icon}</span>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
