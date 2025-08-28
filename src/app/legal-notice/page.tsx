
export default function LegalNoticePage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
      <div className="max-w-3xl mx-auto prose prose-lg">
        <h1 className="text-3xl md:text-4xl font-headline font-bold mb-8">
          Mentions légales
        </h1>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Éditeur du site</h2>
        <p>
          Le site LAVOO Express est édité par la société [Nom de la société], [Forme juridique] au capital de [Montant du capital social] €.
        </p>
        <p>
          Siège social : [Adresse du siège social]
        </p>
        <p>
          Immatriculée au RCS de [Ville] sous le numéro [Numéro RCS]
        </p>
        <p>
          Numéro de TVA intracommunautaire : [Numéro de TVA]
        </p>
        <p>
          Directeur de la publication : [Nom du directeur de la publication]
        </p>
        <p>
          Contact : contact@lavoo-express.com
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Hébergement</h2>
        <p>
          Le site est hébergé par la société [Nom de l'hébergeur].
        </p>
        <p>
          Adresse : [Adresse de l'hébergeur]
        </p>
        <p>
          Téléphone : [Numéro de téléphone de l'hébergeur]
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Propriété intellectuelle</h2>
        <p>
          L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
        </p>
        <p>
          La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
        </p>
      </div>
    </div>
  );
}
