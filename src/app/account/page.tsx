
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase/client-app";
import { onAuthStateChanged, signOut, User as FirebaseUser } from "firebase/auth";
import { collection, query, where, getDocs, orderBy, addDoc, doc, updateDoc, writeBatch, deleteDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, History, Settings, MapPin, Bell, LogOut, Loader2, PlusCircle, Trash2 } from "lucide-react";
import Link from "next/link";
import { OrderTracking } from "@/components/order-tracking";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


type Order = {
  id: string;
  date: string;
  total: string; // This should ideally be calculated based on items
  status: string;
};

type Address = {
    id: string;
    type: string;
    address: string;
    isDefault: boolean;
};

const addressSchema = z.object({
  type: z.string().min(1, { message: "Le type d'adresse est requis." }),
  address: z.string().min(5, { message: "L'adresse est requise." }),
  isDefault: z.boolean().default(false),
});

export default function AccountPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [pastOrders, setPastOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [isSubmittingAddress, setIsSubmittingAddress] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);


  const addressForm = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      type: "Maison",
      address: "",
      isDefault: false,
    },
  });

  const fetchAddresses = async (userId: string) => {
      const addressesQuery = query(collection(db, `users/${userId}/addresses`));
      const addressesSnapshot = await getDocs(addressesQuery);
      const userAddresses = addressesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Address));
      setAddresses(userAddresses);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(true);
        try {
          // Fetch orders
          const ordersQuery = query(
            collection(db, "orders"),
            where("userId", "==", currentUser.uid),
            orderBy("createdAt", "desc")
          );
          const ordersSnapshot = await getDocs(ordersQuery);
          const orders = ordersSnapshot.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              date: data.createdAt?.toDate().toLocaleDateString('fr-FR') || 'Date inconnue',
              total: "N/A", 
              status: data.status,
            };
          });
          setPastOrders(orders);

          // Fetch addresses
          await fetchAddresses(currentUser.uid);

        } catch (error) {
          console.error("Error fetching data: ", error);
          toast({ variant: "destructive", title: "Erreur", description: "Impossible de charger vos informations." });
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

  const handleOpenAddDialog = () => {
      setEditingAddress(null);
      addressForm.reset({ type: "Maison", address: "", isDefault: false });
      setIsAddressDialogOpen(true);
  }

  const handleOpenEditDialog = (address: Address) => {
      setEditingAddress(address);
      addressForm.reset(address);
      setIsAddressDialogOpen(true);
  }
  
  const handleDeleteAddress = async () => {
    if (!user || !editingAddress) return;
    try {
      await deleteDoc(doc(db, `users/${user.uid}/addresses/${editingAddress.id}`));
      toast({ title: "Succès", description: "L'adresse a été supprimée." });
      await fetchAddresses(user.uid);
      setIsAddressDialogOpen(false);
    } catch (error) {
      console.error("Error deleting address:", error);
      toast({ variant: "destructive", title: "Erreur", description: "Impossible de supprimer l'adresse." });
    }
  };


  const onAddressSubmit = async (values: z.infer<typeof addressSchema>) => {
      if (!user) return;
      setIsSubmittingAddress(true);
      try {
          const batch = writeBatch(db);

          // If setting new default address, unset the old one
          if (values.isDefault) {
              const addressesQuery = query(collection(db, `users/${user.uid}/addresses`), where("isDefault", "==", true));
              const currentDefault = await getDocs(addressesQuery);
              currentDefault.forEach(doc => {
                  if (doc.id !== editingAddress?.id) {
                      batch.update(doc.ref, { isDefault: false });
                  }
              });
          }
          
          if (editingAddress) {
              // Update existing address
              const addressRef = doc(db, `users/${user.uid}/addresses/${editingAddress.id}`);
              batch.update(addressRef, values);
              await batch.commit();
              toast({ title: "Succès", description: "Votre adresse a été mise à jour."});
          } else {
              // Add new address - commit previous batch first
              await batch.commit();
              await addDoc(collection(db, `users/${user.uid}/addresses`), values);
              toast({ title: "Succès", description: "Votre nouvelle adresse a été ajoutée."});
          }

          await fetchAddresses(user.uid);
          setIsAddressDialogOpen(false);
          setEditingAddress(null);
          addressForm.reset();
      } catch (error) {
          console.error("Error saving address: ", error);
          toast({ variant: "destructive", title: "Erreur", description: "Impossible d'enregistrer l'adresse." });
      } finally {
          setIsSubmittingAddress(false);
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
                                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${order.status === 'Livrée' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'}`}>
                                        {order.status}
                                    </span>
                                </div>
                                </div>
                                {index < pastOrders.length - 1 && <Separator />}
                            </div>
                            ))
                        ) : (
                            <div className="text-center py-8 bg-secondary/70 rounded-lg">
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
                            {addresses.length > 0 ? addresses.map(addr => (
                                <div key={addr.id} className="p-3 border rounded-md">
                                    <div className="flex justify-between items-center">
                                      <p className="font-semibold">{addr.type} {addr.isDefault && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full ml-2">Défaut</span>}</p>
                                      <Button variant="ghost" size="sm" onClick={() => handleOpenEditDialog(addr)}>Modifier</Button>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{addr.address}</p>
                                </div>
                            )) : (
                                <p className="text-sm text-muted-foreground text-center py-4">Aucune adresse enregistrée.</p>
                            )}
                            <Button variant="secondary" className="w-full" onClick={handleOpenAddDialog}><PlusCircle className="mr-2 h-4 w-4" />Ajouter une adresse</Button>

                            <Dialog open={isAddressDialogOpen} onOpenChange={setIsAddressDialogOpen}>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>{editingAddress ? "Modifier l'adresse" : "Ajouter une nouvelle adresse"}</DialogTitle>
                                        <DialogDescription>
                                            {editingAddress ? "Mettez à jour les détails de votre adresse." : "Cette adresse sera disponible pour vos prochaines commandes."}
                                        </DialogDescription>
                                    </DialogHeader>
                                    <Form {...addressForm}>
                                        <form onSubmit={addressForm.handleSubmit(onAddressSubmit)} className="space-y-4 py-4">
                                            <FormField
                                                control={addressForm.control}
                                                name="type"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Type d'adresse</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                          <FormControl>
                                                            <SelectTrigger>
                                                              <SelectValue placeholder="Choisissez un type" />
                                                            </SelectTrigger>
                                                          </FormControl>
                                                          <SelectContent>
                                                            <SelectItem value="Maison">Maison</SelectItem>
                                                            <SelectItem value="Travail">Travail</SelectItem>
                                                            <SelectItem value="Autre">Autre</SelectItem>
                                                          </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={addressForm.control}
                                                name="address"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Adresse complète</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="123 Rue de Paris, 75001 Paris" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={addressForm.control}
                                                name="isDefault"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value}
                                                                onCheckedChange={field.onChange}
                                                            />
                                                        </FormControl>
                                                        <div className="space-y-1 leading-none">
                                                            <FormLabel>
                                                                Définir comme adresse par défaut
                                                            </FormLabel>
                                                        </div>
                                                    </FormItem>
                                                )}
                                            />
                                            <DialogFooter className="flex justify-between w-full">
                                                {editingAddress && (
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button type="button" variant="destructive" className="mr-auto"><Trash2 className="mr-2 h-4 w-4" /> Supprimer</Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    Cette action est irréversible et supprimera définitivement cette adresse.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Annuler</AlertDialogCancel>
                                                                <AlertDialogAction onClick={handleDeleteAddress}>Confirmer</AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                )}
                                                <Button type="submit" disabled={isSubmittingAddress} className={!editingAddress ? 'w-full' : ''}>
                                                    {isSubmittingAddress && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                                    Enregistrer
                                                </Button>
                                            </DialogFooter>
                                        </form>
                                    </Form>
                                </DialogContent>
                            </Dialog>
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

    