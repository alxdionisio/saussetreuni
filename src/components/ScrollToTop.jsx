import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') || ''

export default function ScrollToTop() {
  const { pathname } = useLocation()

  // Remonter en haut à chaque changement de page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])

  // Remonter en haut au clic sur un lien vers la page déjà active (ex. logo ou lien nav)
  useEffect(() => {
    const currentPath = (base + pathname).replace(/\/$/, '') || '/'

    const handleClick = (e) => {
      const link = e.target.closest('a[href]')
      if (!link || link.target === '_blank' || link.getAttribute('rel') === 'external') return
      try {
        const url = new URL(link.getAttribute('href'), window.location.origin)
        if (url.origin !== window.location.origin) return
        const linkPath = url.pathname.replace(/\/$/, '') || '/'
        if (linkPath === currentPath) {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      } catch {
        // lien relatif ou invalide, on ne fait rien
      }
    }

    document.addEventListener('click', handleClick, true)
    return () => document.removeEventListener('click', handleClick, true)
  }, [pathname])

  return null
}
