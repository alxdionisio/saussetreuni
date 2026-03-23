import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import BackToTop from './components/BackToTop'
import Seo from './components/Seo'
import StructuredData from './components/StructuredData'
import CookieBanner from './components/CookieBanner'
import GA4PageView from './components/GA4PageView'
import ResultModal from './components/ResultModal'
import HomePage from './pages/HomePage'
import ProgrammePage from './pages/ProgrammePage'
import ProjectionsPage from './pages/ProjectionsPage'
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
      <GA4PageView />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/programme" element={<ProgrammePage />} />
          <Route path="/programme/projections" element={<ProjectionsPage />} />
          <Route path="/comite-soutien" element={<ComiteSoutien />} />
          <Route path="/calendrier" element={<Calendrier />} />
          <Route path="/liste" element={<Liste />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
      <ResultModal />
      <CookieBanner />
    </>
  )
}
