
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, History, Settings, MapPin, Bell, LogOut } from "lucide-react";
import Link from "next/link";
import { OrderTracking } from "@/components/order-tracking";

// Mock data - replace with actual user data
const userData = {
  name: "Jean Dupont",
  email: "jean.dupont@email.com",
  phone: "06 12 34 56 78",
  memberSince: "Juin 2023",
};

const addresses = [
    { id: 1, type: "Maison", address: "123 Rue de la République, 75001 Paris", isDefault: true },
    { id: 2, type: "Travail", address: "45 Avenue des Champs-Élysées, 75008 Paris", isDefault: false },
]

const pastOrders = [
  { id: "LAVOO-ABC123", date: "15/05/2024", total: "25,00 €", status: "Livrée" },
  { id: "LAVOO-DEF456", date: "02/05/2024", total: "18,50 €", status: "Livrée" },
  { id: "LAVOO-GHI789", date: "21/04/2024", total: "32,00 €", status: "Annulée" },
  { id: "LAVOO-JKL123", date: "10/04/2024", total: "28,00 €", status: "Livrée" },
];

export default function AccountPage() {
  return (
    <div className="bg-secondary/30 min-h-[calc(100vh-4rem)]">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-headline font-bold">Mon Espace Client</h1>
              <p className="text-muted-foreground">Bienvenue, {userData.name} !</p>
            </div>
            <Button variant="ghost" asChild>
              <Link href="/login" className="text-muted-foreground">
                <LogOut className="w-4 h-4 mr-2"/>
                Se déconnecter
              </Link>
            </Button>
          </div>
          
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="overview">
                    <User className="w-4 h-4 mr-2" />
                    Mon Profil
                </TabsTrigger>
                <TabsTrigger value="orders">
                    <History className="w-4 h-4 mr-2" />
                    Mes Commandes
                </TabsTrigger>
                <TabsTrigger value="settings">
                    <Settings className="w-4 h-4 mr-2" />
                    Paramètres
                </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
                <Card>
                    <CardHeader>
                        <CardTitle>Informations personnelles</CardTitle>
                        <CardDescription>Gérez vos informations de contact et personnelles.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="flex flex-col gap-1">
                                <span className="font-semibold">Nom complet:</span>
                                <span>{userData.name}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="font-semibold">Adresse e-mail:</span>
                                <span>{userData.email}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="font-semibold">Téléphone:</span>
                                <span>{userData.phone}</span>
                            </div>
                             <div className="flex flex-col gap-1">
                                <span className="font-semibold">Client depuis:</span>
                                <span>{userData.memberSince}</span>
                            </div>
                        </div>
                        <Separator/>
                        <div className="flex justify-start">
                            <Button variant="outline">Modifier mes informations</Button>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="orders">
              <div className="grid gap-6">
                <OrderTracking />
                <Card>
                    <CardHeader>
                        <CardTitle>Historique des commandes</CardTitle>
                        <CardDescription>Retrouvez ici la liste de vos commandes passées.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                        {pastOrders.length > 0 ? (
                            pastOrders.map((order, index) => (
                            <div key={order.id}>
                                <div className="flex justify-between items-center p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                                <div>
                                    <p className="font-semibold text-primary">{order.id}</p>
                                    <p className="text-sm text-muted-foreground">
                                    {order.date} - {order.total}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${order.status === 'Livrée' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {order.status}
                                    </span>
                                </div>
                                </div>
                                {index < pastOrders.length - 1 && <Separator />}
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
            </TabsContent>

            <TabsContent value="settings">
                 <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><MapPin className="w-5 h-5"/> Adresses</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {addresses.map(addr => (
                                <div key={addr.id} className="p-3 border rounded-md">
                                    <div className="flex justify-between items-center">
                                      <p className="font-semibold">{addr.type} {addr.isDefault && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full ml-2">Défaut</span>}</p>
                                      <Button variant="ghost" size="sm">Modifier</Button>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{addr.address}</p>
                                </div>
                            ))}
                            <Button variant="secondary" className="w-full">Ajouter une adresse</Button>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Bell className="w-5 h-5"/> Notifications</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-3 border rounded-md">
                                <div>
                                    <p className="font-semibold">Notifications par e-mail</p>
                                    <p className="text-sm text-muted-foreground">Promotions et actualités.</p>
                                </div>
                                <Button variant="secondary">Gérer</Button>
                            </div>
                             <div className="flex items-center justify-between p-3 border rounded-md">
                                <div>
                                    <p className="font-semibold">Notifications WhatsApp</p>
                                    <p className="text-sm text-muted-foreground">Suivi de commande.</p>
                                </div>
                                <Button variant="secondary">Gérer</Button>
                            </div>
                        </CardContent>
                    </Card>
                 </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
