
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BedDouble } from "lucide-react";

export default function ProHotelPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
      <div className="max-w-3xl mx-auto text-center">
        <BedDouble className="mx-auto h-16 w-16 text-primary mb-6" />
        <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
          Service de Pressing pour Hôtels & Spas
        </h1>
        <p className="text-lg text-muted-foreground mt-4 mb-8">
          Offrez à vos clients une expérience de luxe avec du linge impeccable. Nous assurons un service de blanchisserie et de nettoyage à sec de haute qualité pour votre linge de lit, de bain, et les uniformes de votre personnel.
        </p>
        <Button size="lg" asChild>
          <Link href="/contact/devis">Demander un devis</Link>
        </Button>
      </div>
    </div>
  );
}
