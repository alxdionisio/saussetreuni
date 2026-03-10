/**
 * Génère sitemap.xml et robots.txt dans public/ avec l'URL du site.
 * Utilise VITE_SITE_URL (ex: https://saussetreuni.fr) ou valeur par défaut.
 * À lancer avant le build : npm run prebuild ou npm run build
 */
import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const publicDir = join(root, 'public')

const baseUrl = (process.env.VITE_SITE_URL || 'https://saussetreuni.fr').replace(/\/$/, '')

const paths = [
  '',
  '/programme',
  '/programme/projections',
  '/comite-soutien',
  '/calendrier',
  '/liste',
  '/contact',
  '/mentions-legales',
  '/politique-confidentialite',
]

const now = new Date().toISOString().slice(0, 10)

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map(
    (path) => `  <url>
    <loc>${baseUrl}${path || '/'}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${path === '' ? '1.0' : path === '/programme' || path === '/liste' ? '0.9' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`

const robots = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`

writeFileSync(join(publicDir, 'sitemap.xml'), sitemap, 'utf8')
writeFileSync(join(publicDir, 'robots.txt'), robots, 'utf8')

console.log('SEO: sitemap.xml et robots.txt générés (base: %s)', baseUrl)
