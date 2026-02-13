import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../sections/Hero'
import ProgrammePreview from '../sections/ProgrammePreview'
import ListePreview from '../sections/ListePreview'
import Candidat from '../sections/Candidat'
import Engagements from '../sections/Engagements'
import ContactCTA from '../sections/ContactCTA'

export default function HomePage() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return
    const scrollToHash = () => {
      const el = document.querySelector(location.hash)
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    const t = requestAnimationFrame(() => requestAnimationFrame(scrollToHash))
    return () => cancelAnimationFrame(t)
  }, [location.pathname, location.hash])

  return (
    <>
      <Hero />
      <ProgrammePreview />
      <Candidat />
      <ListePreview />
      <Engagements />
      <ContactCTA />
    </>
  )
}
