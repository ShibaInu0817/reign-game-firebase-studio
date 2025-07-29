import type { Story } from "@/types/story";

export const story: Story = [
  {
    id: 1,
    text: "You find a can of beans. The label is peeling, but it seems edible.",
    image: "/reign-game-firebase-studio/images/story/beans.png",
    imageHint: "canned food",
    choices: [
      {
        text: "Eat it",
        effects: { supplies: 5, health: 10, morale: 5 },
        consequence:
          "The beans are surprisingly delicious. You feel replenished.",
      },
      {
        text: "Save it for later",
        effects: { supplies: 0, health: -2, morale: -2 },
        consequence:
          "Your stomach rumbles, but you have supplies for another day.",
      },
    ],
  },
  {
    id: 2,
    text: "A rickety bridge stands between you and the other side of a chasm. It's the only way across.",
    image: "/reign-game-firebase-studio/images/story/bridge.webp",
    imageHint: "rickety bridge",
    choices: [
      {
        text: "Cross carefully",
        effects: { health: -10, shelter: 5, morale: 5 },
        consequence: "You made it across, but the stress took a toll.",
      },
      {
        text: "Find another way",
        effects: { supplies: -10, health: -5, morale: -5 },
        consequence: "The detour cost you precious time and supplies.",
      },
    ],
  },
  {
    id: 3,
    text: "You find a patch of unfamiliar berries. They look juicy and tempting.",
    image: "https://placehold.co/600x400.png",
    imageHint: "wild berries",
    choices: [
      {
        text: "Risk it and eat them",
        effects: { supplies: 5, health: -20, morale: -10 },
        consequence: "A terrible mistake. The berries were poisonous.",
      },
      {
        text: "Ignore them",
        effects: { morale: -5 },
        consequence: "You play it safe, but the hunger gnaws at you.",
      },
    ],
  },
  {
    id: 4,
    text: "You find a pristine-looking bottle of water by a stream.",
    image: "https://placehold.co/600x400.png",
    imageHint: "water bottle stream",
    choices: [
      {
        text: "Drink it",
        effects: { health: 15, morale: 10 },
        consequence: "Clean, refreshing water. A rare luxury.",
      },
      {
        text: "Purify it first",
        effects: { supplies: -5, health: 10, morale: 5 },
        consequence: "It tastes a bit funny, but at least you know it's safe.",
      },
    ],
  },
  {
    id: 5,
    text: "The nights are getting colder. You need better shelter.",
    image: "https://placehold.co/600x400.png",
    imageHint: "cold night",
    choices: [
      {
        text: "Improve your current shelter",
        effects: { supplies: -10, shelter: 20, health: 5 },
        consequence: "Your shelter is now much warmer and more secure.",
      },
      {
        text: "Look for a cave",
        effects: { health: -5, shelter: 15, morale: -5 },
        consequence:
          "You find a small cave, offering good protection from the elements.",
      },
    ],
  },
  {
    id: 6,
    text: "You hear a noise in the distance. It could be anything.",
    image: "https://placehold.co/600x400.png",
    imageHint: "forest noise",
    choices: [
      {
        text: "Investigate",
        effects: { health: -10, morale: -5 },
        consequence: "You stumble and hurt your ankle. It was just the wind.",
      },
      {
        text: "Hide and wait",
        effects: { shelter: 5, morale: -10 },
        consequence:
          "You waste time hiding from nothing. The paranoia is setting in.",
      },
    ],
  },
  {
    id: 7,
    text: "Your fire is dying down. It's your only source of warmth and safety.",
    image: "https://placehold.co/600x400.png",
    imageHint: "dying fire",
    choices: [
      {
        text: "Gather more wood",
        effects: { supplies: -5, health: -5, morale: 10 },
        consequence:
          "The fire roars back to life, bringing comfort and security.",
      },
      {
        text: "Huddle for warmth",
        effects: { health: -10, shelter: -5, morale: -5 },
        consequence: "A long, cold night. You barely slept.",
      },
    ],
  },
];
