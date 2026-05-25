import styles from './SectionTitle.module.css'

export default function SectionTitle({
  label,
  title,
  subtitle,
  intro,
  light = false,
  align = 'left',
  titleAs = 'h2',
}) {
  const TitleTag = titleAs === 'h1' ? 'h1' : 'h2'
  const classes = [
    styles.wrapper,
    light ? styles.light : '',
    align === 'center' ? styles.center : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes}>
      {label && <span className={styles.label}>{label}</span>}
      {title != null && title !== '' && (
        <TitleTag className={styles.title}>{title}</TitleTag>
      )}
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      {intro && <p className={styles.intro}>{intro}</p>}
    </div>
  )
}
