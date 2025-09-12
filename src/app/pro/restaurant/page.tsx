
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UtensilsCrossed } from "lucide-react";

export default function ProRestaurantPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
      <div className="max-w-3xl mx-auto text-center">
        <UtensilsCrossed className="mx-auto h-16 w-16 text-primary mb-6" />
        <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
          Entretien du Linge pour Restaurants
        </h1>
        <p className="text-lg text-muted-foreground mt-4 mb-8">
          Assurez une présentation impeccable de votre établissement. Nous prenons en charge le nettoyage et le repassage de vos nappes, serviettes, tabliers et tenues de votre personnel avec une expertise anti-taches.
        </p>
        <Button size="lg" asChild>
          <Link href="/contact/devis">Demander un devis</Link>
        </Button>
      </div>
    </div>
  );
}
