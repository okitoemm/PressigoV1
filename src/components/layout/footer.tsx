
import Link from 'next/link';
import { WashingMachine, Twitter, Facebook, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground border-t">
      <div className="container mx-auto py-12 md:py-16 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
              <WashingMachine className="h-8 w-8" />
              <span className="font-headline">LAVOO Express</span>
            </Link>
            <p className="text-sm text-primary-foreground/80">
              Votre service de pressing et de laverie de confiance, livré à votre porte en 24h.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Liens Rapides</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/order" className="hover:underline text-primary-foreground/80">Commander</Link></li>
              <li><Link href="/#services" className="hover:underline text-primary-foreground/80">Nos Services</Link></li>
              <li><Link href="/#how-it-works" className="hover:underline text-primary-foreground/80">Comment ça marche</Link></li>
              <li><Link href="/account" className="hover:underline text-primary-foreground/80">Mon Compte</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Légal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy-policy" className="hover:underline text-primary-foreground/80">Politique de confidentialité</Link></li>
              <li><Link href="/terms-of-service" className="hover:underline text-primary-foreground/80">Conditions d'utilisation</Link></li>
              <li><Link href="/legal-notice" className="hover:underline text-primary-foreground/80">Mentions légales</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-bold text-lg mb-2">Inscrivez-vous à notre newsletter</h3>
            <p className="text-sm text-primary-foreground/80">Recevez nos promotions et actualités en avant-première.</p>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="email" placeholder="Votre e-mail" className="bg-white/90 text-foreground placeholder:text-muted-foreground" />
              <Button type="submit" variant="secondary" className="bg-white text-primary hover:bg-white/90">S'inscrire</Button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary-foreground/20 flex flex-col md:flex-row items-center justify-between text-sm">
           <p className="text-primary-foreground/80 mb-4 md:mb-0">
            © {new Date().getFullYear()} LAVOO Express. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-primary-foreground/80 hover:text-white transition-colors">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-primary-foreground/80 hover:text-white transition-colors">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-primary-foreground/80 hover:text-white transition-colors">
              <Instagram className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
