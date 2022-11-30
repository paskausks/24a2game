export const BOARD_DIMEN = 24;
export const BOARD_PROBABILITY_SHIFT = -0.1;
export const BOARD_DEFAULT_CELL_COLOR = Color.Gray;

export const MONSTER_COLOR = Color.Indigo;

export const PENALTY_SACRIFICE = 0.8;
export const PENALTY_FEED = 0.66;

export const KEY_MALE = 'M';
export const KEY_FEMALE = 'F';
export const KEY_CHILD = 'C';
export const KEY_WALL = 'W';

export const CELLS = {
  [KEY_FEMALE]: {
    color: Color.Red,
    value: 1,
    spawnCost: 0.89,
    monsterStop: 3,
  },
  [KEY_CHILD]: {
    color: Color.Yellow,
    value: 0.8,
    spawnCost: 0.85,
    monsterStop: 2,
  },
  [KEY_MALE]: {
    color: Color.Blue,
    value: 0.6,
    spawnCost: 0.7,
    monsterStop: 1,
  },
  [KEY_WALL]: {
    color: Color.Black,
  },
};
