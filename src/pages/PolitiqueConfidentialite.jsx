import { Link } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import styles from './LegalPage.module.css'

export default function PolitiqueConfidentialite() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Breadcrumb onHero />
        <header className={styles.header}>
          <span className={styles.label}>Données personnelles</span>
          <h1 className={styles.title}>Politique de confidentialité</h1>
        </header>

        <div className={styles.content}>
          <p className={styles.intro}>
            Dans le cadre de sa communication électorale, la liste Sausset Réuni collecte et traite certaines
            données personnelles, conformément au Règlement (UE) 2016/679 du 27 avril 2016 (RGPD) et à la loi
            Informatique et Libertés modifiée. Les données sont collectées uniquement auprès des personnes
            concernées (formulaires du site, inscription au comité de soutien) ; aucune liste externe, fichier
            acheté ou source tierce n'est utilisée pour la prospection ou le ciblage.
          </p>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Responsable du traitement</h2>
            <p className={styles.paragraph}>
              Le responsable du traitement des données est Maxime Marchand, en qualité de responsable de la
              liste Sausset Réuni.
            </p>
            <p className={styles.paragraph}>
              Contact :{' '}
              <a href="mailto:contact@saussetreuni.fr" className={styles.link}>
                contact@saussetreuni.fr
              </a>
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Données collectées</h2>
            <p className={styles.paragraph}>
              Les données susceptibles d'être collectées via le site sont notamment :
            </p>
            <ul className={styles.list}>
              <li>Nom et prénom</li>
              <li>Adresse électronique</li>
              <li>Numéro de téléphone (facultatif)</li>
              <li>Message libre transmis via un formulaire de contact ou d'inscription au comité de soutien</li>
              <li>Données techniques strictement nécessaires au fonctionnement du site (cookies techniques, voir section Cookies ci-dessous)</li>
            </ul>
            <p className={styles.paragraph}>
              Aucune donnée sensible au sens du RGPD n'est collectée.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Finalités du traitement</h2>
            <p className={styles.paragraph}>
              Les données sont collectées exclusivement pour :
            </p>
            <ul className={styles.list}>
              <li>Répondre aux demandes de contact ou de renseignements (formulaire de contact)</li>
              <li>Gérer les inscriptions au comité de soutien et recontacter les personnes</li>
              <li>Envoyer les actualités, invitations et informations de la liste par newsletter et/ou groupe WhatsApp, uniquement lorsque la personne a donné son consentement explicite (case à cocher dédiée)</li>
              <li>Assurer le bon fonctionnement technique du site</li>
            </ul>
            <p className={styles.paragraph}>
              Les données ne sont en aucun cas utilisées à des fins commerciales, ni cédées ou vendues à des tiers.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Base légale du traitement</h2>
            <p className={styles.paragraph}>
              La base légale est précisée par finalité :
            </p>
            <ul className={styles.list}>
              <li><strong>Réponse aux demandes de contact</strong> : intérêt légitime de la liste à traiter les sollicitations des citoyens dans le cadre du débat démocratique.</li>
              <li><strong>Gestion du comité de soutien et recontact</strong> : exécution de la relation avec la personne ayant manifesté son intérêt (consentement donné lors de l'inscription).</li>
              <li><strong>Envoi de newsletter et/ou communications WhatsApp</strong> : consentement explicite de la personne (case à cocher au moment de l'inscription). Sans ce consentement, aucune communication de ce type n'est envoyée.</li>
              <li><strong>Fonctionnement technique du site</strong> : intérêt légitime et, pour les cookies non strictement nécessaires, consentement préalable (voir section Cookies).</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Newsletter et groupe WhatsApp — désinscription</h2>
            <p className={styles.paragraph}>
              Si vous avez accepté de recevoir les actualités de la liste par newsletter et/ou WhatsApp :
            </p>
            <ul className={styles.list}>
              <li>Vous pouvez vous désinscrire à tout moment en nous contactant à{' '}
                <a href="mailto:contact@saussetreuni.fr" className={styles.link}>contact@saussetreuni.fr</a>
                {' '}ou en suivant le lien de désinscription présent dans chaque envoi (newsletter) ou en quittant le groupe WhatsApp.
              </li>
              <li>La politique de confidentialité est portée à votre connaissance au moment de la collecte (lien affiché à côté de la case à cocher d'inscription à la newsletter/WhatsApp).</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Cookies</h2>
            <p className={styles.paragraph}>
              Le site peut utiliser :
            </p>
            <ul className={styles.list}>
              <li><strong>Cookies techniques</strong> : strictement nécessaires au fonctionnement du site (ex. mémorisation de votre choix concernant les cookies). Ils ne nécessitent pas votre consentement préalable.</li>
              <li><strong>Cookies optionnels (mesure d'audience)</strong> : si vous acceptez les cookies via le bandeau affiché sur le site, des cookies peuvent être déposés pour analyser la fréquentation du site. Vous pouvez refuser ces cookies ; dans ce cas, seuls les cookies techniques sont utilisés.</li>
            </ul>
            <p className={styles.paragraph}>
              Aucun cookie de ciblage publicitaire ou de partage avec des régies publicitaires n'est utilisé. La liste des cookies effectivement déposés (hébergement, scripts éventuels) est conforme à cette description ; en cas d'évolution (nouveaux outils), la présente politique sera mise à jour.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Durée de conservation</h2>
            <p className={styles.paragraph}>
              Les données sont conservées :
            </p>
            <ul className={styles.list}>
              <li>Jusqu'à la fin de la campagne électorale</li>
              <li>Puis supprimées dans un délai maximum de 12 mois après le scrutin</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Destinataires des données</h2>
            <p className={styles.paragraph}>
              Les données sont exclusivement destinées aux membres habilités de l'équipe de campagne de la
              liste Sausset Réuni. Aucune donnée n'est cédée ou vendue à des tiers.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Droits des personnes</h2>
            <p className={styles.paragraph}>
              Conformément au RGPD, vous disposez des droits suivants :
            </p>
            <ul className={styles.list}>
              <li>Droit d'accès à vos données</li>
              <li>Droit de rectification</li>
              <li>Droit d'opposition au traitement</li>
              <li>Droit à l'effacement</li>
              <li>Droit à la limitation du traitement</li>
            </ul>
            <p className={styles.paragraph}>
              Pour exercer ces droits, adressez une demande à :{' '}
              <a href="mailto:contact@saussetreuni.fr" className={styles.link}>
                contact@saussetreuni.fr
              </a>
              . Nous y répondrons dans les délais prévus par la réglementation.
            </p>
            <div className={styles.cnilBox} role="region" aria-label="Réclamation CNIL">
              <h3 className={styles.cnilBoxTitle}>Réclamation auprès de la CNIL</h3>
              <p className={styles.paragraph}>
                Si vous estimez que le traitement de vos données personnelles n'est pas conforme à la réglementation, vous avez le droit d'introduire une réclamation auprès de la Commission nationale de l'informatique et des libertés (CNIL) :{' '}
                <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className={styles.link}>
                  www.cnil.fr
                </a>
              </p>
            </div>
          </section>

          <div className={styles.backWrap}>
            <Link to="/" className={styles.backButton}>
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
