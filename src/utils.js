import { roll } from "@airjp73/dice-notation";

const diceRegex = /#\{(.*?)\}/g;

export const rollDices = (string) =>
  string.replace(diceRegex, (_, string) => roll(string).result);

export const getRandomFromArray = (array) =>
  array[Math.floor(Math.random() * array.length)];

export const getFromArrayWithRoll = (array, roll) =>
  array
    .sort((a, b) => b.rollAtLeast - a.rollAtLeast)
    .find(({ rollAtLeast }) => roll >= rollAtLeast);
