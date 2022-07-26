import { roll } from "@airjp73/dice-notation";
import data from "./generator.json";

import { getFromArrayWithRoll, getRandomFromArray, rollDices } from "./utils";

const { crimes, deadOrAlive, backgrounds, bonus, horse, guns, hats } = data;
const { first, last, nick } = data.name;

const BONUS_ITEM = "#{BONUS_ITEM}";
const BONUS_SKILL = "#{BONUS_SKILL}";

const generateName = () =>
  [
    getRandomFromArray(first),
    getRandomFromArray(nick),
    getRandomFromArray(last),
  ].join(" ");

const generateOutlaw = () => [
  getRandomFromArray(data.outlaw.with),
  rollDices(getRandomFromArray(data.outlaw.and)),
];

const generateCrime = () => {
  const adjective = roll("1d12").result;
  const noun = roll("1d12").result;

  const reward = (adjective + noun) * 10;
  const crime = [crimes.adjective[adjective - 1], crimes.noun[noun - 1]].join(
    " "
  );

  return {
    reward,
    crime,
  };
};

const generateDeadOrAlive = () =>
  getFromArrayWithRoll(deadOrAlive, roll("1d4").result).name;

const generateBonusSkill = () => getRandomFromArray(bonus.skill);
const generateBonusItem = () => {
  const item = getRandomFromArray(bonus.item);

  return [item.name, getRandomFromArray(item.variants || [])]
    .filter(Boolean)
    .map(rollDices)
    .join(" ");
};

const generateBackgroundSkill = (array) => {
  const skill = getRandomFromArray(array);
  if (skill === BONUS_SKILL) {
    return generateBonusSkill();
  }

  return skill;
};

const generateBackgroundItem = (array) => {
  const item = getRandomFromArray(array);

  if (item === BONUS_ITEM) {
    return generateBonusItem();
  }

  return rollDices(item);
};

const generateBackground = () => {
  const { name, phrasing, skills, items } = getRandomFromArray(backgrounds);
  return {
    name,
    phrasing,
    skills: [generateBackgroundSkill(skills), generateBackgroundSkill(skills)],
    items: [generateBackgroundItem(items), generateBackgroundItem(items)],
  };
};

const generateHorse = () => {
  const { type, notes } = getFromArrayWithRoll(
    horse.types,
    roll("1d20").result
  );
  const coat = getRandomFromArray(horse.coat);
  const likes = getRandomFromArray(horse.likes);

  return {
    type,
    notes: rollDices(notes),
    coat,
    likes,
  };
};

const generateGun = () => {
  const { rolls } = roll("2d6");
  const [first] = rolls;
  const [tens, units] = first;

  return getFromArrayWithRoll(guns, parseInt(`${tens}${units}`)).name;
};

const generateHat = () => {
  const color = getRandomFromArray(hats.colors);
  const material = getRandomFromArray(hats.materials);
  const condition = getRandomFromArray(hats.conditions);

  return {
    color,
    material,
    condition,
  };
};

export const generateCharacter = () => {
  const name = generateName();
  const outlaw = generateOutlaw();
  const { crime, reward } = generateCrime();
  const deadOrAlive = generateDeadOrAlive();
  const background = generateBackground();

  const bonus = {
    skill: generateBonusSkill(),
    item: generateBonusItem(),
  };

  const horse = generateHorse();
  const gun = generateGun();
  const hat = generateHat();

  const grit = roll("1d4-1d4").result;
  const slick = roll("1d4-1d4").result;
  const wits = roll("1d4-1d4").result;
  const luck = roll("1d4-1d4").result;
  const hp = roll(`1d6+${grit}`).result;

  const silver = roll(
    `${[grit, slick, wits, luck].filter((stat) => stat < 0).length}d10`
  ).result;

  return {
    name,
    outlaw,
    crime,
    reward,
    deadOrAlive,
    background,
    bonus,
    horse,
    gun,
    hat,
    grit,
    slick,
    wits,
    luck,
    hp: hp > 0 ? hp : 1,
    silver,
  };
};
