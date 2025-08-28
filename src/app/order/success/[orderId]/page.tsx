import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PartyPopper } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type SuccessPageProps = {
  params: {
    orderId: string;
  };
};

export default function OrderSuccessPage({ params }: SuccessPageProps) {
  const { orderId } = params;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${orderId}`;

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16 flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md text-center shadow-lg">
        <CardHeader className="pt-8">
          <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit">
            <PartyPopper className="w-10 h-10 text-primary" />
          </div>
          <CardTitle className="!mt-4 text-2xl font-headline">Commande confirmée !</CardTitle>
          <CardDescription>
            Merci pour votre confiance. Votre commande est en cours de traitement.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-secondary p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Votre numéro de commande</p>
            <p className="text-2xl font-mono font-bold text-primary tracking-widest">{orderId}</p>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-muted-foreground">Scannez ce code en magasin pour un suivi rapide :</p>
            <div className="p-2 border rounded-lg bg-white">
                <Image
                    src={qrCodeUrl}
                    alt={`QR Code for order ${orderId}`}
                    width={200}
                    height={200}
                />
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            <p>Un e-mail de confirmation vous a été envoyé.</p>
            <p>Vous recevrez également des notifications par WhatsApp si vous avez choisi cette option.</p>
          </div>

          <Button asChild className="w-full">
            <Link href="/">Retour à l'accueil</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
