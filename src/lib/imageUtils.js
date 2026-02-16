/**
 * Retourne l’URL WebP correspondant à une URL d’image (jpg/jpeg/png).
 * Les .webp sont générés par le script optimize-images (build).
 */
export function getImageWebpUrl(imageUrl) {
  if (!imageUrl || typeof imageUrl !== 'string') return ''
  return imageUrl.replace(/\.(jpe?g|png)$/i, '.webp')
}
