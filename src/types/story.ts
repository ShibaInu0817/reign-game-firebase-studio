export interface Stats {
  health: number;
  shelter: number;
  supplies: number;
  morale: number;
}

export type StatName = keyof Stats;

export interface Choice {
  text: string;
  effects: Partial<Stats>;
  consequence: string;
}

export interface StoryCard {
  id: number;
  text: string;
  image: string;
  imageHint: string;
  choices: [Choice, Choice];
}

export type Story = StoryCard[];
