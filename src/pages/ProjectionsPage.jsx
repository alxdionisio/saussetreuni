import { useState } from 'react'
import { Link } from 'react-router-dom'
import FadeIn from '../components/FadeIn'
import SectionTitle from '../components/SectionTitle'
import Breadcrumb from '../components/Breadcrumb'
import BeforeAfterSlider from '../components/BeforeAfterSlider'
import LazyVideo from '../components/LazyVideo'
import styles from './ProjectionsPage.module.css'

// URL absolue depuis la racine du serveur pour les fichiers public/ (évite ./ en dev qui casse le chargement)
const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')
const publicBase = base === '.' ? '' : base
const IMAGE_DEBUT = `${publicBase}/${encodeURIComponent('Salle des arts - debut.png')}`
const IMAGE_FIN = `${publicBase}/${encodeURIComponent('Salle des arts - fin.png')}`
const VIDEO_SALLE = `${publicBase}/${encodeURIComponent('Salle des arts 1_version longue.mp4')}`
const IMAGE_DEBUT_2 = `${publicBase}/${encodeURIComponent('Salle des arts 2 - debut.png')}`
const IMAGE_FIN_2 = `${publicBase}/${encodeURIComponent('Salle des arts 2 - fin.png')}`
const VIDEO_SALLE_2 = `${publicBase}/${encodeURIComponent('Salle des arts 2_version longue.mp4')}`
const IMAGE_STADE_DEBUT = `${publicBase}/${encodeURIComponent('Stade - debut.png')}`
const IMAGE_STADE_FIN = `${publicBase}/${encodeURIComponent('Stade - fin.png')}`
const VIDEO_STADE = `${publicBase}/${encodeURIComponent('Stade_version longue.mp4')}`
const IMAGE_CAPITAINERIE_DEBUT = `${publicBase}/${encodeURIComponent('Capitainerie - debut.png')}`
const IMAGE_CAPITAINERIE_FIN = `${publicBase}/${encodeURIComponent('Capitainerie - fin.png')}`
const VIDEO_CAPITAINERIE = `${publicBase}/${encodeURIComponent('Capitainerie_version longue.mp4')}`
const IMAGE_PARC_DEBUT = `${publicBase}/${encodeURIComponent('Parc - debut.png')}`
const IMAGE_PARC_FIN = `${publicBase}/${encodeURIComponent('Parc - fin.png')}`
const VIDEO_PARC = `${publicBase}/${encodeURIComponent('Parc_version longue.mp4')}`
const IMAGE_PADEL_DEBUT = `${publicBase}/${encodeURIComponent('Padel - debut.png')}`
const IMAGE_PADEL_FIN = `${publicBase}/${encodeURIComponent('Padel - fin.png')}`
const VIDEO_PADEL = `${publicBase}/${encodeURIComponent('Padel_version longue.mp4')}`
const IMAGE_ECOLE_DEBUT = `${publicBase}/${encodeURIComponent('Ecole - debut.png')}`
const IMAGE_ECOLE_FIN = `${publicBase}/${encodeURIComponent('Ecole - fin.png')}`
const VIDEO_ECOLE = `${publicBase}/${encodeURIComponent('Ecole_version longue.mp4')}`

const TABS = [
  { id: 'salle-des-arts', label: 'Salle des arts' },
  { id: 'stade', label: 'Stade' },
  { id: 'capitainerie', label: 'Capitainerie' },
  { id: 'parc-barrage', label: 'Parc du barrage' },
  { id: 'padel', label: 'Padel' },
  { id: 'ecole-jules-ferry', label: 'École Jules Ferry' },
]

const ILLUSTRATION_NOTICE = 'Les projections présentées sur cette page sont à titre d’illustration.'

