import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'

const STORAGE_KEY = 'sausset_reuni_cookie_consent'
const GA4_MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID || ''

const CookieConsentContext = createContext(null)

/** Charge le script gtag et configure GA4 (uniquement après acceptation des cookies). */
function loadGA4() {
  if (typeof window === 'undefined' || !GA4_MEASUREMENT_ID || window.__ga4Loaded) return
  window.__ga4Loaded = true

  window.dataLayer = window.dataLayer || []
  function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag = gtag
  gtag('js', new Date())
  gtag('config', GA4_MEASUREMENT_ID, {
    send_page_view: false, // on gère les page_view en SPA nous-mêmes
    anonymize_ip: true,
  })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`
  document.head.appendChild(script)
}

export function CookieConsentProvider({ children }) {
  const [consent, setConsentState] = useState(null)
  const ga4LoadedRef = useRef(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === 'accepted' || stored === 'refused') setConsentState(stored)
    } catch {
      // ignore
    }
  }, [])

  useEffect(() => {
    if (consent === 'accepted' && !ga4LoadedRef.current) {
      ga4LoadedRef.current = true
      loadGA4()
    }
  }, [consent])

  const setConsent = useCallback((value) => {
    setConsentState(value)
    try {
      localStorage.setItem(STORAGE_KEY, value)
    } catch {
      // ignore
    }
  }, [])

  const trackEvent = useCallback((eventName, eventParams = {}) => {
    if (consent !== 'accepted') return
    try {
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          event: eventName,
          ...eventParams,
        })
      }
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', eventName, eventParams)
      }
    } catch {
      // ignore
    }
  }, [consent])

  const value = { consent, setConsent, trackEvent }
  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  )
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext)
  if (!ctx) throw new Error('useCookieConsent must be used within CookieConsentProvider')
  return ctx
}
