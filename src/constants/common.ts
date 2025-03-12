import { Card } from "../App";

export const deck: Card[] = [
  { id: 1, type: 'enemy', value: 2 },
  { id: 2, type: 'enemy', value: 3 },
  { id: 3, type: 'enemy', value: 4 },
  { id: 4, type: 'enemy', value: 5 },
  { id: 5, type: 'enemy', value: 6 },
  { id: 6, type: 'enemy', value: 7 },
  { id: 7, type: 'enemy', value: 8 },
  { id: 8, type: 'enemy', value: 9 },
  { id: 9, type: 'enemy', value: 10 },
  { id: 10, type: 'enemy', value: 11 },
  { id: 11, type: 'enemy', value: 12 },
  { id: 12, type: 'enemy', value: 13 },
  { id: 13, type: 'enemy', value: 2 },
  { id: 14, type: 'enemy', value: 3 },
  { id: 15, type: 'enemy', value: 4 },
  { id: 16, type: 'enemy', value: 5 },
  { id: 17, type: 'enemy', value: 6 },
  { id: 18, type: 'enemy', value: 7 },
  { id: 19, type: 'enemy', value: 8 },
  { id: 20, type: 'enemy', value: 9 },
  { id: 21, type: 'enemy', value: 10 },
  { id: 22, type: 'enemy', value: 11 },
  { id: 23, type: 'enemy', value: 12 },
  { id: 24, type: 'enemy', value: 13 },
  { id: 25, type: 'weapon', value: 2 },
  { id: 26, type: 'weapon', value: 3 },
  { id: 27, type: 'weapon', value: 4 },
  { id: 28, type: 'weapon', value: 5 },
  { id: 29, type: 'weapon', value: 6 },
  { id: 30, type: 'weapon', value: 7 },
  { id: 31, type: 'weapon', value: 8 },
  { id: 32, type: 'weapon', value: 9 },
  { id: 33, type: 'weapon', value: 10 },
  { id: 34, type: 'potion', value: 2 },
  { id: 35, type: 'potion', value: 3 },
  { id: 36, type: 'potion', value: 4 },
  { id: 37, type: 'potion', value: 5 },
  { id: 38, type: 'potion', value: 6 },
  { id: 39, type: 'potion', value: 7 },
  { id: 40, type: 'potion', value: 8 },
  { id: 41, type: 'potion', value: 9 },
  { id: 42, type: 'potion', value: 10 },
  { id: 43, type: 'enemy', value: 14 },
  { id: 44, type: 'enemy', value: 14 },
]

export enum classes {
  none = 'None',
  berserker = 'Berserker',
  healer = 'Healer',
  blacksmith = 'Blacksmith'
}

export const characterList = [
  classes.none,
  classes.berserker,
  classes.healer,
  classes.blacksmith
]

export const classDescription = {
  [classes.none]: 'No buffs or disadvantages',
  [classes.berserker]: 'Buff: +2 to bare handed attacks, Disadvantages: cannot run from room with all enemies',
  [classes.healer]: 'Buff: +1 hp every room, Disadvantages: max hp -2',
  [classes.blacksmith]: 'Buff: +2 weapon durability every room, Disadvantages: potions 1/2 heal',
}