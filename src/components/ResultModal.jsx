import { useEffect, useState } from 'react'
import styles from './ResultModal.module.css'

const STORAGE_KEY = 'sausset_reuni_result_modal_seen_v1'

export default function ResultModal() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    try {
      const seen = window.sessionStorage.getItem(STORAGE_KEY)
      if (!seen) setOpen(true)
    } catch {
      setOpen(true)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  const closeModal = () => {
    setOpen(false)
    try {
      window.sessionStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // no-op
    }
  }

  if (!open) return null

  return (
    <div className={styles.overlay} onClick={closeModal} role="presentation">
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="result-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={styles.close}
          onClick={closeModal}
          aria-label="Fermer la fenêtre"
        >
          ×
        </button>

        <h2 id="result-modal-title" className={styles.title}>Merci à tous</h2>
        <div className={styles.contentPanel}>
          <p className={styles.kicker}>Résultat officiel - second tour</p>
          <p className={styles.score}>
            Maxime Marchand et la liste Sausset Réuni ont recueilli <strong>49,68%</strong> des suffrages exprimés.
          </p>
          <p className={styles.text}>
            Du fond du cœur, merci à l&apos;ensemble des Saussetoises et des Saussetois
            pour votre engagement à nos côtés et pour votre confiance renouvelée.
          </p>
        </div>

        <button type="button" className={styles.cta} onClick={closeModal}>
          Continuer sur le site
        </button>
      </div>
    </div>
  )
}
