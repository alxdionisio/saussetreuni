import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'sausset_reuni_cookie_consent'

const CookieConsentContext = createContext(null)

export function CookieConsentProvider({ children }) {
  const [consent, setConsentState] = useState(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === 'accepted' || stored === 'refused') setConsentState(stored)
    } catch {
      // ignore
    }
  }, [])

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
