import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Navbar.module.css'

const HEADER_OFFSET = 90
const SCROLL_THRESHOLD = 60

function getHeaderDarkFromSections() {
  const sections = document.querySelectorAll('[data-header-bg]')
  for (const el of sections) {
    const rect = el.getBoundingClientRect()
    if (rect.top <= HEADER_OFFSET && rect.bottom >= HEADER_OFFSET) {
      return el.getAttribute('data-header-bg') === 'light'
    }
  }
  return false
}

const navLinks = [
  { label: 'Programme', href: '/programme' },
  { label: 'Le candidat', href: '/', hash: '#candidat' },
  { label: 'La liste', href: '/liste' },
  { label: 'Engagements', href: '/', hash: '#engagements' },
  { label: 'Comité de soutien', href: '/comite-soutien' },
]

const ctaLinks = [
  { label: 'Calendrier', href: '/calendrier' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [headerDark, setHeaderDark] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    function updateHeader() {
      const scrolled = window.scrollY > SCROLL_THRESHOLD
      setHasScrolled(scrolled)

      if (location.pathname !== '/') {
        setHeaderDark(location.pathname !== '/contact')
        return
      }
      setHeaderDark(getHeaderDarkFromSections())
    }
    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })
    window.addEventListener('resize', updateHeader)
    return () => {
      window.removeEventListener('scroll', updateHeader)
      window.removeEventListener('resize', updateHeader)
    }
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const handleHashClick = (e, hash) => {
    setOpen(false)
    if (location.pathname === '/') {
      e.preventDefault()
      const el = document.querySelector(hash)
      el?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const allLinks = [...navLinks, ...ctaLinks]

  return (
    <>
      <motion.header
        className={`${styles.navbar} ${hasScrolled || headerDark ? styles.scrolled : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={`container ${styles.inner}`}>
          <Link to="/" className={styles.logo} aria-label="Sausset Réuni 2026 - Accueil">
            <img
              src={`${import.meta.env.BASE_URL || '/'}logo_sausset%20reuni.png`}
              alt="Sausset Réuni 2026"
              width="180"
              height="48"
              className={styles.logoImg}
              fetchPriority="high"
            />
          </Link>

          <nav className={styles.desktopNav}>
            {navLinks.map((l) =>
              l.hash ? (
                <a
                  key={l.href + (l.hash || '')}
                  href={l.href + (l.hash || '')}
                  className={styles.navLink}
                  onClick={(e) => handleHashClick(e, l.hash)}
                >
                  {l.label}
                </a>
              ) : (
                <Link key={l.href} to={l.href} className={styles.navLink} onClick={() => setOpen(false)}>
                  {l.label}
                </Link>
              )
            )}
            <span className={styles.ctaGroup}>
              {ctaLinks.map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  className={l.href === '/contact' ? styles.ctaPrimary : styles.ctaSecondary}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
            </span>
          </nav>

          <button
            className={`${styles.burger} ${open ? styles.burgerOpen : ''}`}
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.mobileOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className={styles.mobileNav}>
              {allLinks.map((l, i) => (
                <motion.div
                  key={l.href + (l.hash || '')}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  {l.hash ? (
                    <a
                      href={l.href + l.hash}
                      className={styles.mobileLink}
                      onClick={(e) => handleHashClick(e, l.hash)}
                    >
                      {l.label}
                    </a>
                  ) : (
                    <Link
                      to={l.href}
                      className={ctaLinks.some((c) => c.href === l.href) ? styles.mobileCta : styles.mobileLink}
                      onClick={() => setOpen(false)}
                    >
                      {l.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
