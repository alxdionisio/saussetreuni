import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { SITE_URL, SITE_NAME, DEFAULT_DESCRIPTION, ROUTE_META, OG_IMAGE } from '../lib/siteConfig'

const KNOWN_ROUTES = new Set(Object.keys(ROUTE_META))

export default function Seo() {
  const { pathname } = useLocation()
  const meta = ROUTE_META[pathname] || {
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
  }
  const isUnknownRoute = !KNOWN_ROUTES.has(pathname)
  const canonical = `${SITE_URL}${pathname === '/' ? '' : pathname}`
  const title = meta.title
  const description = meta.description

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {isUnknownRoute && <meta name="robots" content="noindex, nofollow" />}
      <meta name="theme-color" content="#063c47" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:alt" content={`Logo ${SITE_NAME} - Liste élections municipales Sausset-les-Pins 2026`} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />
      <meta name="twitter:image:alt" content={`Logo ${SITE_NAME}`} />
    </Helmet>
  )
}
