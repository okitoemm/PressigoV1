
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { KeyRound } from "lucide-react";

export default function ProAirbnbPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
      <div className="max-w-3xl mx-auto text-center">
        <KeyRound className="mx-auto h-16 w-16 text-primary mb-6" />
        <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
          Solution pour Conciergeries & Airbnb
        </h1>
        <p className="text-lg text-muted-foreground mt-4 mb-8">
          Garantissez une propreté irréprochable entre chaque séjour. Nous offrons une rotation rapide et fiable de votre linge de maison, vous permettant d'optimiser votre temps et d'obtenir des avis 5 étoiles.
        </p>
        <Button size="lg" asChild>
          <Link href="/contact/devis">Demander un devis</Link>
        </Button>
      </div>
    </div>
  );
}
