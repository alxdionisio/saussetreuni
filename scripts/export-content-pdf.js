/**
 * Exporte l’ensemble des contenus du site Sausset Réuni 2026 dans un fichier PDF.
 * Usage : node scripts/export-content-pdf.js
 * Sortie : Contenu-Site-Sausset-Reuni-2026.pdf (à la racine du projet)
 */

import { createRequire } from 'module'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)
const PDFDocument = require('pdfkit')

const OUT_PATH = path.join(__dirname, '..', 'Contenu-Site-Sausset-Reuni-2026.pdf')

// Événements du calendrier (alignés sur Calendrier.jsx)
const calendarEvents = [
  { date: 'Février 2026', title: 'Porte-à-porte & ateliers de proximité', location: 'Sausset-les-Pins', time: null },
  { date: 'Samedi 14 février 2026', title: 'Rencontre — Secteur Mare Nostrum', time: '10h30-12h30', location: 'Point de rencontre : à venir' },
  { date: 'Samedi 21 février 2026', title: 'Rencontre — Secteur Centre Ville', time: '10h30-12h30', location: '10 avenue Adolphe Fouque (en face de Noharet)' },
  { date: 'Lundi 23 février 2026', title: 'Réunion de concertation sur le programme', time: '18h30', location: '10 avenue Adolphe Fouque (local de campagne)' },
  { date: 'Vendredi 27 février 2026', title: 'Rencontre — Secteur Aigue Bleue', time: '10h30-12h30', location: '4 rue Mozart' },
  { date: 'Samedi 28 février 2026', title: 'Rencontre — Secteur Grand Vallat', time: '10h30-12h30', location: 'Parking du Grand Vallat' },
  { date: 'Vendredi 6 mars 2026', title: 'Meeting de campagne', time: '18h30', location: 'Gymnase Alain Calmat' },
  { date: 'Dimanche 15 mars 2026', title: 'Premier tour des élections municipales', location: 'Bureaux de vote', time: null },
  { date: 'Dimanche 22 mars 2026', title: 'Second tour des élections municipales', location: 'Bureaux de vote', time: null },
]

function getRoleLabel(order) {
  if (order >= 1 && order <= 8) return order === 1 ? '1er adjoint' : `${order}ème adjoint`
  if (order === 10) return '9ème adjoint'
  if (order >= 11 && order <= 29) return `${order}ème élu`
  return `${order}ème`
}

function writeSection(doc, title, lines, options = {}) {
  const { fontSizeTitle = 14, fontSizeBody = 10, marginBottom = 12 } = options
  doc.fontSize(fontSizeTitle).font('Helvetica-Bold').text(title, { continued: false })
  doc.moveDown(0.5)
  doc.font('Helvetica').fontSize(fontSizeBody)
  const text = Array.isArray(lines) ? lines.join('\n') : lines
  doc.text(text, { align: 'left', lineGap: 3 })
  doc.moveDown(marginBottom)
}

function writeBulletList(doc, items, fontSize = 10) {
  doc.font('Helvetica').fontSize(fontSize)
  items.forEach((item) => {
    doc.text(`• ${item}`, { indent: 20, paragraphGap: 2 })
  })
  doc.moveDown(6)
}

