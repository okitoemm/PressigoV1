
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Loader2, PackageCheck, Package, Truck, CircleAlert, XCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { db } from "@/lib/firebase/client-app";
import { doc, getDoc } from "firebase/firestore";

const statusIcons: { [key: string]: React.ElementType } = {
    "En cours de traitement": Package,
    "En transit": Truck,
    "Livrée": PackageCheck,
    "Annulée": XCircle,
};

type OrderStatus = {
    status: string;
    description: string;
};

export function OrderTracking() {
    const [orderId, setOrderId] = useState("");
    const [status, setStatus] = useState<OrderStatus | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleTrackOrder = async () => {
        if (!orderId) {
            setError("Veuillez entrer un numéro de commande.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setStatus(null);

        try {
            const docRef = doc(db, "orders", orderId.trim());
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                setStatus({
                    status: data.status,
                    description: `Commande du ${data.createdAt.toDate().toLocaleDateString('fr-FR')}.`,
                });
            } else {
                setError("Aucune commande trouvée avec ce numéro.");
            }
        } catch (err) {
            console.error("Error fetching order:", err);
            setError("Une erreur est survenue lors de la recherche de la commande.");
        } finally {
            setIsLoading(false);
        }
    };

    const getStatusIcon = () => {
        if (!status) return null;
        const Icon = statusIcons[status.status] || CircleAlert;
        return <Icon className="w-12 h-12 text-primary" />;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Suivre ma commande</CardTitle>
                <CardDescription>Entrez votre numéro de commande pour voir son statut.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input
                        type="text"
                        placeholder="Ex: d5kFp8..."
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleTrackOrder()}
                    />
                    <Button onClick={handleTrackOrder} disabled={isLoading}>
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                        Suivre
                    </Button>
                </div>

                {error && (
                    <Alert variant="destructive" className="mt-4">
                        <CircleAlert className="h-4 w-4"/>
                        <AlertTitle>Erreur</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                
                {status && (
                    <div className="mt-6 p-6 bg-secondary/50 rounded-lg flex items-center gap-6">
                        <div className="p-3 bg-white rounded-full shadow">
                           {getStatusIcon()}
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Statut de la commande</p>
                            <p className="text-xl font-bold text-primary">{status.status}</p>
                            <p className="text-sm text-muted-foreground mt-1">{status.description}</p>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
