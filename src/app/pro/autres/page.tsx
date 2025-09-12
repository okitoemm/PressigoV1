
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Briefcase } from "lucide-react";

export default function ProAutresPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
      <div className="max-w-3xl mx-auto text-center">
        <Briefcase className="mx-auto h-16 w-16 text-primary mb-6" />
        <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
          Une Solution sur Mesure pour Votre Business
        </h1>
        <p className="text-lg text-muted-foreground mt-4 mb-8">
          Quel que soit votre secteur d'activité (santé, événementiel, industrie...), nous avons une solution d'entretien textile pour vous. Discutons de vos besoins spécifiques pour établir un partenariat adapté.
        </p>
        <Button size="lg" asChild>
          <Link href="/contact/devis">Demander un devis</Link>
        </Button>
      </div>
    </div>
  );
}
