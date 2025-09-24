

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Truck, CheckCircle, PlayCircle } from 'lucide-react';
import Link from 'next/link';
import { WashingMachineIcon } from '@/components/icons/washing-machine-icon';
import { TShirtIcon } from '@/components/icons/t-shirt-icon';
import { TrousersIcon } from '@/components/icons/trousers-icon';
import { JacketIcon } from '@/components/icons/jacket-icon';
import { HeroSection } from '@/components/hero-section';
import { Button } from '@/components/ui/button';
import { ReviewCarousel } from '@/components/review-carousel';
import Image from 'next/image';
import { UserShowcase } from '@/components/user-showcase';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <HeroSection />

      <UserShowcase />

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-foreground">La qualité professionnelle, sans l'effort.</h2>
              <p className="text-lg text-muted-foreground">
                LAVOO Express réinvente votre routine de lessive. Nous combinons l'expertise du nettoyage professionnel avec une technologie de pointe pour vous offrir un service inégalé, directement depuis chez vous.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-1" />
                  <span><span className="font-semibold">Soin Expert :</span> Chaque vêtement est traité avec la plus grande attention par nos spécialistes.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-1" />
                  <span><span className="font-semibold">Simplicité Maximale :</span> Commandez en quelques clics et laissez-nous nous occuper du reste.</span>
                </li>
                 <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-1" />
                  <span><span className="font-semibold">Rapidité Garantie :</span> Votre linge propre et frais vous est retourné en 24h chrono.</span>
                </li>
              </ul>
              <Button size="lg" asChild>
                <Link href="/#services">Découvrir nos services</Link>
              </Button>
            </div>
            <div className="relative rounded-lg overflow-hidden group">
               <Image
                  src="/images/imageCaroussel/Client10.png"
                  alt="Présentation du service LAVOO Express"
                  width={500}
                  height={600}
                  className="w-500 h-auto object-cover rounded-lg transform group-hover:scale-105 transition-transform duration-300"
                  data-ai-hint="laundry service employee"
                />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-lg overflow-hidden group md:order-2">
               <Image
                  src="/images/imageCaroussel/Client11.png"
                  alt="Technologie de pointe pour le soin du linge"
                  width={500}
                  height={500}
                  className="w-500 h-auto object-cover rounded-lg transform group-hover:scale-105 transition-transform duration-300"
                  data-ai-hint="modern washing machine"
                />
            </div>
            <div className="space-y-6 md:order-1">
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-foreground">Une technologie au service de vos vêtements</h2>
              <p className="text-lg text-muted-foreground">
                Nous utilisons des équipements de dernière génération et des produits écologiques pour garantir un nettoyage impeccable tout en préservant la planète.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-1" />
                  <span><span className="font-semibold">Nettoyage Écologique :</span> Des détergents biodégradables qui respectent vos textiles et l'environnement.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-1" />
                  <span><span className="font-semibold">Contrôle Qualité :</span> Chaque cycle est suivi numériquement pour un résultat optimal et constant.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

       <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-foreground">La flexibilité à votre portée</h2>
              <p className="text-lg text-muted-foreground">
                Notre service s'adapte à votre emploi du temps. Choisissez les créneaux de collecte et de livraison qui vous arrangent, directement depuis notre application.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-1" />
                  <span><span className="font-semibold">Planification Facile :</span> Quelques clics suffisent pour programmer votre commande.</span>
                </li>
                 <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-1" />
                  <span><span className="font-semibold">Suivi en Temps Réel :</span> Soyez notifié à chaque étape, de la collecte à la livraison.</span>
                </li>
              </ul>
            </div>
            <div className="relative rounded-lg overflow-hidden group">
               <Image
                  src="/images/imageCaroussel/Client15.png"
                  alt="Personne utilisant l'application LAVOO Express sur son smartphone"
                  width={500}
                  height={500}
                  className="w-500 h-500 object-cover rounded-lg transform group-hover:scale-105 transition-transform duration-300"
                  data-ai-hint="person phone app"
                />
            </div>
          </div>
        </div>
      </section>

      <ReviewCarousel />

      <section id="how-it-works" className="py-16 md:py-24 bg-[#313f95] text-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">Comment ça marche ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-white/10 rounded-full p-4 mb-4">
                <TShirtIcon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Commandez</h3>
              <p className="text-white/80">Sélectionnez vos articles et choisissez un créneau de ramassage.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white/10 rounded-full p-4 mb-4">
                <Truck className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. On collecte</h3>
              <p className="text-white/80">Nous venons chercher votre linge directement à votre porte.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white/10 rounded-full p-4 mb-4">
                <WashingMachineIcon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. On nettoie</h3>
              <p className="text-white/80">Nos experts prennent soin de votre linge avec des produits de qualité.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white/10 rounded-full p-4 mb-4">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">4. On livre</h3>
              <p className="text-white/80">Recevez votre linge propre et frais, prêt à être porté.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">Nos Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="transform hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <TShirtIcon className="w-12 h-12 text-primary" />
                </div>
                <CardTitle className="text-center">Lavage & Pliage</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                Le soin quotidien pour vos vêtements, lavés, séchés et pliés avec attention.
              </CardContent>
            </Card>
            <Card className="transform hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <JacketIcon className="w-12 h-12 text-primary" />
                </div>
                <CardTitle className="text-center">Nettoyage à sec</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                La solution idéale pour vos textiles délicats, costumes, et robes.
              </CardContent>
            </Card>
            <Card className="transform hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <TrousersIcon className="w-12 h-12 text-primary" />
                </div>
                <CardTitle className="text-center">Repassage seul</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                Un service de repassage professionnel pour des vêtements impeccables.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">Questions fréquentes</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Quels sont vos délais de livraison ?</AccordionTrigger>
                <AccordionContent>
                  Nous garantissons une livraison en 24h chrono. Collecte aujourd'hui, livraison demain ! Pour les demandes spécifiques comme le nettoyage de tapis, le délai peut être légèrement plus long.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Quelles zones desservez-vous ?</AccordionTrigger>
                <AccordionContent>
                  Nous desservons actuellement les arrondissements de Paris de 75001 à 75008. Vous pouvez vérifier votre code postal sur notre page d'accueil pour confirmer votre éligibilité. Nous étendons notre zone de service régulièrement !
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Comment dois-je préparer mon linge pour la collecte ?</AccordionTrigger>
                <AccordionContent>
                  Rassemblez simplement votre linge dans un sac. Il n'est pas nécessaire de trier, nos experts s'en chargent pour vous. Si vous avez des articles pour le nettoyage à sec, merci de les séparer dans un sac distinct.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Que se passe-t-il si un vêtement est endommagé ?</AccordionTrigger>
                <AccordionContent>
                  La qualité est notre priorité. Chaque article est inspecté à la réception. En cas de dommage de notre fait, nous nous engageons à vous dédommager selon nos conditions générales de vente.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>Proposez-vous des services pour les entreprises ?</AccordionTrigger>
                <AccordionContent>
                  Oui, absolument ! Nous avons des offres dédiées aux professionnels (hôtels, restaurants, conciergeries, etc.). Visitez notre section "Services Pro" ou contactez-nous pour un devis sur mesure.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">Prêt à simplifier votre quotidien ?</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground mb-8">
              Fini la corvée de linge. Confiez-nous vos vêtements et retrouvez du temps pour ce qui compte vraiment.
            </p>
            <Button size="lg" asChild>
              <Link href="/order">Commander maintenant</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

    