
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { User, MapPin, Phone, Mail, Shirt, History } from "lucide-react";
import Link from "next/link";

// Mock data - replace with actual user data
const userData = {
  name: "Jean Dupont",
  email: "jean.dupont@email.com",
  phone: "06 12 34 56 78",
  address: "123 Rue de la République, 75001 Paris",
};

const pastOrders = [
  { id: "LAVOO-ABC123", date: "15/05/2024", total: "25,00 €", status: "Livrée" },
  { id: "LAVOO-DEF456", date: "02/05/2024", total: "18,50 €", status: "Livrée" },
  { id: "LAVOO-GHI789", date: "21/04/2024", total: "32,00 €", status: "Livrée" },
];

export default function AccountPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-headline font-bold">Mon Compte</h1>
            <p className="text-muted-foreground">Bienvenue, {userData.name} !</p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/login">Se déconnecter</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Mes informations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-muted-foreground" />
                  <span>{userData.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <span>{userData.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <span>{userData.phone}</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground mt-1" />
                  <span>{userData.address}</span>
                </div>
                <Separator />
                <Button variant="secondary" className="w-full">Modifier mes informations</Button>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="w-6 h-6" />
                  Historique des commandes
                </CardTitle>
                <CardDescription>Retrouvez ici la liste de vos commandes passées.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pastOrders.length > 0 ? (
                    pastOrders.map((order, index) => (
                      <div key={order.id}>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold text-primary">{order.id}</p>
                            <p className="text-sm text-muted-foreground">
                              {order.date} - {order.total}
                            </p>
                          </div>
                          <div className="text-right">
                             <span className="text-sm font-medium bg-green-100 text-green-800 px-2 py-1 rounded-full">{order.status}</span>
                          </div>
                        </div>
                         {index < pastOrders.length - 1 && <Separator className="mt-4" />}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 bg-secondary rounded-lg">
                      <p className="text-muted-foreground">Vous n'avez pas encore de commande.</p>
                      <Button asChild className="mt-4">
                        <Link href="/order">Commander maintenant</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
