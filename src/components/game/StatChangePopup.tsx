
import React from 'react';
import type { Stats, StatName } from '@/types/story';
import { cn } from '@/lib/utils';

interface StatChangePopupProps {
  effects: Partial<Stats>;
}

const statOrder: StatName[] = ['health', 'shelter', 'supplies', 'morale'];

export function StatChangePopup({ effects }: StatChangePopupProps) {
  return (
    <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-4 gap-4 pointer-events-none">
      {statOrder.map((key) => {
        const value = effects[key];
        const isPositive = value && value > 0;
        const isNegative = value && value < 0;

        return (
          <div key={key} className="relative w-full h-full flex items-center justify-center">
            {value ? (
              <span
                className={cn(
                  'absolute text-3xl font-bold animate-float-up',
                  isPositive && 'text-green-400',
                  isNegative && 'text-red-500'
                )}
              >
                {isPositive ? `+${value}` : value}
              </span>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
