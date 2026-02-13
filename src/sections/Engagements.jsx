import FadeIn from '../components/FadeIn'
import SectionTitle from '../components/SectionTitle'
import styles from './Engagements.module.css'

const engagements = [
  { number: '01', title: 'Sécurité renforcée', desc: 'Maintenir la sécurité comme priorité avec des caméras déployées, Centre de Supervision Urbain, renforcement de la police municipale, coopération accrue avec la gendarmerie.' },
  { number: '02', title: 'Finances maîtrisées', desc: 'Poursuivre une gestion financière rigoureuse. Continuer à obtenir des subventions sans augmenter les impôts.' },
  { number: '03', title: 'Culture, traditions & festivités', desc: "Offrir une programmation culturelle et festive diversifiée, qualitative, accessible à tous et pour tous, avec des espaces culturels dédiés." },
  { number: '04', title: 'Urbanisme maîtrisé', desc: "Il est de notre devoir de protéger l'écrin entre mer et collines qu'est Sausset-les-Pins." },
  { number: '05', title: 'Actions sociales', desc: "Le maintien à domicile de nos aînés, l'accès à la propriété pour nos jeunes, le soutien aux familles monoparentales, le renforcement du CCAS et des dispositifs sociaux." },
  { number: '06', title: 'Éducation & Jeunesse', desc: "Investir dans l'avenir de nos enfants, garantir l'accès à une éducation de qualité dans des conditions d'excellence, permettre à nos jeunes de prendre la place qu'ils méritent dans notre village." },
  { number: '07', title: 'Cadre de vie & embellissement', desc: "Poursuivre l'embellissement de nos espaces publics, renforcer la propreté urbaine, accueillir un tourisme éco-citoyen et encadré, et instaurer un lien solide avec nos commerçants et artisans." },
  { number: '08', title: 'Vie associative', desc: "Poursuivre un travail de fond pour accompagner au mieux nos associations pour qu'elles puissent continuer de faire vibrer notre village." },
  { number: '09', title: 'Sports', desc: "Développer le sport avec de nouveaux équipements, maintenir une programmation sportive riche toute l'année, soutenir nos clubs et pratiques pour tous les âges." },
]

export default function Engagements() {
  return (
    <section className={styles.section} id="engagements" data-header-bg="dark">
      <div className={styles.bg} />
      <div className={`container ${styles.container}`}>
        <SectionTitle
          label="Nos engagements"
          title="Des valeurs au cœur de l'action"
          subtitle="Neuf engagements forts qui guident notre vision pour le prochain mandat."
          light
        />

        <div className={styles.grid}>
          {engagements.map((e, i) => (
            <FadeIn key={e.number} delay={i * 0.06} direction="up">
              <div className={styles.card}>
                <span className={styles.number}>{e.number}</span>
                <h3 className={styles.cardTitle}>{e.title}</h3>
                <p className={styles.cardDesc}>{e.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
