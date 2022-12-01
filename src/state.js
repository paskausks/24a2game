import { getBoard } from './board';
import { BOARD_DIMEN } from './constants';
import { getRandomVector } from './utils';

export const STATE_KEY = 'NESTEVAC';

export function resetState(game) {
  const halfBoard = Math.round(BOARD_DIMEN / 2);

  game[STATE_KEY] = {
    stopped: false,
    score: 0,
    losses: 0,
    step: 0,
    created: new Date().getTime(),
    lastEvac: 0,
    selectedCell: null,
    monster: {
      pos: Array(2).fill(halfBoard),
      vector: getRandomVector(),
    },
    board: getBoard(),
  };
}

export function getState(game) {
  return game[STATE_KEY];
}

export function setState(game, partialState) {
  game[STATE_KEY] = {
    ...(getState(game) || {}),
    ...partialState,
  }
}
