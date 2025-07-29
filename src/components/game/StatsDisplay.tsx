import { Heart, Home, Package, Smile } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import type { Stats, StatName } from '@/types/story';

const statConfig: Record<StatName, { icon: React.ElementType; color: string; label: string }> = {
  health: { icon: Heart, color: 'bg-chart-1', label: 'Health' },
  shelter: { icon: Home, color: 'bg-chart-2', label: 'Shelter' },
  supplies: { icon: Package, color: 'bg-chart-4', label: 'Supplies' },
  morale: { icon: Smile, color: 'bg-chart-5', label: 'Morale' },
};

interface StatsDisplayProps {
  stats: Stats;
}

export function StatsDisplay({ stats }: StatsDisplayProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
      {(Object.keys(stats) as StatName[]).map((key) => {
        const config = statConfig[key];
        const Icon = config.icon;
        return (
          <div key={key} className="p-3 bg-card/50 rounded-lg shadow-md border border-border transition-all hover:border-primary/50 flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Icon className="h-6 w-6 text-primary" />
                    <span className="font-body text-lg text-primary-foreground">{config.label}</span>
                </div>
                <span className="font-mono text-2xl font-bold text-accent">{stats[key]}</span>
            </div>
            <Progress value={stats[key]} indicatorClassName={config.color} />
          </div>
        );
      })}
    </div>
  );
}
