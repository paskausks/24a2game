import {
  BOARD_DIMEN,
  BOARD_PROBABILITY_SHIFT,
  CELLS,
  KEY_CHILD,
  KEY_FEMALE,
  KEY_MALE,
  KEY_WALL
} from './constants';

const wallConditions = [
  (x, y) => x === 0 || y === 0,
  (x, y) => x === BOARD_DIMEN - 1 || y === BOARD_DIMEN - 1,
]

function getPiece(units, value, x, y) {
  // wall
  if (wallConditions.some(condFn => condFn(x, y))) {
    return KEY_WALL;
  }

  // middle zone
  const midRatio = 0.33;
  const midRange = BOARD_DIMEN * midRatio;
  const midZoneBegin = (BOARD_DIMEN - midRange) / 2;
  const midZoneEnd = midZoneBegin + midRange;

  if (x >= midZoneBegin && x <= midZoneEnd && y >= midZoneBegin && y <= midZoneEnd) {
    return null;
  }

  // unit
  for (const [key, { spawnCost }] of units) {
    if (value >= spawnCost) {
      return key;
    }
  }

  // empty
  return null;
}

export function getBoard() {
  const unitsBySpawnCost = Object.entries(CELLS).filter(
    ([_, { spawnCost }]) => typeof spawnCost !== 'undefined',
  ).sort(
    ([_, a], [__, b]) => b.spawnCost - a.spawnCost
  );

  const board = Array(BOARD_DIMEN).fill(null).map(
    (_, x) => Array(BOARD_DIMEN).fill(null).map(
      (__, y) => getPiece(unitsBySpawnCost , Math.random() + BOARD_PROBABILITY_SHIFT, x, y)
    )
  );

  return board;
}
