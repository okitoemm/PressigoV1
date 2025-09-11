
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase/client-app";
import { onAuthStateChanged, signOut, User as FirebaseUser } from "firebase/auth";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, History, Settings, MapPin, Bell, LogOut, Loader2 } from "lucide-react";
import Link from "next/link";
import { OrderTracking } from "@/components/order-tracking";
import { useToast } from "@/hooks/use-toast";


type Order = {
  id: string;
  date: string;
  total: string; // This should ideally be calculated based on items
  status: string;
};

const addresses = [
    { id: 1, type: "Maison", address: "123 Rue de la République, 75001 Paris", isDefault: true },
    { id: 2, type: "Travail", address: "45 Avenue des Champs-Élysées, 75008 Paris", isDefault: false },
]

export default function AccountPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [pastOrders, setPastOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Fetch orders
        try {
          const q = query(
            collection(db, "orders"),
            where("userId", "==", currentUser.uid),
            orderBy("createdAt", "desc")
          );
          const querySnapshot = await getDocs(q);
          const orders = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              // Note: Formatting timestamp might require a library like date-fns
              date: data.createdAt?.toDate().toLocaleDateString('fr-FR') || 'Date inconnue',
              total: "N/A", // Total price isn't stored, might need to calculate
              status: data.status,
            };
          });
          setPastOrders(orders);
        } catch (error) {
          console.error("Error fetching orders: ", error);
          toast({ variant: "destructive", title: "Erreur", description: "Impossible de charger l'historique des commandes." });
        }
      } else {
        router.push("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router, toast]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({ title: "Déconnexion réussie" });
      router.push("/");
    } catch (error) {
      toast({ variant: "destructive", title: "Erreur", description: "Impossible de se déconnecter." });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }
  
  return (
    <div className="bg-secondary/30 min-h-[calc(100vh-4rem)]">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-headline font-bold">Mon Espace Client</h1>
              <p className="text-muted-foreground">Bienvenue, {user?.displayName || 'Client'} !</p>
            </div>
            <Button variant="ghost" onClick={handleLogout} className="text-muted-foreground">
                <LogOut className="w-4 h-4 mr-2"/>
                Se déconnecter
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
                                <span>{user?.displayName}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="font-semibold">Adresse e-mail:</span>
                                <span>{user?.email}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="font-semibold">Téléphone:</span>
                                <span>{user?.phoneNumber || "Non fourni"}</span>
                            </div>
                             <div className="flex flex-col gap-1">
                                <span className="font-semibold">Client depuis:</span>
                                <span>{user?.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString('fr-FR') : 'N/A'}</span>
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
                                    {order.date}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${order.status === 'Livrée' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
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