async function run() {
  const { programmeThemes } = await import('../src/data/programme.js')
  const { colistiers } = await import('../src/data/colistiers.js')
  const sortedColistiers = [...colistiers].sort((a, b) => a.order - b.order)

  const doc = new PDFDocument({ margin: 50, size: 'A4', bufferPages: true })
  const stream = fs.createWriteStream(OUT_PATH)
  doc.pipe(stream)

  doc.fontSize(22).font('Helvetica-Bold').text('Sausset Réuni 2026', { align: 'center' })
  doc.fontSize(12).font('Helvetica').text('Contenu du site — Élections municipales 15 & 22 mars 2026', { align: 'center' })
  doc.moveDown(2)

  // ——— Accueil / Hero ———
  writeSection(doc, '1. Accueil (Hero)', [
    'Élections Municipales — 15 & 22 Mars 2026',
    'Sausset Réuni — Votre équipe pour servir Sausset',
    'Boutons : Notre programme | Rejoindre le comité de soutien',
  ], { marginBottom: 16 })

  // ——— Le candidat ———
  writeSection(doc, '2. Le candidat — Maxime Marchand', [
    'Maire de Sausset-les-Pins depuis 2020 · Né en 1991',
    '« J\'ai passé toute ma vie à Sausset-les-Pins. On ne peut faire plus Saussetois que moi. »',
    'Élu en 2020 à la tête d\'une coalition citoyenne, il est devenu le plus jeune maire du département des Bouches-du-Rhône.',
    'Maxime Marchand est passionné par son village. Il souhaite, avec sa liste Sausset Réuni, pouvoir poursuivre ses engagements auprès des Saussetoises et des Saussetoises.',
    '2020 — Élu maire de Sausset-les-Pins',
    '2026 — Candidat à sa réélection',
  ], { marginBottom: 16 })

  // ——— Programme ———
  writeSection(doc, '3. Notre programme', [
    'Un projet pour chaque Saussetois',
    'Issu de la concertation avec les habitants, notre programme répond aux besoins réels de notre commune.',
    '',
    'Encart : Programme en construction avec vous. Prochaine réunion de concertation le lundi 23 février à 18h30.',
  ], { marginBottom: 8 })

  programmeThemes.forEach((theme) => {
    doc.fontSize(12).font('Helvetica-Bold').text(theme.label, { continued: false })
    doc.moveDown(0.3)
    doc.font('Helvetica').fontSize(10).text(theme.intro, { lineGap: 3 })
    if (theme.items && theme.items.length) {
      doc.moveDown(0.5)
      writeBulletList(doc, theme.items, 10)
    } else {
      doc.moveDown(8)
    }
  })

  // ——— La liste ———
  doc.fontSize(14).font('Helvetica-Bold').text('4. La liste', { continued: false })
  doc.moveDown(0.5)
  doc.font('Helvetica').fontSize(10).text('Candidat tête de liste : Maxime Marchand. Colistiers et colistières (ordre de la liste) :', { lineGap: 3 })
  doc.moveDown(0.5)
  sortedColistiers.forEach((c) => {
    doc.fontSize(10).text(`${c.order}. ${c.name} — ${getRoleLabel(c.order)}`, { indent: 10 })
  })
  doc.moveDown(16)

  // ——— Calendrier ———
  doc.fontSize(14).font('Helvetica-Bold').text('5. Calendrier & événements', { continued: false })
  doc.moveDown(0.5)
  doc.font('Helvetica').fontSize(10)
  calendarEvents.forEach((ev) => {
    let line = `${ev.date} — ${ev.title}`
    if (ev.time) line += ` (${ev.time})`
    if (ev.location) line += ` — ${ev.location}`
    doc.text(line, { indent: 10, paragraphGap: 4 })
  })
  doc.text('Permanence de campagne : 10 Av. Adolphe Fouque — 13960 Sausset-les-Pins.', { indent: 10 })
  doc.moveDown(16)

  // ——— Comité de soutien ———
  writeSection(doc, '6. Comité de soutien', [
    'Rejoignez l\'équipe sur le terrain',
    'Le comité de soutien rassemble les habitants qui souhaitent agir concrètement pour Sausset.',
    '',
    'Pourquoi rejoindre :',
  ], { marginBottom: 4 })
  writeBulletList(doc, [
    "S'engager concrètement aux côtés de la liste Sausset Réuni",
    'Contribuer activement à un projet pour votre commune',
    "Rencontrer d'autres personnes engagées",
    'Être informé des événements et actualités (WhatsApp & newsletter)',
    'Participer à la vie démocratique du village',
  ])

  // ——— Contact ———
  writeSection(doc, '7. Contact', [
    'Partagez vos idées, vos préoccupations, vos attentes',
    'Permanence : 10 Av. Adolphe Fouque — 13960 Sausset-les-Pins',
    'Venez nous rencontrer aux horaires d\'ouverture.',
    'Email : saussetreunis@gmail.com',
  ], { marginBottom: 16 })

  // ——— Mentions légales ———
  doc.fontSize(14).font('Helvetica-Bold').text('8. Mentions légales', { continued: false })
  doc.moveDown(0.5)
  doc.font('Helvetica').fontSize(10)
  doc.text('Éditeur : Liste Sausset Réuni. Responsable de la publication : Maxime Marchand. Adresse : 10 avenue Adolphe Fouque — 13960 Sausset-les-Pins. Email : saussetreunis@gmail.com.', { lineGap: 4 })
  doc.text('Hébergement : GitHub Pages (GitHub, Inc.). Nom de domaine géré par OVH. OVH SAS, 2 Rue Kellermann, 59100 Roubaix — Téléphone : 1007.', { lineGap: 4 })
  doc.text('Propriété intellectuelle : L\'ensemble des contenus du site est la propriété de la liste Sausset Réuni. Toute reproduction ou représentation, totale ou partielle, est interdite sans autorisation préalable.', { lineGap: 4 })
  doc.moveDown(12)

  // ——— Politique de confidentialité ———
  doc.fontSize(14).font('Helvetica-Bold').text('9. Politique de confidentialité', { continued: false })
  doc.moveDown(0.5)
  doc.font('Helvetica').fontSize(10)
  doc.text('Conformément au RGPD et à la loi Informatique et Libertés. Responsable du traitement : Maxime Marchand (saussetreunis@gmail.com). Données collectées : nom, prénom, email, message ; cookies techniques. Finalités : répondre aux demandes, informer sur la liste, fonctionnement du site. Base légale : consentement et intérêt légitime. Conservation : jusqu\'à la fin de la campagne puis suppression sous 12 mois. Droits : accès, rectification, opposition, effacement, limitation ; réclamation CNIL (www.cnil.fr).', { lineGap: 3 })
  doc.moveDown(12)

  // ——— Footer ———
  writeSection(doc, '10. Pied de page (informations générales)', [
    'Sausset Réuni 2026 — Liste sans étiquette pour les élections municipales de Sausset-les-Pins 2026. Menée par Maxime Marchand.',
    '10 Av. Adolphe Fouque — 13960 Sausset-les-Pins',
    'Réseaux : Facebook, Instagram',
    'Mentions légales | Politique de confidentialité',
    '© Sausset Réuni 2026 — Tous droits réservés.',
  ], { marginBottom: 8 })

  doc.fontSize(9).font('Helvetica').fillColor('#666').text(`Document généré le ${new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })} — Contenu extrait du site sausset-reuni.fr`, { align: 'center' })

  doc.end()

  return new Promise((resolve, reject) => {
    stream.on('finish', () => {
      console.log('PDF créé :', OUT_PATH)
      resolve()
    })
    stream.on('error', reject)
  })
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
