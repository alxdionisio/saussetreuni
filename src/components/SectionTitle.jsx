import styles from './SectionTitle.module.css'

export default function SectionTitle({ label, title, subtitle, intro, light = false, titleAs = 'h2' }) {
  const TitleTag = titleAs === 'h1' ? 'h1' : 'h2'
  return (
    <div className={`${styles.wrapper} ${light ? styles.light : ''}`}>
      {label && <span className={styles.label}>{label}</span>}
      {title != null && title !== '' && (
        <TitleTag className={styles.title}>{title}</TitleTag>
      )}
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      {intro && <p className={styles.intro}>{intro}</p>}
    </div>
  )
}
