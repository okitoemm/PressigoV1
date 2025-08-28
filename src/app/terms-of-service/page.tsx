
export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
      <div className="max-w-3xl mx-auto prose prose-lg">
        <h1 className="text-3xl md:text-4xl font-headline font-bold mb-8">
          Conditions d'utilisation
        </h1>
        <p>
          Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Accord sur les conditions</h2>
        <p>
          En utilisant le site web LAVOO Express (le "Site") et les services offerts, vous acceptez d'être lié par ces Conditions d'utilisation. Si vous n'êtes pas d'accord avec une partie des conditions, vous ne pouvez pas accéder au service.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Services</h2>
        <p>
          LAVOO Express fournit des services de pressing et de blanchisserie, y compris la collecte et la livraison à domicile. Nous nous engageons à fournir un service de haute qualité, mais nous ne sommes pas responsables des articles endommagés par des défauts de fabrication ou des matériaux préexistants.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Compte utilisateur</h2>
        <p>
          Pour passer une commande, vous devez créer un compte. Vous êtes responsable du maintien de la confidentialité de votre compte et de votre mot de passe. Vous acceptez d'accepter la responsabilité de toutes les activités qui se produisent sous votre compte ou votre mot de passe.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Paiements</h2>
        <p>
          Tous les paiements sont dus au moment de la passation de la commande. Nous acceptons diverses méthodes de paiement qui seront indiquées sur le Site. Les prix de nos services sont susceptibles d'être modifiés sans préavis.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Limitation de responsabilité</h2>
        <p>
          En aucun cas, LAVOO Express, ni ses administrateurs, employés ou agents, ne seront responsables envers vous ou un tiers pour tout dommage direct, indirect, consécutif, exemplaire, accidentel, spécial ou punitif, y compris la perte de profit, la perte de revenus, la perte de données, ou d'autres dommages découlant de votre utilisation du site.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Contactez-nous</h2>
        <p>
          Pour toute question concernant ces Conditions d'utilisation, veuillez nous contacter à : contact@lavoo-express.com.
        </p>
      </div>
    </div>
  );
}
