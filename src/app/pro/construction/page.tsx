
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HardHat } from "lucide-react";

export default function ProConstructionPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
      <div className="max-w-3xl mx-auto text-center">
        <HardHat className="mx-auto h-16 w-16 text-primary mb-6" />
        <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
          Nettoyage Vêtements de Travail BTP
        </h1>
        <p className="text-lg text-muted-foreground mt-4 mb-8">
          La sécurité et la propreté sont essentielles. Nous proposons un service spécialisé pour le nettoyage en profondeur et l'entretien des vêtements de travail du secteur de la construction, respectant les normes de sécurité.
        </p>
        <Button size="lg" asChild>
          <Link href="/contact/devis">Demander un devis</Link>
        </Button>
      </div>
    </div>
  );
}
