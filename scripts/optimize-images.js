/**
 * Convertit les images (JPG/PNG) en WebP pour réduire le poids et améliorer les perfs.
 * À lancer avant le build : npm run optimize-images (ou automatiquement avant build).
 * Génère des .webp à côté des originaux ; le front utilise <picture> pour servir WebP avec fallback.
 */
import { readdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const publicDir = join(root, 'public')
const colistiersDir = join(publicDir, 'images', 'colistiers')

const WEBP_QUALITY = 82
const COLISTIERS_MAX_WIDTH = 400

async function run() {
  let sharp
  try {
    sharp = (await import('sharp')).default
  } catch {
    console.warn('sharp non installé. Exécutez: npm install -D sharp')
    console.warn('Optimisation images ignorée.')
    process.exit(0)
  }

  const converted = []

  // Colistiers : chaque jpg/png -> webp (redimensionné pour affichage ~165px)
  if (existsSync(colistiersDir)) {
    const files = readdirSync(colistiersDir).filter((f) => /\.(jpe?g|png)$/i.test(f))
    for (const file of files) {
      const ext = file.replace(/^.*\./, '').toLowerCase()
      const input = join(colistiersDir, file)
      const output = join(colistiersDir, file.replace(/\.(jpe?g|png)$/i, '.webp'))
      try {
        let pipeline = sharp(input)
        const meta = await pipeline.metadata()
        if (meta.width > COLISTIERS_MAX_WIDTH) {
          pipeline = pipeline.resize(COLISTIERS_MAX_WIDTH, null, { withoutEnlargement: true })
        }
        await pipeline.webp({ quality: WEBP_QUALITY }).toFile(output)
        converted.push(`images/colistiers/${file} → .webp`)
      } catch (err) {
        console.error(`Erreur ${file}:`, err.message)
      }
    }
  }

  // Hero, logo, portrait : WebP sans redimensionner (qualité 85)
  const staticImages = [
    { in: 'Sausset Reuni_equipe.png', out: 'Sausset Reuni_equipe.webp', quality: 85 },
    { in: 'logo_sausset reuni.png', out: 'logo_sausset reuni.webp', quality: 85 },
    { in: 'maxime-marchand.png', out: 'maxime-marchand.webp', quality: 85 },
  ]
  for (const { in: name, out: outName, quality } of staticImages) {
    const input = join(publicDir, name)
    const output = join(publicDir, outName)
    if (!existsSync(input)) continue
    try {
      await sharp(input).webp({ quality }).toFile(output)
      converted.push(`${name} → ${outName}`)
    } catch (err) {
      console.error(`Erreur ${name}:`, err.message)
    }
  }

  if (converted.length) {
    console.log('Images optimisées (WebP):', converted.length)
  }
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
