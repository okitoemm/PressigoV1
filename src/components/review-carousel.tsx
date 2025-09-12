
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const reviews = [
  {
    name: "Sophie L.",
    title: "Cliente depuis 6 mois",
    avatar: "/images/imageCaroussel/Client20.png",
    rating: 5,
    review: "Service impeccable et rapide. Mon linge est revenu plus propre que jamais ! Je recommande vivement.",
  },
  {
    name: "Marc D.",
    title: "Client régulier",
    avatar: "/images/imageCaroussel/Client18.png",
    rating: 5,
    review: "Très pratique, la collecte et la livraison à domicile sont un vrai plus. Qualité au rendez-vous.",
  },
  {
    name: "Juliette P.",
    title: "Première commande",
    avatar: "/images/imageCaroussel/Client17.png",
    rating: 4,
    review: "Bon service dans l'ensemble. Juste un petit retard sur la livraison, mais la qualité était parfaite.",
  },
  {
    name: "Thomas B.",
    title: "Client satisfait",
    avatar: "/images/imageCaroussel/Client15.png",
    rating: 5,
    review: "LAVOO a sauvé ma chemise préférée ! Le traitement des taches est incroyablement efficace. Merci !",
  },
  {
    name: "Chloé M.",
    title: "Cliente fidèle",
    avatar: "/images/imageCaroussel/Client16.png",
    rating: 5,
    review: "Enfin une solution simple pour la corvée de linge. L'application est facile à utiliser et le service client est top.",
  },
  {
    name: "Alexandre G.",
    title: "Abonné Express",
    avatar: "/images/imageCaroussel/Client2.png",
    rating: 5,
    review: "Je suis client depuis 3 mois et je ne pourrais plus m'en passer. Un vrai gain de temps au quotidien.",
  },
  {
    name: "Léa R.",
    title: "Nouvelle cliente",
    avatar: "/images/imageCaroussel/Client19.png",
    rating: 4,
    review: "Le repassage est parfait. Mes chemises sont impeccables. Je recommande ce service.",
  },
  {
    name: "Antoine F.",
    title: "Client vérifié",
    avatar: "/images/imageCaroussel/Client7.png",
    rating: 5,
    review: "Rapide, fiable et de grande qualité. Le QR code pour le suivi est une super idée. Très satisfait.",
  },
];

const ReviewCard = ({ review }: { review: (typeof reviews)[0] }) => {
  return (
    <Card className="w-[450px] flex-shrink-0 snap-center shadow-md border-primary/20 hover:border-primary/50 transition-colors">
      <CardContent className="p-0 flex">
        <div className="w-1/3">
          <Image
            src={review.avatar}
            alt={`Avis de ${review.name}`}
            width={150}
            height={225}
            className="object-cover h-full rounded-l-lg"
            data-ai-hint="happy customer"
          />
        </div>
        <div className="w-2/3 p-6 flex flex-col justify-center">
          <h3 className="font-bold text-lg">{review.name}</h3>
          <p className="text-sm text-muted-foreground mb-2">{review.title}</p>
          <div className="flex items-center gap-0.5 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-5 h-5",
                  i < review.rating ? "text-primary fill-primary" : "text-muted-foreground/50"
                )}
              />
            ))}
          </div>
          <blockquote className="text-sm text-foreground/80 leading-relaxed italic">
            <p>&ldquo;{review.review}&rdquo;</p>
          </blockquote>
        </div>
      </CardContent>
    </Card>
  );
};

export function ReviewCarousel() {
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <section className="py-16 md:py-24 bg-secondary/50">
       <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">Ce que nos clients disent de nous</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground mb-12">
                Découvrez pourquoi des centaines de clients nous font confiance chaque semaine pour prendre soin de leur linge.
            </p>
        </div>
      <div
        className="relative w-full overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div className="flex min-w-max animate-marquee-slow gap-6 py-4">
          {duplicatedReviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
