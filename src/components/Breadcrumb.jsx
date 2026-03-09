import { Link, useLocation } from 'react-router-dom'
import { buildBreadcrumbItems } from './StructuredData'
import styles from './Breadcrumb.module.css'

/** variant="light" pour hero sombre (texte clair). onHero centre le fil sur la hero et adapte le style. centered + noBorder : fil centré sans barre. */
export default function Breadcrumb({ variant, onHero = false, centered = false, noBorder = false }) {
  const { pathname } = useLocation()
  const items = buildBreadcrumbItems(pathname)

  if (items.length <= 1) return null

  const className = [
    styles.breadcrumb,
    onHero ? styles.hero : '',
    variant === 'light' ? styles.light : '',
    centered ? styles.centered : '',
    noBorder ? styles.noBorder : '',
  ].filter(Boolean).join(' ')

  const listCentered = onHero || centered

  return (
    <nav className={className} aria-label="Fil d'Ariane">
      <ol className={`${styles.list} ${listCentered ? styles.listCentered : ''}`} itemScope itemType="https://schema.org/BreadcrumbList">
        {items.map((item, i) => (
          <li
            key={item.url}
            className={styles.item}
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            {i < items.length - 1 ? (
              <>
                <Link to={item.path} className={styles.link} itemProp="item">
                  <span itemProp="name">{item.name}</span>
                </Link>
                <span className={styles.sep} aria-hidden>›</span>
              </>
            ) : (
              <span className={styles.current} aria-current="page" itemProp="name">{item.name}</span>
            )}
            <meta itemProp="position" content={String(i + 1)} />
          </li>
        ))}
      </ol>
    </nav>
  )
}
