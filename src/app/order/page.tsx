import { OrderForm } from "@/components/order-form";

export default function OrderPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-headline font-bold text-center mb-2">
          Passez votre commande
        </h1>
        <p className="text-muted-foreground text-center mb-8">
          Suivez les étapes pour planifier la collecte et la livraison de votre linge.
        </p>
        <OrderForm />
      </div>
    </div>
  );
}
