import {
  KEY_WALL,
  MONSTER_COLOR,
  MONSTER_THROTTLE,
} from './constants';
import { getRandomVector, handlePieceAction, vectorSum } from './utils';
import { PIECE_ACTION_MONSTER } from './piece-action';
import { getState, setState } from './state';

export function renderMonster(game) {
  const state = getState(game)
  const step = state.step;
  const monster = state.monster;
  let vector = monster.vector;
  let [x, y] = vectorSum(monster.pos, vector);

  if (step % MONSTER_THROTTLE > 0) {
    game.setDot(monster.pos[0], monster.pos[1], MONSTER_COLOR);
    return;
  }

  const newCell = state.board[x][y];

  if (newCell === KEY_WALL) {
    [x, y] = monster.pos;
    vector = getRandomVector();
  } else if (newCell !== null && typeof newCell !== 'undefined') {
    // unit
    handlePieceAction(game, x, y, PIECE_ACTION_MONSTER);
  }

  game.setDot(x, y, MONSTER_COLOR);

  setState(game, {
    monster: {
      vector,
      pos: [x, y],
    }
  })
}
