import { Link } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'

export default function MentionsLegales() {
  return (
    <div
      className="legal-page"
      style={{ minHeight: '100vh', backgroundColor: '#eef3f5', color: '#1f2937' }}
    >
      <div className="legal-page__inner">
        <Breadcrumb onHero />
        <header className="legal-page__header">
          <span className="legal-page__label">Informations légales</span>
          <h1 className="legal-page__title">Mentions légales</h1>
        </header>

        <div className="legal-page__content" style={{ backgroundColor: '#fff', color: '#1f2937' }}>
          <section className="legal-page__section">
            <h2 className="legal-page__sectionTitle">Éditeur du site</h2>
            <p className="legal-page__paragraph">
              Le présent site est édité par la liste candidate aux élections municipales :
            </p>
            <p className="legal-page__brand">Sausset Réuni</p>
            <p className="legal-page__paragraph">
              <strong>Directeur de la publication</strong> (responsable de la publication au sens de l'article 6 III-1 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, dite LCEN) : <strong>Maxime Marchand</strong>.
            </p>
            <p className="legal-page__paragraph">
              <strong>Adresse du siège de la liste (local de campagne) :</strong> 10 avenue Adolphe Fouque - 13960 Sausset-les-Pins.<br />
              <em className="legal-page__muted">Il s'agit du local de campagne de la liste et non des locaux de la mairie.</em>
            </p>
            <p className="legal-page__paragraph">
              <strong>Adresse électronique :</strong>{' '}
              <a href="mailto:contact@saussetreuni.fr" className="legal-page__link">
                contact@saussetreuni.fr
              </a>
            </p>
            <p className="legal-page__paragraph">
              Le compte de campagne de la liste sera déposé auprès de la Commission nationale des comptes de campagne et des financements politiques (CNCCFP), conformément à la réglementation en vigueur.
            </p>
          </section>

          <section className="legal-page__section">
            <h2 className="legal-page__sectionTitle">Hébergement</h2>
            <p className="legal-page__paragraph">
              Le site est hébergé sur <strong>GitHub Pages</strong> (GitHub, Inc.). Le nom de domaine est
              géré par <strong>OVH</strong>.
            </p>
            <p className="legal-page__paragraph">
              <strong>OVH (nom de domaine) :</strong> OVH SAS, Service Clients, 2 Rue Kellermann, 59100 Roubaix<br />
              <strong>Téléphone :</strong> 1007 (Du lundi au vendredi : 8h00 à 20h00 - Le samedi : 9h00 à 17h00)
            </p>
          </section>

          <section className="legal-page__section">
            <h2 className="legal-page__sectionTitle">Propriété intellectuelle et droits à l'image</h2>
            <p className="legal-page__paragraph">
              L'ensemble des contenus présents sur ce site (textes, images, graphismes, logos, vidéos) est la
              propriété exclusive de la liste Sausset Réuni ou fait l'objet d'autorisations ou de cessions de droits, sauf mentions contraires. Les textes, visuels et logos ont été réalisés ou cédés à la liste pour les besoins de la campagne.
            </p>
            <p className="legal-page__paragraph">
              Les photographies de personnes identifiables (membres de la liste, soutiens, habitants) ont été diffusées avec l'accord des personnes concernées ou de leurs représentants légaux. L'identification des mineurs est limitée au strict nécessaire.
            </p>
            <p className="legal-page__paragraph">
              Toute reproduction ou représentation, totale ou partielle, des contenus du site est interdite sans autorisation préalable de la liste Sausset Réuni.
            </p>
          </section>

          <div className="legal-page__backWrap">
            <Link to="/" className="legal-page__backButton">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
