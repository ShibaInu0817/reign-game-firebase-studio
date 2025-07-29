
'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import type { StoryCard, Choice } from '@/types/story';
import { useIsMobile } from '@/hooks/use-mobile';

interface ScenarioCardProps {
  card: StoryCard | null;
  onChoice: (choice: Choice) => void;
  onContinue: () => void;
  loading: boolean;
  consequence: string | null;
}

const SWIPE_THRESHOLD = 80;

export function ScenarioCard({ card, onChoice, onContinue, loading, consequence }: ScenarioCardProps) {
  const isMobile = useIsMobile();
  const [x, setX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [choiceText, setChoiceText] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);

  useEffect(() => {
    // Reset card position when a new card is loaded or consequence is shown
    setX(0);
    setChoiceText(null);
  }, [card, consequence]);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isMobile || consequence || loading || !card) return;
    setIsDragging(true);
    startX.current = 'touches' in e ? e.touches[0].clientX : e.clientX;
    if (cardRef.current) {
      cardRef.current.style.transition = 'none';
    }
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isMobile || !isDragging || !card) return;
    if ('touches' in e) {
        // This should prevent the page from scrolling on mobile.
        e.preventDefault();
    }
    const currentX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const deltaX = currentX - startX.current;
    setX(deltaX);

    if (deltaX > SWIPE_THRESHOLD / 2) {
      setChoiceText(card.choices[1].text);
    } else if (deltaX < -SWIPE_THRESHOLD / 2) {
      setChoiceText(card.choices[0].text);
    } else {
      setChoiceText(null);
    }
  };

  const handleDragEnd = () => {
    if (!isMobile || !isDragging || !card) return;
    setIsDragging(false);

    if (cardRef.current) {
        cardRef.current.style.transition = 'transform 0.3s ease-out';
    }

    if (x > SWIPE_THRESHOLD) {
      onChoice(card.choices[1]);
    } else if (x < -SWIPE_THRESHOLD) {
      onChoice(card.choices[0]);
    } else {
      setX(0);
      setChoiceText(null);
    }
  };


  if (loading || !card) {
    return (
      <Card className="w-full max-w-md mx-auto border-border bg-card/50">
        <CardHeader className="p-0">
          <Skeleton className="aspect-video w-full rounded-t-lg" />
        </CardHeader>
        <CardContent className="p-6">
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6 mb-4" />
        </CardContent>
        <CardFooter className="flex justify-between p-6 pt-0">
          <Skeleton className="h-10 w-2/5" />
          <Skeleton className="h-10 w-2/5" />
        </CardFooter>
      </Card>
    );
  }
  
  const showConsequence = !!consequence;
  const rotation = isMobile ? x / 10 : 0;
  const opacity = isMobile ? Math.min(1, 1 - Math.abs(x) / (SWIPE_THRESHOLD * 2)) : 1;

  const handleCardClick = () => {
    if (showConsequence && isMobile) {
      onContinue();
    }
  };

  return (
    <div 
      className="relative w-full max-w-md h-[500px] flex items-center justify-center"
      onClick={handleCardClick}
    >
        {isMobile && (
            <div className={cn(
                "absolute inset-0 flex items-center justify-between px-4 text-2xl font-bold text-primary transition-opacity duration-200",
                choiceText ? "opacity-100" : "opacity-0"
            )}>
                <span className={cn(choiceText === card.choices[0].text ? 'opacity-100' : 'opacity-0' )}>{card.choices[0].text}</span>
                <span className={cn(choiceText === card.choices[1].text ? 'opacity-100' : 'opacity-0' )}>{card.choices[1].text}</span>
            </div>
        )}
        
        <Card
            ref={cardRef}
            className={cn(
                "w-full max-w-md mx-auto border-border bg-card/80 shadow-2xl shadow-black/30 absolute",
                isMobile && "cursor-grab active:cursor-grabbing",
                isMobile && showConsequence && "cursor-pointer"
            )}
            style={{
              transform: `translateX(${isMobile ? x : 0}px) rotate(${rotation}deg)`,
              opacity: showConsequence ? 1 : opacity,
              touchAction: 'none', // Prevents default touch behaviors like scrolling
            }}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
        >
          <CardHeader className="p-0 relative">
            {card.image && (
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <Image
                  src={card.image}
                  alt={card.text}
                  fill
                  className="object-cover pointer-events-none"
                  data-ai-hint={card.imageHint || 'survival'}
                  priority
                  sizes="(max-width: 640px) 100vw, 424px"
                />
              </div>
            )}
          </CardHeader>
          <CardContent className="p-6">
            <CardDescription className="text-lg text-foreground/90 font-body text-center min-h-[80px] flex items-center justify-center">
                {showConsequence ? (
                    <span className="italic text-accent animate-in fade-in">{consequence}</span>
                ) : (
                    <span style={{ opacity: isMobile ? Math.max(0, 1 - Math.abs(x) / SWIPE_THRESHOLD) : 1 }}>
                        {card.text}
                    </span>
                )}
            </CardDescription>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-center gap-4 p-6 pt-0 min-h-[64px]">
            {showConsequence ? (
                !isMobile && <Button onClick={onContinue} className="w-full animate-in fade-in">Continue</Button>
            ) : !isMobile && (
                <>
                    <Button onClick={() => onChoice(card.choices[0])} className="w-full" variant="outline">
                        {card.choices[0].text}
                    </Button>
                    <Button onClick={() => onChoice(card.choices[1])} className="w-full">
                        {card.choices[1].text}
                    </Button>
                </>
            )}
          </CardFooter>
        </Card>
    </div>
  );
}
