
"use client";

import { useState, useCallback, useEffect } from 'react';
import { story } from '@/lib/story';
import type { Stats, StoryCard, Choice, StatName } from '@/types/story';

const INITIAL_STATS: Stats = {
  health: 50,
  shelter: 50,
  supplies: 50,
  morale: 50,
};

const MAX_STAT = 100;

export function useGameLogic() {
  const [stats, setStats] = useState<Stats>(INITIAL_STATS);
  const [daysSurvived, setDaysSurvived] = useState(0);
  const [currentCard, setCurrentCard] = useState<StoryCard | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [gameOverMessage, setGameOverMessage] = useState('');
  const [usedCardIds, setUsedCardIds] = useState<Set<number>>(new Set());
  const [lastChoiceEffects, setLastChoiceEffects] = useState<Partial<Stats> | null>(null);
  const [lastConsequence, setLastConsequence] = useState<string | null>(null);


  const getNextCard = useCallback(() => {
    const availableCards = story.filter((card) => !usedCardIds.has(card.id));
    
    if (availableCards.length === 0) {
      const resetUsedIds = new Set(currentCard ? [currentCard.id] : []);
      setUsedCardIds(resetUsedIds);
      const newAvailableCards = story.filter((card) => !resetUsedIds.has(card.id));
      const randomIndex = Math.floor(Math.random() * newAvailableCards.length);
      return newAvailableCards[randomIndex];
    }
    
    const randomIndex = Math.floor(Math.random() * availableCards.length);
    return availableCards[randomIndex];
  }, [usedCardIds, currentCard]);

  const startGame = useCallback(() => {
    setStats(INITIAL_STATS);
    setDaysSurvived(0);
    setGameOver(false);
    setGameOverMessage('');
    const firstCard = story[0];
    setCurrentCard(firstCard);
    setUsedCardIds(new Set([firstCard.id]));
    setLastChoiceEffects(null);
    setLastConsequence(null);
  }, []);
  
  const proceedToNextDay = useCallback(() => {
    setLastConsequence(null);
    const nextCard = getNextCard();
    setCurrentCard(nextCard);
    setUsedCardIds((prev) => new Set(prev).add(nextCard.id));
  }, [getNextCard]);

  const handleChoice = useCallback((choice: Choice) => {
    if (gameOver || lastConsequence) return;

    setLastChoiceEffects(choice.effects);
    setLastConsequence(choice.consequence);
    
    setTimeout(() => setLastChoiceEffects(null), 2000);

    const newStats: Stats = { ...stats };
    let isGameOver = false;
    let endMessage = '';

    (Object.keys(choice.effects) as StatName[]).forEach((key) => {
      newStats[key] = Math.min(MAX_STAT, newStats[key] + (choice.effects[key] || 0));
      if (newStats[key] <= 0) {
        newStats[key] = 0;
        isGameOver = true;
        endMessage = `Your ${key} ran out...`;
      }
    });

    setStats(newStats);

    if (isGameOver) {
      setGameOver(true);
      setGameOverMessage(endMessage);
    } else {
      setDaysSurvived((prev) => prev + 1);
    }
  }, [stats, gameOver, lastConsequence]);

  useEffect(() => {
    startGame();
  }, [startGame]);

  return {
    stats,
    daysSurvived,
    currentCard,
    gameOver,
    gameOverMessage,
    lastChoiceEffects,
    lastConsequence,
    handleChoice,
    restartGame: startGame,
    proceedToNextDay,
  };
}
