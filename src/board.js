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

function getPiece(count, units, value, x, y) {
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
      count[key] += 1
      return key;
    }
  }

  // empty
  return null;
}

export function getBoard() {
  const count = {
    [KEY_CHILD]: 0,
    [KEY_FEMALE]: 0,
    [KEY_MALE]: 0,
  }

  const unitsBySpawnCost = Object.entries(CELLS).filter(
    ([_, { spawnCost }]) => typeof spawnCost !== 'undefined',
  ).sort(
    ([_, a], [__, b]) => b.spawnCost - a.spawnCost
  );

  const board = Array(BOARD_DIMEN).fill(null).map(
    (_, y) => Array(BOARD_DIMEN).fill(null).map(
      (__, x) => getPiece(count, unitsBySpawnCost , Math.random() + BOARD_PROBABILITY_SHIFT, x, y)
    )
  );

  // in the rare case we don't have a female cell at all,
  // spawn one somewhere on the first row non-wall row
  if (!count[KEY_FEMALE]) {
    console.debug('female cell spawned manually');
    const row = 1;
    for (const cell of board[row]) {
      if (cell) {
        continue;
      }

      // FIXME: SPAWN HERE
    }

    count[KEY_FEMALE] = 1;
  }

  console.debug(count);

  return {
    board,
    count,
  };
}
