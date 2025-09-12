
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Building } from "lucide-react";

export default function ProAppartementPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
      <div className="max-w-3xl mx-auto text-center">
        <Building className="mx-auto h-16 w-16 text-primary mb-6" />
        <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
          Service pour Appartements & Copropriétés
        </h1>
        <p className="text-lg text-muted-foreground mt-4 mb-8">
          Simplifiez la gestion du linge pour vos résidents ou vos biens immobiliers. Nous proposons des contrats d'entretien pour le linge plat, les rideaux, et autres textiles pour les syndics et gestionnaires de propriétés.
        </p>
        <Button size="lg" asChild>
          <Link href="/contact/devis">Demander un devis</Link>
        </Button>
      </div>
    </div>
  );
}
