import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Gamepad2 } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-background text-foreground">
      <div className="text-center">
        <h1 className="font-headline text-5xl md:text-7xl font-bold text-primary">
          Survival Swipe
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground">
          Your adventure of choices begins now.
        </p>
      </div>
      <div className="mt-12">
        <Button asChild size="lg" className="font-headline text-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow">
          <Link href="/game">
            <Gamepad2 className="mr-2 h-6 w-6" />
            Start Adventure
          </Link>
        </Button>
      </div>
       <footer className="absolute bottom-4 text-center text-muted-foreground text-sm">
        <p>Made for the wasteland wanderer in all of us.</p>
      </footer>
    </main>
  );
}
