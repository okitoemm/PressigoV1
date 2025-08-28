
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Loader2, PackageCheck, Package, Truck, CircleAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

const mockStatus: { [key: string]: { status: string; description: string; icon: React.ElementType } } = {
    "LAVOO-ABC123": { status: "Livrée", description: "Votre commande a été livrée avec succès le 15/05/2024.", icon: PackageCheck },
    "LAVOO-XYZ789": { status: "En cours de traitement", description: "Nous préparons votre commande pour la collecte.", icon: Package },
    "LAVOO-LMN456": { status: "En transit", description: "Votre commande est en route vers notre centre de nettoyage.", icon: Truck },
};

export function OrderTracking() {
    const [orderId, setOrderId] = useState("");
    const [status, setStatus] = useState<{ status: string; description: string; icon: React.ElementType } | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleTrackOrder = () => {
        if (!orderId) {
            setError("Veuillez entrer un numéro de commande.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setStatus(null);

        setTimeout(() => {
            const foundStatus = mockStatus[orderId.toUpperCase()];
            if (foundStatus) {
                setStatus(foundStatus);
            } else {
                setError("Aucune commande trouvée avec ce numéro.");
            }
            setIsLoading(false);
        }, 1500);
    };

    const getStatusIcon = () => {
        if (!status) return null;
        const Icon = status.icon;
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
                        placeholder="Ex: LAVOO-ABC123"
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
