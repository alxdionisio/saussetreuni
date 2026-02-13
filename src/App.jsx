import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Seo from './components/Seo'
import StructuredData from './components/StructuredData'
import CookieBanner from './components/CookieBanner'
import HomePage from './pages/HomePage'
import ProgrammePage from './pages/ProgrammePage'
import ComiteSoutien from './pages/ComiteSoutien'
import Calendrier from './pages/Calendrier'
import Liste from './pages/Liste'
import ContactPage from './pages/ContactPage'
import NotFoundPage from './pages/NotFoundPage'
import MentionsLegales from './pages/MentionsLegales'
import PolitiqueConfidentialite from './pages/PolitiqueConfidentialite'

export default function App() {
  return (
    <>
      <Seo />
      <StructuredData />
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/programme" element={<ProgrammePage />} />
          <Route path="/comite-soutien" element={<ComiteSoutien />} />
          <Route path="/calendrier" element={<Calendrier />} />
          <Route path="/liste" element={<Liste />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/mentions-legales/" element={<Navigate to="/mentions-legales" replace />} />
          <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
          <Route path="/politique-confidentialite/" element={<Navigate to="/politique-confidentialite" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <CookieBanner />
    </>
  )
}
