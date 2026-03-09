import { useEffect } from 'react'
import styles from './PdfModal.module.css'

export default function PdfModal({ isOpen, onClose, title, pdfUrl }) {
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className={styles.box} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Fermer"
          >
            ×
          </button>
        </div>
        <div className={styles.frameWrap}>
          <iframe
            src={pdfUrl}
            title={title}
            className={styles.iframe}
          />
        </div>
      </div>
    </div>
  )
}
