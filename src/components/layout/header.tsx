
"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, WashingMachine, User, ChevronDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';


export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/order', label: 'Commander' },
    { href: '/#services', label: 'Services' },
    { href: '/#how-it-works', label: 'Comment ça marche' },
    { href: '/blog', label: 'Blog' },
  ];

  const proServicesLinks = [
      { href: "/pro/hotel", label: "Hôtels & Spas" },
      { href: "/pro/restaurant", label: "Restaurants" },
      { href: "/pro/construction", label: "Construction & BTP" },
      { href: "/pro/airbnb", label: "Conciergerie & Airbnb" },
      { href: "/pro/appartement", label: "Appartements & Copropriétés" },
      { href: "/pro/autres", label: "Autres business" },
  ]

  return (
    <header className="bg-card/80 backdrop-blur-lg sticky top-0 z-40 border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
          <WashingMachine className="h-7 w-7 text-primary" />
          <span className="font-headline">LAVOO express</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-foreground/80 hover:text-primary transition-colors">
              {link.label}
            </Link>
          ))}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-primary px-0 hover:bg-transparent">
                    Services Pro
                    <ChevronDown className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {proServicesLinks.map(link => (
                        <DropdownMenuItem key={link.href} asChild><Link href={link.href}>{link.label}</Link></DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </nav>

        <div className="flex items-center gap-2">
           <Button variant="ghost" size="icon" asChild>
            <Link href="/account">
              <User className="h-5 w-5" />
              <span className="sr-only">Compte</span>
            </Link>
          </Button>
          <Button asChild className="hidden md:flex">
            <Link href="/order">Passer une commande</Link>
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Ouvrir le menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="p-6">
                <Link href="/" className="flex items-center gap-2 mb-8 font-bold text-xl text-primary">
                  <WashingMachine className="h-7 w-7 text-primary" />
                  <span className="font-headline">LAVOO Express</span>
                </Link>
                <nav className="flex flex-col gap-6 text-lg font-medium">
                  {navLinks.map((link) => (
                     <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  ))}
                   <p className="font-semibold text-foreground/80 pt-2 border-t">Services Pro</p>
                    <div className="flex flex-col gap-4 pl-4">
                        {proServicesLinks.map(link => (
                             <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="hover:text-primary transition-colors text-base">{link.label}</Link>
                        ))}
                    </div>
                   <Link href="/login" onClick={() => setIsOpen(false)} className="hover:text-primary transition-colors pt-4 border-t">
                      Se connecter / S'inscrire
                    </Link>
                     <Link href="/account" onClick={() => setIsOpen(false)} className="hovertext-primary transition-colors">
                      Mon Compte
                    </Link>
                </nav>
                <Button asChild className="w-full mt-8" onClick={() => setIsOpen(false)}>
                  <Link href="/order">Passer une commande</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
