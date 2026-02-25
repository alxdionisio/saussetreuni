import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import FadeIn from '../components/FadeIn'
import SectionTitle from '../components/SectionTitle'
import Breadcrumb from '../components/Breadcrumb'
import { programmeThemes } from '../data/programme'
import styles from './Programme.module.css'

export default function Programme() {
  const [active, setActive] = useState(programmeThemes[0].id)
  const [activeIndex, setActiveIndex] = useState(0)
  const sliderRef = useRef(null)
  const current = programmeThemes.find((t) => t.id === active)

  const getSliderMetrics = (el) => {
    if (!el) return { slideWidth: 0, gap: 0, padding: 0 }
    const style = getComputedStyle(el)
    const padding = parseFloat(style.paddingLeft) || 0
    const gap = parseFloat(style.gap) || 0
    const n = programmeThemes.length
    const slideWidth = (el.scrollWidth - 2 * padding - (n - 1) * gap) / n
    return { slideWidth, gap, padding }
  }

  const goToSlide = (index) => {
    const i = Math.max(0, Math.min(index, programmeThemes.length - 1))
    setActiveIndex(i)
    setActive(programmeThemes[i].id)
    const el = sliderRef.current
    if (el) {
      const { slideWidth, gap, padding } = getSliderMetrics(el)
      el.scrollTo({ left: padding + i * (slideWidth + gap), behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const el = sliderRef.current
    if (!el) return
    let lastIndex = -1
    let tick = null
    const onScroll = () => {
      if (tick) cancelAnimationFrame(tick)
      tick = requestAnimationFrame(() => {
        tick = null
        const { slideWidth, gap, padding } = getSliderMetrics(el)
        if (slideWidth <= 0) return
        const index = Math.round((el.scrollLeft - padding) / (slideWidth + gap))
        const clamped = Math.max(0, Math.min(index, programmeThemes.length - 1))
        if (clamped !== lastIndex) {
          lastIndex = clamped
          setActiveIndex(clamped)
          setActive(programmeThemes[clamped].id)
        }
      })
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      el.removeEventListener('scroll', onScroll)
      if (tick) cancelAnimationFrame(tick)
    }
  }, [])

  return (
    <section className={styles.section} id="programme">
      <div className="container">
        <Breadcrumb onHero />
        <SectionTitle
          label="Notre programme"
          title="Un projet pour chaque Saussetois"
          subtitle="Issu de la concertation avec les habitants, notre programme répond aux besoins réels de notre commune. Ce sont actuellement les grandes lignes d'un programme en cours de construction avec les Saussetois et Saussetoises."
          titleAs="h1"
        />

        <div className={styles.encartWrap}>
          <div className={styles.encart} role="status" aria-live="polite">
            <span className={styles.encartIcon} aria-hidden>📋</span>
            <div className={styles.encartText}>
              <strong className={styles.encartTitle}>Un programme co-construit avec vous</strong>
              <p className={styles.encartDesc}>
                Venez partager vos idées lors de nos <Link to="/calendrier" className={styles.encartLink}>prochains rendez-vous</Link>.
              </p>
            </div>
          </div>
        </div>

        {/* Desktop: onglets */}
        <FadeIn>
          <div className={styles.tabs}>
            {programmeThemes.map((t) => (
              <button
                key={t.id}
                className={`${styles.tab} ${active === t.id ? styles.tabActive : ''}`}
                onClick={() => setActive(t.id)}
                style={active === t.id ? { '--tab-color': t.color } : {}}
              >
                <span className={styles.tabIcon}>{t.icon}</span>
                <span className={styles.tabLabel}>{t.label}</span>
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Desktop: panneau unique */}
        <div className={styles.content}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className={styles.panel}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
            >
              <div className={styles.panelHeader} style={{ '--accent': current.color }}>
                <span className={styles.panelIcon}>{current.icon}</span>
                <h3 className={styles.panelTitle}>{current.label}</h3>
              </div>
              {current.intro && (
                <p className={styles.panelIntro}>{current.intro}</p>
              )}
              {current.items && current.items.length > 0 && (
                <ul className={styles.list}>
                  {current.items.map((item, i) => (
                    <motion.li
                      key={i}
                      className={styles.listItem}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <span className={styles.bullet} style={{ background: current.color }} />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile: slider cartes par thématique */}
        <div className={styles.mobileSliderWrap}>
          <div
            ref={sliderRef}
            className={styles.mobileSlider}
            role="region"
            aria-label="Thématiques du programme"
          >
            {programmeThemes.map((theme, index) => (
              <div
                key={theme.id}
                className={styles.mobileSlide}
                role="tabpanel"
                aria-label={theme.label}
                data-index={index}
              >
                <div className={styles.mobileSlideInner}>
                  <h3 className={styles.mobileSlideTitle} style={{ '--accent': theme.color }}>
                    {theme.icon} {theme.label}
                  </h3>
                  {theme.intro && (
                    <p className={styles.mobileSlideIntro}>{theme.intro}</p>
                  )}
                  {theme.items && theme.items.length > 0 && (
                    <ul className={styles.mobileSlideList}>
                      {theme.items.map((item, i) => (
                        <li key={i} className={styles.mobileSlideItem}>
                          <span className={styles.mobileSlideBullet} style={{ background: theme.color }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className={styles.mobileSliderNav}>
            <button
              type="button"
              className={styles.mobileSliderBtn}
              onClick={() => goToSlide(activeIndex - 1)}
              disabled={activeIndex === 0}
              aria-label="Thématique précédente"
            >
              ‹
            </button>
            <div className={styles.mobileSliderDots}>
              {programmeThemes.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`${styles.mobileDot} ${index === activeIndex ? styles.mobileDotActive : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Thématique ${index + 1}`}
                  aria-current={index === activeIndex ? 'true' : undefined}
                />
              ))}
            </div>
            <button
              type="button"
              className={styles.mobileSliderBtn}
              onClick={() => goToSlide(activeIndex + 1)}
              disabled={activeIndex === programmeThemes.length - 1}
              aria-label="Thématique suivante"
            >
              ›
            </button>
          </div>
        </div>

        <div className={styles.internalLinks}>
          <Link to="/calendrier" className={styles.internalLinkBtn}>Voir le calendrier des événements</Link>
          <Link to="/contact" className={styles.internalLinkBtn}>Nous contacter</Link>
        </div>
      </div>
    </section>
  )
}
