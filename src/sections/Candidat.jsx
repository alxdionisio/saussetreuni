import FadeIn from '../components/FadeIn'
import SectionTitle from '../components/SectionTitle'
import styles from './Candidat.module.css'

export default function Candidat() {
  return (
    <section className={styles.section} id="candidat" data-header-bg="light">
      <div className={styles.bgPattern} />
      <div className={`container ${styles.inner}`}>
        <FadeIn direction="left" className={styles.imageCol}>
          <div className={styles.imageWrapper}>
            <picture>
              <source type="image/webp" srcSet={`${import.meta.env.BASE_URL || '/'}maxime-marchand.webp`} />
              <img
                src={`${import.meta.env.BASE_URL || '/'}maxime-marchand.png`}
                alt="Maxime Marchand, maire de Sausset-les-Pins et candidat aux élections municipales 2026"
                width="400"
                height="500"
                loading="lazy"
                className={styles.portrait}
              />
            </picture>
            <div className={styles.imageDecor} />
          </div>
        </FadeIn>

        <div className={styles.textCol}>
          <SectionTitle
            label="Le candidat"
            title="Maxime Marchand"
          />

          <FadeIn delay={0.15}>
            <p className={styles.tagline}>
              Maire de Sausset-les-Pins depuis 2020 · Né en 1991
            </p>
          </FadeIn>

          <FadeIn delay={0.25}>
            <blockquote className={styles.quote}>
              « J'ai passé toute ma vie à Sausset-les-Pins. On ne peut faire plus Saussetois que moi. »
            </blockquote>
          </FadeIn>

          <FadeIn delay={0.35}>
            <p className={styles.bio}>
              Élu en 2020 à la tête d'une coalition citoyenne,
              il est devenu le plus jeune maire du département des Bouches-du-Rhône.
            </p>
          </FadeIn>

          <FadeIn delay={0.45}>
            <p className={styles.bio}>
              Maxime Marchand est passionné par son village. Il souhaite, avec sa liste Sausset Réuni, pouvoir poursuivre ses engagements auprès des Saussetois.
            </p>
          </FadeIn>

          <FadeIn delay={0.55}>
            <div className={styles.milestones}>

              <div className={styles.milestone}>
                <span className={styles.milestoneYear}>2020</span>
                <span>Élu maire de Sausset-les-Pins</span>
              </div>
              <div className={styles.milestone}>
                <span className={styles.milestoneYear}>2026</span>
                <span>Candidat à sa réélection</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
