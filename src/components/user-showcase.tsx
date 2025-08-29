
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Users } from 'lucide-react';

const users = [
  { id: 101, url: 'https://picsum.photos/id/101/128/128' },
  { id: 102, url: 'https://picsum.photos/id/102/128/128' },
  { id: 103, url: 'https://picsum.photos/id/103/128/128' },
  { id: 104, url: 'https://picsum.photos/id/104/128/128' },
  { id: 105, url: 'https://picsum.photos/id/105/128/128' },
  { id: 106, url: 'https://picsum.photos/id/106/128/128' },
  { id: 108, url: 'https://picsum.photos/id/108/128/128' },
  { id: 109, url: 'https://picsum.photos/id/109/128/128' },
  { id: 110, url: 'https://picsum.photos/id/110/128/128' },
  { id: 111, url: 'https://picsum.photos/id/111/128/128' },
  { id: 112, url: 'https://picsum.photos/id/112/128/128' },
  { id: 113, url: 'https://picsum.photos/id/113/128/128' },
  { id: 114, url: 'https://picsum.photos/id/114/128/128' },
  { id: 115, url: 'https://picsum.photos/id/115/128/128' },
  { id: 116, url: 'https://picsum.photos/id/116/128/128' },
  { id: 117, url: 'https://picsum.photos/id/117/128/128' },
  { id: 118, url: 'https://picsum.photos/id/118/128/128' },
  { id: 119, url: 'https://picsum.photos/id/119/128/128' },
  { id: 120, url: 'https://picsum.photos/id/120/128/128' },
  { id: 121, url: 'https://picsum.photos/id/121/128/128' },
];

const shuffle = (array: any[]) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

const MarqueeRow = ({ users, duration, reverse = false }: { users: any[], duration: string, reverse?: boolean }) => {
  const allUsers = [...users, ...users]; // Duplicate for seamless loop

  return (
    <div className={cn("flex min-w-max animate-marquee", reverse && "reverse-marquee")} style={{ '--duration': duration } as React.CSSProperties}>
      {allUsers.map((user, index) => (
        <div key={index} className="px-2 flex-shrink-0">
          <Image
            src={user.url}
            alt={`User ${user.id}`}
            width={128}
            height={128}
            className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full border-4 border-white shadow-md transform transition-transform duration-300 hover:scale-110 hover:shadow-xl hover:z-10"
            data-ai-hint="person face"
          />
        </div>
      ))}
    </div>
  );
};

export function UserShowcase() {
  const [activeUsers, setActiveUsers] = useState(1342);
  const [shuffledRows, setShuffledRows] = useState<{ row1: any[], row2: any[], row3: any[] } | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers(prev => prev + Math.floor(Math.random() * 3) - 1);
    }, 2000);

    setShuffledRows({
        row1: shuffle([...users]).slice(0, 10),
        row2: shuffle([...users]).slice(0, 10),
        row3: shuffle([...users]).slice(0, 10),
    });

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-8 md:py-12 bg-primary/5 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
          Rejoignez des milliers de clients satisfaits
        </h2>
        <p className="max-w-2xl mx-auto text-muted-foreground mt-4 mb-8">
          Découvrez pourquoi ils nous confient ce qu'ils ont de plus précieux.
        </p>
      </div>
      <div className="relative space-y-4">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10" />
        {shuffledRows ? (
          <>
            <MarqueeRow users={shuffledRows.row1} duration="30s" />
            <MarqueeRow users={shuffledRows.row2} duration="40s" reverse={true} />
            <MarqueeRow users={shuffledRows.row3} duration="25s" />
          </>
        ) : (
            // You can render a placeholder or nothing here until the client-side shuffle is done
            null
        )}
      </div>
      <div className="container mx-auto px-4 md:px-6 text-center mt-12">
        <div className="inline-flex items-center bg-white shadow-lg rounded-full p-2 pr-6">
            <div className="relative mr-4">
                <Users className="w-12 h-12 text-white bg-green-500 rounded-full p-2 border-2 border-white"/>
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
                </span>
            </div>
            <div>
                <p className="text-2xl font-bold text-foreground tracking-tighter">{activeUsers.toLocaleString('fr-FR')}</p>
                <p className="text-sm text-muted-foreground">utilisateurs actifs en ce moment</p>
            </div>
        </div>
      </div>
    </section>
  );
}