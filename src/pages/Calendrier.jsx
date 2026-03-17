import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import FadeIn from '../components/FadeIn'
import Breadcrumb from '../components/Breadcrumb'
import styles from './Calendrier.module.css'

const events = [
  { dateISO: '2026-02-01', endDateISO: '2026-02-28', dateDisplay: { line1: 'Février', line2: '2026' }, title: 'Porte-à-porte & ateliers de proximité', location: 'Sausset-les-Pins', time: null },
  { dateISO: '2026-02-14', startTime: '10:30', endTime: '12:30', title: 'Rencontre avec les saussetoises et saussetois — Secteur Mare Nostrum', time: '10h30-12h30', location: 'Déambulation dans le quartier' },
  { dateISO: '2026-02-21', startTime: '10:30', endTime: '12:30', title: 'Rencontre avec les saussetoises et saussetois — Secteur Centre Ville', time: '10h30-12h30', location: 'Point de rencontre : 10 avenue Adolphe Fouque' },
  { dateISO: '2026-02-23', startTime: '18:30', title: 'Réunion de concertation sur le programme', location: '10 avenue Adolphe Fouque (local de campagne)', time: '18h30' },
  { dateISO: '2026-02-26', startTime: '10:30', endTime: '12:30', title: 'Rencontre avec les saussetoises et saussetois — Secteur Aigue Bleue', time: '10h30-12h30', location: 'Point de rencontre : 4 rue Mozart' },
  { dateISO: '2026-02-28', startTime: '10:30', endTime: '12:30', title: 'Rencontre avec les saussetoises et saussetois — Secteur Grand Vallat', time: '10h30-12h30', location: 'Point de rencontre : Parking du Grand Vallat' },
  { dateISO: '2026-03-06', startTime: '18:30', title: 'Meeting de campagne', location: 'Gymnase Alain Calmat', time: '18h30', variant: 'meeting' },
  { dateISO: '2026-03-13', title: 'Rencontre avec les saussetois', location: 'Salle des Arts', time: null },
  { dateISO: '2026-03-15', dateDisplay: { line1: 'Dimanche 15 mars', line2: '2026' }, title: 'Premier tour des élections municipales', location: 'Bureaux de vote', time: null, variant: 'first-round' },
  { dateISO: '2026-03-19', startTime: '18:30', title: 'Réunion publique', location: 'Gymnase A. Calmat', time: '18h30' },
  { dateISO: '2026-03-22', dateDisplay: { line1: 'Dimanche 22 mars', line2: '2026' }, title: 'Second tour des élections municipales', location: 'Bureaux de vote', time: null, variant: 'second-round' },
]

function getEventStart(ev) {
  if (ev.endDateISO) return new Date(ev.dateISO + 'T00:00:00')
  if (ev.startTime) return new Date(ev.dateISO + 'T' + ev.startTime + ':00')
  return new Date(ev.dateISO + 'T00:00:00')
}

function getEventEnd(ev) {
  if (ev.endDateISO) return new Date(ev.endDateISO + 'T23:59:59')
  if (ev.endTime) return new Date(ev.dateISO + 'T' + ev.endTime + ':00')
  const d = new Date(ev.dateISO + 'T00:00:00')
  d.setDate(d.getDate() + 1)
  return d
}

function isEventPast(ev) {
  return new Date() >= getEventEnd(ev)
}

function isEventInProgress(ev) {
  const now = new Date()
  return now >= getEventStart(ev) && now < getEventEnd(ev)
}

function getDateDisplay(ev) {
  if (ev.dateDisplay) return ev.dateDisplay
  const d = new Date(ev.dateISO + 'T12:00:00')
  const dayName = d.toLocaleDateString('fr-FR', { weekday: 'long' }).replace(/^\w/, (c) => c.toUpperCase())
  const datePart = d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })
  return { line1: `${dayName} ${datePart}`, line2: String(d.getFullYear()) }
}

export default function Calendrier() {
  const filtered = events.filter((e) => !isEventPast(e))
  const eventsEnCours = filtered.filter(isEventInProgress)
  const eventsAVenir = filtered.filter((e) => !isEventInProgress(e))

  const renderEventCard = (event, i, inProgress) => {
    const dateD = getDateDisplay(event)
    return (
      <motion.article
        key={event.dateISO + event.title}
        className={`${styles.eventCard} ${inProgress ? styles.eventCard_inProgress : ''} ${event.variant ? styles[`eventCard_${event.variant}`] : ''}`}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.1, duration: 0.4 }}
      >
        <div className={styles.eventDate}>
          <span className={styles.eventDateLine1}>{dateD.line1}</span>
          <span className={styles.eventDateLine2}>{dateD.line2}</span>
        </div>
        <div className={styles.eventContent}>
          <h3 className={styles.eventTitle}>{event.title}</h3>
          {(event.time || event.location) && (
            <p className={styles.eventLocation}>
              {event.time && <span>🕐 {event.time}</span>}
              {event.time && event.location && ' — '}
              {event.location && <span>📍 {event.location}</span>}
            </p>
          )}
        </div>
      </motion.article>
    )
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className="container">
          <Breadcrumb onHero />
        </div>
        <span className={styles.label}>Agenda</span>
        <h1 className={styles.title}>Calendrier et prochains événements</h1>
        <p className={styles.subtitle}>
          Retrouvez les temps forts de la campagne Sausset Réuni 2026 à Sausset-les-Pins.
        </p>
      </header>

      <div className="container">
        <section className={styles.section}>
          {eventsEnCours.length > 0 && (
            <FadeIn>
              <h2 className={styles.eventBlockTitle}>En cours</h2>
              <div className={styles.eventList}>
                {eventsEnCours.map((event, i) => renderEventCard(event, i, true))}
              </div>
            </FadeIn>
          )}

          {eventsAVenir.length > 0 && (
            <FadeIn delay={eventsEnCours.length > 0 ? 0.1 : 0}>
              <h2 className={styles.eventBlockTitle}>À venir</h2>
              <div className={styles.eventList}>
                {eventsAVenir.map((event, i) => renderEventCard(event, i, false))}
              </div>
            </FadeIn>
          )}

          <FadeIn delay={0.2}>
            <div className={styles.permanence}>
              <h2 className={styles.permanenceTitle}>Permanence de campagne</h2>
              <p className={styles.permanenceAddress}>
                10 Av. Adolphe Fouque — 13960 Sausset-les-Pins
              </p>
              <p className={styles.permanenceText}>
                Venez nous rencontrer aux horaires d'ouverture pour échanger avec l'équipe
                et les membres de la liste.
              </p>
              <p className={styles.permanenceLink}>
                <Link to="/contact" className={styles.permanenceLinkA}>Nous contacter</Link>
              </p>
            </div>
          </FadeIn>
        </section>
      </div>
    </div>
  )
}
