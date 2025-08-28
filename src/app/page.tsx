import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Truck, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { WashingMachineIcon } from '@/components/icons/washing-machine-icon';
import { TShirtIcon } from '@/components/icons/t-shirt-icon';
import { TrousersIcon } from '@/components/icons/trousers-icon';
import { JacketIcon } from '@/components/icons/jacket-icon';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <section className="w-full bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 items-center gap-8 min-h-[70vh] md:min-h-[80vh]">
          <div className="flex flex-col items-start text-left space-y-4">
            <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tighter">
              Service de laverie & pressing en 24h
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90">
              sur la base de plus de 200 000 avis dans 14 pays
            </p>
            <div className="flex items-center gap-1">
              <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />
              <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />
              <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />
              <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />
              <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />
            </div>
            <Button size="lg" asChild className="bg-white text-primary hover:bg-white/90 mt-4">
              <Link href="/order">Réservez dès maintenant</Link>
            </Button>
          </div>
          <div className="relative w-full h-[400px] md:h-[500px]">
            <Image
              src="https://picsum.photos/600/700"
              alt="Femme souriante tenant du linge propre"
              data-ai-hint="woman holding laundry"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">Comment ça marche ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 rounded-full p-4 mb-4">
                <TShirtIcon className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Commandez</h3>
              <p className="text-muted-foreground">Sélectionnez vos articles et choisissez un créneau de ramassage.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 rounded-full p-4 mb-4">
                <Truck className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. On collecte</h3>
              <p className="text-muted-foreground">Nous venons chercher votre linge directement à votre porte.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 rounded-full p-4 mb-4">
                <WashingMachineIcon className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. On nettoie</h3>
              <p className="text-muted-foreground">Nos experts prennent soin de votre linge avec des produits de qualité.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 rounded-full p-4 mb-4">
                <Sparkles className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">4. On livre</h3>
              <p className="text-muted-foreground">Recevez votre linge propre et frais, prêt à être porté.</p>
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
                  <TShirtIcon className="w-12 h-12 text-accent" />
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
                  <JacketIcon className="w-12 h-12 text-accent" />
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
                  <TrousersIcon className="w-12 h-12 text-accent" />
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

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">Prêt à simplifier votre quotidien ?</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground mb-8">
              Fini la corvée de linge. Confiez-nous vos vêtements et retrouvez du temps pour ce qui compte vraiment.
            </p>
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90">
              <Link href="/order">Commander maintenant</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
