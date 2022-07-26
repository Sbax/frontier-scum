import { roll } from "@airjp73/dice-notation";

const diceRegex = /#\{(.*?)\}/g;

export const rollDices = (string) =>
  string.replace(diceRegex, (_, string) => roll(string).result);

export const getRandomFromArray = (array, andRemove = false) => {
  const random = Math.floor(Math.random() * array.length);
  if (andRemove) {
    return array.splice(random, 1)[0];
  }

  return array[random];
};

export const getFromArrayWithRoll = (array, roll) =>
  array
    .sort((a, b) => b.rollAtLeast - a.rollAtLeast)
    .find(({ rollAtLeast }) => roll >= rollAtLeast);
