
"use client";

import { useGameLogic } from '@/hooks/useGameLogic';
import { StatsDisplay } from '@/components/game/StatsDisplay';
import { ScenarioCard } from '@/components/game/ScenarioCard';
import { GameOverDialog } from '@/components/game/GameOverDialog';
import { StatChangePopup } from '@/components/game/StatChangePopup';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Home } from 'lucide-react';

export default function GamePage() {
  const {
    stats,
    daysSurvived,
    currentCard,
    gameOver,
    gameOverMessage,
    lastChoiceEffects,
    lastConsequence,
    handleChoice,
    restartGame,
    proceedToNextDay,
  } = useGameLogic();

  const loading = !currentCard;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 bg-background text-foreground relative">
      <div className="absolute top-4 left-4">
        <Button asChild variant="outline" size="icon">
          <Link href="/">
            <Home className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </Link>
        </Button>
      </div>
      
      <div className="w-full max-w-3xl flex flex-col items-center gap-8">
        <div className="text-center">
            <h1 className="font-headline text-5xl text-primary">Day {daysSurvived}</h1>
        </div>

        <div className="relative w-full">
          <StatsDisplay stats={stats} />
          {lastChoiceEffects && <StatChangePopup effects={lastChoiceEffects} />}
        </div>
        
        <div className="w-full min-h-[480px] flex items-center justify-center">
          <ScenarioCard
            card={currentCard}
            onChoice={handleChoice}
            onContinue={proceedToNextDay}
            loading={loading}
            consequence={lastConsequence}
          />
        </div>
      </div>

      <GameOverDialog
        open={gameOver}
        daysSurvived={daysSurvived}
        message={gameOverMessage}
        onRestart={restartGame}
      />
    </main>
  );
}
