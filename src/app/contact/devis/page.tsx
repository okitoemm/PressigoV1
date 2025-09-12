
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function DevisPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-headline">Demande de devis professionnel</CardTitle>
            <CardDescription>
              Remplissez ce formulaire pour obtenir une offre personnalisée. Nous vous répondrons sous 24h.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Nom de l'entreprise</Label>
                  <Input id="companyName" placeholder="Votre société" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sector">Secteur d'activité</Label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Choisissez votre secteur" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="hotel">Hôtels & Spas</SelectItem>
                            <SelectItem value="restaurant">Restaurants</SelectItem>
                            <SelectItem value="construction">Construction & BTP</SelectItem>
                            <SelectItem value="airbnb">Conciergerie & Airbnb</SelectItem>
                            <SelectItem value="copropriete">Appartements & Copropriétés</SelectItem>
                            <SelectItem value="autre">Autre</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
              </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactName">Nom du contact</Label>
                  <Input id="contactName" placeholder="Jean Dupont" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Adresse e-mail</Label>
                  <Input id="email" type="email" placeholder="contact@votre-societe.com" />
                </div>
              </div>
               <div className="space-y-2">
                  <Label htmlFor="phone">Numéro de téléphone</Label>
                  <Input id="phone" type="tel" placeholder="06 12 34 56 78" />
                </div>
              <div className="space-y-2">
                <Label htmlFor="message">Décrivez vos besoins</Label>
                <Textarea id="message" placeholder="Exemple : besoin de nettoyer 50 nappes et 200 serviettes par semaine..." className="min-h-[120px]" />
              </div>
              <Button type="submit" className="w-full" size="lg">
                Envoyer ma demande
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
