import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { SITE_URL, SITE_NAME } from '../lib/siteConfig'

export const BREADCRUMB_LABELS = {
  '/': 'Accueil',
  '/programme': 'Programme',
  '/programme/projections': 'Projections',
  '/liste': 'La liste',
  '/comite-soutien': 'Comité de soutien',
  '/calendrier': 'Calendrier',
  '/contact': 'Contact',
  '/mentions-legales': 'Mentions légales',
  '/politique-confidentialite': 'Politique de confidentialité',
}

const KNOWN_PATHS = new Set(Object.keys(BREADCRUMB_LABELS))

/** Retourne les éléments du fil d’Ariane : { name, url, path } (path = chemin pour Link). */
export function buildBreadcrumbItems(pathname) {
  const items = [{ name: BREADCRUMB_LABELS['/'] || SITE_NAME, url: SITE_URL, path: '/' }]
  if (pathname === '/') return items
  if (!KNOWN_PATHS.has(pathname)) {
    items.push({ name: 'Page introuvable', url: SITE_URL + pathname, path: pathname })
    return items
  }
  const segments = pathname.split('/').filter(Boolean)
  let path = ''
  for (const segment of segments) {
    path += `/${segment}`
    items.push({ name: BREADCRUMB_LABELS[path] || segment, url: SITE_URL + path, path })
  }
  return items
}

export default function StructuredData() {
  const { pathname } = useLocation()

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo_sausset%20reuni.png`,
    description: 'Liste citoyenne pour les élections municipales de Sausset-les-Pins 2026, menée par Maxime Marchand.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '10 avenue Adolphe Fouque',
      addressLocality: 'Sausset-les-Pins',
      postalCode: '13960',
      addressCountry: 'FR',
    },
    sameAs: [
      'https://www.facebook.com/profile.php?id=100066969458973',
      'https://www.instagram.com/saussetreuni',
    ],
  }

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: 'fr-FR',
    publisher: { '@id': `${SITE_URL}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/contact` },
      'query-input': 'required name=search_term_string',
    },
  }

  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Maxime Marchand',
    jobTitle: 'Maire de Sausset-les-Pins, candidat aux élections municipales 2026',
    memberOf: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    description: 'Candidat tête de liste Sausset Réuni pour les élections municipales de Sausset-les-Pins (15 et 22 mars 2026).',
    url: SITE_URL,
  }

  const breadcrumbItems = buildBreadcrumbItems(pathname)
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(organization)}</script>
      <script type="application/ld+json">{JSON.stringify(website)}</script>
      <script type="application/ld+json">{JSON.stringify(person)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
    </Helmet>
  )
}
