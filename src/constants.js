export const BOARD_DIMEN = 24;
export const BOARD_FPS = 24;
export const BOARD_PROBABILITY_SHIFT = -0.1;
export const BOARD_DEFAULT_CELL_COLOR = Color.Gray;
export const BOARD_SELECT_COLOR = Color.Green;

export const MONSTER_COLOR = Color.Indigo;
export const MONSTER_THROTTLE = 10;

export const PENALTY_SACRIFICE = 1;
export const PENALTY_FEED = 3;

export const KEY_MALE = 'M';
export const KEY_FEMALE = 'F';
export const KEY_CHILD = 'C';
export const KEY_WALL = 'W';

export const EVAC_COOLDOWN_MS = 1500;
export const LOSSES_MAX = 10;
export const EVACS_MIN = 25;

export const CELLS = {
  [KEY_FEMALE]: {
    label: 'Female',
    color: Color.Red,
    colorHex: 'FF0000',
    value: 2,
    spawnCost: 0.89,
  },
  [KEY_CHILD]: {
    label: 'Child',
    color: Color.Yellow,
    colorHex: 'FFD700',
    value: 0.5,
    spawnCost: 0.85,
  },
  [KEY_MALE]: {
    label: 'Male',
    color: Color.Blue,
    colorHex: '0000FF',
    value: 0.3,
    spawnCost: 0.7,
  },
  [KEY_WALL]: {
    color: Color.Black,
  },
};
