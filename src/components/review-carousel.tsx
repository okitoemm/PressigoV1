
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const reviews = [
  {
    name: "Sophie L.",
    avatar: "https://picsum.photos/id/237/50/50",
    rating: 5,
    review: "Service impeccable et rapide. Mon linge est revenu plus propre que jamais ! Je recommande vivement.",
  },
  {
    name: "Marc D.",
    avatar: "https://picsum.photos/id/238/50/50",
    rating: 5,
    review: "Très pratique, la collecte et la livraison à domicile sont un vrai plus. Qualité au rendez-vous.",
  },
  {
    name: "Juliette P.",
    avatar: "https://picsum.photos/id/239/50/50",
    rating: 4,
    review: "Bon service dans l'ensemble. Juste un petit retard sur la livraison, mais la qualité était parfaite.",
  },
  {
    name: "Thomas B.",
    avatar: "https://picsum.photos/id/240/50/50",
    rating: 5,
    review: "LAVOO a sauvé ma chemise préférée ! Le traitement des taches est incroyablement efficace. Merci !",
  },
  {
    name: "Chloé M.",
    avatar: "https://picsum.photos/id/241/50/50",
    rating: 5,
    review: "Enfin une solution simple pour la corvée de linge. L'application est facile à utiliser et le service client est top.",
  },
  {
    name: "Alexandre G.",
    avatar: "https://picsum.photos/id/242/50/50",
    rating: 5,
    review: "Je suis client depuis 3 mois et je ne pourrais plus m'en passer. Un vrai gain de temps au quotidien.",
  },
  {
    name: "Léa R.",
    avatar: "https://picsum.photos/id/243/50/50",
    rating: 4,
    review: "Le repassage est parfait. Mes chemises sont impeccables. Je recommande ce service.",
  },
  {
    name: "Antoine F.",
    avatar: "https://picsum.photos/id/244/50/50",
    rating: 5,
    review: "Rapide, fiable et de grande qualité. Le QR code pour le suivi est une super idée. Très satisfait.",
  },
];

const ReviewCard = ({ review }: { review: (typeof reviews)[0] }) => {
  return (
    <Card className="w-[350px] flex-shrink-0 snap-center shadow-md border-primary/20 hover:border-primary/50 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <Avatar>
            <AvatarImage src={review.avatar} alt={review.name} data-ai-hint="person face" />
            <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{review.name}</p>
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-4 h-4",
                    i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{`"${review.review}"`}</p>
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
        <div className="flex min-w-max animate-marquee gap-6 py-4">
          {duplicatedReviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
