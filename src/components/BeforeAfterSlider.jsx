import { useState, useRef, useCallback } from 'react'
import styles from './BeforeAfterSlider.module.css'

export default function BeforeAfterSlider({ beforeSrc, afterSrc, beforeLabel = 'Avant', afterLabel = 'Après' }) {
  const [position, setPosition] = useState(50)
  const containerRef = useRef(null)

  const handleMove = useCallback(
    (clientX) => {
      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
      const pct = Math.round((x / rect.width) * 100)
      setPosition(pct)
    },
    []
  )

  const onPointerDown = (e) => {
    e.preventDefault()
    handleMove(e.clientX)
    const onMove = (e2) => handleMove(e2.clientX)
    const onUp = () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }

  return (
    <div
      ref={containerRef}
      className={styles.container}
      onPointerDown={onPointerDown}
      role="img"
      aria-label={`Comparaison avant/après. Glissez pour afficher. ${position} pour cent.`}
    >
      <div className={styles.beforeWrap}>
        <img src={beforeSrc} alt={beforeLabel} className={styles.image} draggable={false} />
      </div>
      <div className={styles.afterWrap}>
        <img
          src={afterSrc}
          alt={afterLabel}
          className={styles.imageAfter}
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          draggable={false}
        />
      </div>
      <div className={styles.divider} style={{ left: `${position}%` }} aria-hidden>
        <span className={styles.handle} />
      </div>
    </div>
  )
}
