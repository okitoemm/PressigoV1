
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Star, StarHalf, User, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const validZipCodes = ["75001", "75002", "75003", "75004", "75005", "75006", "75007", "75008"];

export function HeroSection() {
    const [zipCode, setZipCode] = useState('');
    const [isChecking, setIsChecking] = useState(false);
    const [checkResult, setCheckResult] = useState<'idle' | 'success' | 'error'>('idle');

    const handleZipCheck = (e: React.FormEvent) => {
        e.preventDefault();
        if (!zipCode || zipCode.length !== 5) {
            setCheckResult('error');
            return;
        }
        setIsChecking(true);
        setCheckResult('idle');

        setTimeout(() => {
            if (validZipCodes.includes(zipCode)) {
                setCheckResult('success');
            } else {
                setCheckResult('error');
            }
            setIsChecking(false);
        }, 1000);
    };

  return (
    <section className="w-full bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 items-center gap-16 py-12 md:py-24 min-h-[70vh] md:min-h-[80vh]">
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
          <Badge variant="secondary">
            Plateforme n°1 en France
          </Badge>
          <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tighter">
            Service de laverie & pressing en 24h
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-md">
            sur la base de plus de 200 000 avis dans 14 pays
          </p>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              <Star className="w-5 h-5 text-yellow-300 fill-yellow-300" />
              <Star className="w-5 h-5 text-yellow-300 fill-yellow-300" />
              <Star className="w-5 h-5 text-yellow-300 fill-yellow-300" />
              <Star className="w-5 h-5 text-yellow-300 fill-yellow-300" />
              <StarHalf className="w-5 h-5 text-yellow-300 fill-yellow-300" />
            </div>
            <span className="font-semibold">4.7/5</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <Button size="lg" asChild className="bg-white text-primary hover:bg-white/90 font-bold text-lg">
              <Link href="/order">Réservez dès maintenant</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="bg-transparent text-white border-white hover:bg-white hover:text-primary font-bold text-lg">
              <Link href="/login">
                <User className="mr-2 h-5 w-5" />
                Se connecter
              </Link>
            </Button>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex -space-x-2">
              <Image className="inline-block h-8 w-8 rounded-full ring-2 ring-primary-foreground" src="https://picsum.photos/id/1027/50/50" data-ai-hint="person face" width={32} height={32} alt="Client 1" />
              <Image className="inline-block h-8 w-8 rounded-full ring-2 ring-primary-foreground" src="https://picsum.photos/id/1028/50/50" data-ai-hint="person face" width={32} height={32} alt="Client 2" />
              <Image className="inline-block h-8 w-8 rounded-full ring-2 ring-primary-foreground" src="https://picsum.photos/id/1029/50/50" data-ai-hint="person face" width={32} height={32} alt="Client 3" />
              <Image className="inline-block h-8 w-8 rounded-full ring-2 ring-primary-foreground" src="https://picsum.photos/id/1031/50/50" data-ai-hint="person face" width={32} height={32} alt="Client 4" />
            </div>
            <p className="text-sm text-primary-foreground/90">Plus de 200 000 clients satisfaits !</p>
          </div>
          <form onSubmit={handleZipCheck} className="w-full max-w-md mt-4 p-4 bg-white/20 rounded-lg space-y-2">
            <label className="font-semibold">Vérifiez si nous livrons chez vous :</label>
            <div className="flex items-center gap-2">
                <Input 
                    placeholder="Entrez votre code postal" 
                    className="bg-white text-foreground placeholder:text-muted-foreground flex-grow"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                />
                <Button type="submit" variant="secondary" className="bg-white text-primary hover:bg-white/90" disabled={isChecking}>
                    {isChecking ? <Loader2 className="w-5 h-5 animate-spin" /> : "Vérifier"}
                </Button>
            </div>
            {checkResult === 'success' && (
                <p className="text-sm flex items-center gap-1 text-green-200"><CheckCircle2 className="w-4 h-4"/> Bonne nouvelle ! Nous livrons dans votre zone.</p>
            )}
            {checkResult === 'error' && (
                <p className="text-sm flex items-center gap-1 text-yellow-200"><XCircle className="w-4 h-4"/>Désolé, ce code postal n'est pas valide ou pas encore desservi.</p>
            )}
          </form>
        </div>
        <div className="hidden md:flex justify-center">
            <Image
                src="/images/imagehero/imagehero1.png"
                alt="Happy customer receiving laundry"
                width={650}
                height={650}
                className="rounded-lg"
                data-ai-hint="happy customer"
            />
        </div>
      </div>
    </section>
  );
}
