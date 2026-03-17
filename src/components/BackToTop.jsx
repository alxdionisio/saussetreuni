import { useState, useEffect } from 'react'
import styles from './BackToTop.module.css'

const SCROLL_THRESHOLD = 400

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const update = () => setVisible(window.scrollY > SCROLL_THRESHOLD)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!visible) return null

  return (
    <button
      type="button"
      className={styles.button}
      onClick={scrollToTop}
      aria-label="Retour en haut de la page"
    >
      <span className={styles.icon} aria-hidden>↑</span>
    </button>
  )
}
