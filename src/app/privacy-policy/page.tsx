
export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
      <div className="max-w-3xl mx-auto prose prose-lg">
        <h1 className="text-3xl md:text-4xl font-headline font-bold mb-8">
          Politique de confidentialité
        </h1>
        <p>
          Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Introduction</h2>
        <p>
          Bienvenue sur LAVOO Express. Nous nous engageons à protéger la vie privée de nos utilisateurs. Cette politique de confidentialité explique comment nous collectons, utilisons, divulguons et protégeons vos informations lorsque vous utilisez notre site web et nos services.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Collecte de vos informations</h2>
        <p>
          Nous pouvons collecter des informations vous concernant de différentes manières. Les informations que nous pouvons collecter sur le site comprennent :
        </p>
        <ul>
          <li><strong>Données personnelles :</strong> Nom, adresse e-mail, numéro de téléphone, adresse postale, que vous nous fournissez volontairement lors de la création de votre compte ou lors de la commande.</li>
          <li><strong>Données dérivées :</strong> Informations que nos serveurs collectent automatiquement lorsque vous accédez au site, telles que votre adresse IP, votre type de navigateur, votre système d'exploitation, vos temps d'accès et les pages que vous avez consultées directement avant et après l'accès au site.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Utilisation de vos informations</h2>
        <p>
          Le fait d'avoir des informations précises sur vous nous permet de vous offrir une expérience fluide, efficace et personnalisée. Spécifiquement, nous pouvons utiliser les informations collectées à votre sujet via le site pour :
        </p>
        <ul>
          <li>Créer et gérer votre compte.</li>
          <li>Traiter vos commandes et paiements.</li>
          <li>Vous envoyer des confirmations de commande et d'autres communications transactionnelles.</li>
          <li>Vous informer des mises à jour de nos services.</li>
          <li>Améliorer l'efficacité et le fonctionnement du site.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Sécurité de vos informations</h2>
        <p>
          Nous utilisons des mesures de sécurité administratives, techniques et physiques pour aider à protéger vos informations personnelles. Bien que nous ayons pris des mesures raisonnables pour sécuriser les informations personnelles que vous nous fournissez, veuillez être conscient que malgré nos efforts, aucune mesure de sécurité n'est parfaite ou impénétrable, et aucune méthode de transmission de données ne peut être garantie contre toute interception ou autre type d'utilisation abusive.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Contactez-nous</h2>
        <p>
          Si vous avez des questions ou des commentaires sur cette politique de confidentialité, veuillez nous contacter à : contact@lavoo-express.com.
        </p>
      </div>
    </div>
  );
}
