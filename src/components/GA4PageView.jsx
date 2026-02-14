import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useCookieConsent } from '../contexts/CookieConsentContext'

/**
 * Envoie un événement page_view à GA4 à chaque changement de route (SPA),
 * uniquement si l'utilisateur a accepté les cookies.
 */
export default function GA4PageView() {
  const { pathname } = useLocation()
  const { consent } = useCookieConsent()

  useEffect(() => {
    if (consent !== 'accepted') return
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: pathname,
        page_title: document.title || '',
      })
    }
  }, [pathname, consent])

  return null
}