export default function ProjectionsPage() {
  const [activeTab, setActiveTab] = useState('salle-des-arts')

  return (
    <div className={styles.page}>
      <section className={styles.section}>
        <div className="container">
          <Breadcrumb centered noBorder />
          <SectionTitle
            label="Cadre de vie"
            title="Projections"
            subtitle="Découvrez les projets qui transforment notre commune."
            titleAs="h1"
          />

          <div className={styles.tabList} role="tablist" aria-label="Thématiques des projections">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`panel-${tab.id}`}
                id={`tab-${tab.id}`}
                className={activeTab === tab.id ? styles.tabActive : styles.tab}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className={styles.panels}>
            {activeTab === 'salle-des-arts' && (
              <div
                id="panel-salle-des-arts"
                role="tabpanel"
                aria-labelledby="tab-salle-des-arts"
                className={styles.panel}
              >
                <FadeIn key="salle">
                  <div className={styles.block}>
                    <h2 className={styles.subtitle}>Salle des arts - Avant / Après</h2>
                    <p className={styles.intro}>
                      Glissez la barre pour comparer l’état des lieux avant travaux et le résultat après rénovation.
                    </p>
                    <BeforeAfterSlider
                      beforeSrc={IMAGE_DEBUT}
                      afterSrc={IMAGE_FIN}
                      beforeLabel="Salle des arts avant"
                      afterLabel="Salle des arts après"
                    />
                  </div>
                </FadeIn>
                <FadeIn delay={0.1} key="salle-video">
                  <div className={styles.block}>
                    <h2 className={styles.subtitle}>Vidéo de présentation - Salle des arts</h2>
                    <div className={styles.videoWrap}>
                      <LazyVideo
                        className={styles.video}
                        src={VIDEO_SALLE}
                        poster={IMAGE_FIN}
                        title="Présentation de la Salle des arts"
                      >
                        Votre navigateur ne prend pas en charge la lecture de vidéos.
                      </LazyVideo>
                    </div>
                  </div>
                </FadeIn>
                <FadeIn delay={0.15} key="salle-2">
                  <div className={styles.block}>
                    <h2 className={styles.subtitle}>Salle des arts - Avant / Après (2e vue)</h2>
                    <p className={styles.intro}>
                      Glissez la barre pour comparer l’état des lieux avant travaux et le résultat après rénovation.
                    </p>
                    <BeforeAfterSlider
                      beforeSrc={IMAGE_DEBUT_2}
                      afterSrc={IMAGE_FIN_2}
                      beforeLabel="Salle des arts 2 avant"
                      afterLabel="Salle des arts 2 après"
                    />
                  </div>
                </FadeIn>
                <FadeIn delay={0.2} key="salle-video-2">
                  <div className={styles.block}>
                    <h2 className={styles.subtitle}>Vidéo de présentation - Salle des arts (2e vue)</h2>
                    <div className={styles.videoWrap}>
                      <LazyVideo
                        className={styles.video}
                        src={VIDEO_SALLE_2}
                        poster={IMAGE_FIN_2}
                        title="Présentation de la Salle des arts - 2e vue"
                      >
                        Votre navigateur ne prend pas en charge la lecture de vidéos.
                      </LazyVideo>
                    </div>
                    <p className={styles.illustrationNotice}>{ILLUSTRATION_NOTICE}</p>
                  </div>
                </FadeIn>
              </div>
            )}

            {activeTab === 'stade' && (
              <div
                id="panel-stade"
                role="tabpanel"
                aria-labelledby="tab-stade"
                className={styles.panel}
              >
                <FadeIn key="stade">
                  <div className={styles.block}>
                    <h2 className={styles.subtitle}>Stade - Avant / Après</h2>
                    <p className={styles.intro}>
                      Glissez la barre pour comparer l’état des lieux avant travaux et le résultat après rénovation.
                    </p>
                    <BeforeAfterSlider
                      beforeSrc={IMAGE_STADE_DEBUT}
                      afterSrc={IMAGE_STADE_FIN}
                      beforeLabel="Stade avant"
                      afterLabel="Stade après"
                    />
                  </div>
                </FadeIn>
                <FadeIn delay={0.1} key="stade-video">
                  <div className={styles.block}>
                    <h2 className={styles.subtitle}>Vidéo de présentation - Stade</h2>
                    <div className={styles.videoWrap}>
                      <LazyVideo
                        className={styles.video}
                        src={VIDEO_STADE}
                        poster={IMAGE_STADE_FIN}
                        title="Présentation du Stade"
                      >
                        Votre navigateur ne prend pas en charge la lecture de vidéos.
                      </LazyVideo>
                    </div>
                    <p className={styles.illustrationNotice}>{ILLUSTRATION_NOTICE}</p>
                  </div>
                </FadeIn>
              </div>
            )}

            {activeTab === 'capitainerie' && (
              <div
                id="panel-capitainerie"
                role="tabpanel"
                aria-labelledby="tab-capitainerie"
                className={styles.panel}
              >
                <FadeIn key="capitainerie">
                  <div className={styles.block}>
                    <h2 className={styles.subtitle}>Capitainerie - Avant / Après</h2>
                    <p className={styles.intro}>
                      Glissez la barre pour comparer l’état des lieux avant travaux et le résultat après rénovation.
                    </p>
                    <BeforeAfterSlider
                      beforeSrc={IMAGE_CAPITAINERIE_DEBUT}
                      afterSrc={IMAGE_CAPITAINERIE_FIN}
                      beforeLabel="Capitainerie avant"
                      afterLabel="Capitainerie après"
                    />
                  </div>
                </FadeIn>
                <FadeIn delay={0.1} key="capitainerie-video">
                  <div className={styles.block}>
                    <h2 className={styles.subtitle}>Vidéo de présentation - Capitainerie</h2>
                    <div className={styles.videoWrap}>
                      <LazyVideo
                        className={styles.video}
                        src={VIDEO_CAPITAINERIE}
                        poster={IMAGE_CAPITAINERIE_FIN}
                        title="Présentation de la Capitainerie"
                      >
                        Votre navigateur ne prend pas en charge la lecture de vidéos.
                      </LazyVideo>
                    </div>
                    <p className={styles.illustrationNotice}>{ILLUSTRATION_NOTICE}</p>
                  </div>
                </FadeIn>
              </div>
            )}

            {activeTab === 'parc-barrage' && (
              <div
                id="panel-parc-barrage"
                role="tabpanel"
                aria-labelledby="tab-parc-barrage"
                className={styles.panel}
              >
                <FadeIn key="parc">
                  <div className={styles.block}>
                    <h2 className={styles.subtitle}>Parc du barrage - Avant / Après</h2>
                    <p className={styles.intro}>
                      Glissez la barre pour comparer l’état des lieux avant travaux et le résultat après rénovation.
                    </p>
                    <BeforeAfterSlider
                      beforeSrc={IMAGE_PARC_DEBUT}
                      afterSrc={IMAGE_PARC_FIN}
                      beforeLabel="Parc du barrage avant"
                      afterLabel="Parc du barrage après"
                    />
                  </div>
                </FadeIn>
                <FadeIn delay={0.1} key="parc-video">
                  <div className={styles.block}>
                    <h2 className={styles.subtitle}>Vidéo de présentation - Parc du barrage</h2>
                    <div className={styles.videoWrap}>
                      <LazyVideo
                        className={styles.video}
                        src={VIDEO_PARC}
                        poster={IMAGE_PARC_FIN}
                        title="Présentation du Parc du barrage"
                      >
                        Votre navigateur ne prend pas en charge la lecture de vidéos.
                      </LazyVideo>
                    </div>
                    <p className={styles.illustrationNotice}>{ILLUSTRATION_NOTICE}</p>
                  </div>
                </FadeIn>
              </div>
            )}

            {activeTab === 'padel' && (
              <div
                id="panel-padel"
                role="tabpanel"
                aria-labelledby="tab-padel"
                className={styles.panel}
              >
                <FadeIn key="padel">
                  <div className={styles.block}>
                    <h2 className={styles.subtitle}>Padel - Avant / Après</h2>
                    <p className={styles.intro}>
                      Glissez la barre pour comparer l’état des lieux avant travaux et le résultat après rénovation.
                    </p>
                    <BeforeAfterSlider
                      beforeSrc={IMAGE_PADEL_DEBUT}
                      afterSrc={IMAGE_PADEL_FIN}
                      beforeLabel="Padel avant"
                      afterLabel="Padel après"
                    />
                  </div>
                </FadeIn>
                <FadeIn delay={0.1} key="padel-video">
                  <div className={styles.block}>
                    <h2 className={styles.subtitle}>Vidéo de présentation - Padel</h2>
                    <div className={styles.videoWrap}>
                      <LazyVideo
                        className={styles.video}
                        src={VIDEO_PADEL}
                        poster={IMAGE_PADEL_FIN}
                        title="Présentation du Padel"
                      >
                        Votre navigateur ne prend pas en charge la lecture de vidéos.
                      </LazyVideo>
                    </div>
                    <p className={styles.illustrationNotice}>{ILLUSTRATION_NOTICE}</p>
                  </div>
                </FadeIn>
              </div>
            )}

            {activeTab === 'ecole-jules-ferry' && (
              <div
                id="panel-ecole-jules-ferry"
                role="tabpanel"
                aria-labelledby="tab-ecole-jules-ferry"
                className={styles.panel}
              >
                <FadeIn key="ecole">
                  <div className={styles.block}>
                    <h2 className={styles.subtitle}>École Jules Ferry - Avant / Après</h2>
                    <p className={styles.intro}>
                      Glissez la barre pour comparer l’état des lieux avant travaux et le résultat après rénovation.
                    </p>
                    <BeforeAfterSlider
                      beforeSrc={IMAGE_ECOLE_DEBUT}
                      afterSrc={IMAGE_ECOLE_FIN}
                      beforeLabel="École Jules Ferry avant"
                      afterLabel="École Jules Ferry après"
                    />
                  </div>
                </FadeIn>
                <FadeIn delay={0.1} key="ecole-video">
                  <div className={styles.block}>
                    <h2 className={styles.subtitle}>Vidéo de présentation - École Jules Ferry</h2>
                    <div className={styles.videoWrap}>
                      <LazyVideo
                        className={styles.video}
                        src={VIDEO_ECOLE}
                        poster={IMAGE_ECOLE_FIN}
                        title="Présentation de l’École Jules Ferry"
                      >
                        Votre navigateur ne prend pas en charge la lecture de vidéos.
                      </LazyVideo>
                    </div>
                    <p className={styles.illustrationNotice}>{ILLUSTRATION_NOTICE}</p>
                  </div>
                </FadeIn>
              </div>
            )}
          </div>

          <div className={styles.backWrap}>
            <Link to="/programme" className={styles.backLink}>
              ← Retour au programme
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
