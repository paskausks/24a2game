import {
  BOARD_DEFAULT_CELL_COLOR,
  CELLS,
  MONSTER_COLOR,
  MONSTER_SPEED_THROTTLE,
  KEY_WALL
} from './constants';
import { getState, setState } from './state';
import { getRandomVector, vectorSum } from './utils';

function renderCaptives(game) {
  const state = getState(game);

  // draw captives
  (state.board || []).forEach((row, y) => {
    row.forEach((cellKey, x) => {
      if (!cellKey) {
        return;
      }

      game.setDot(x, y, CELLS[cellKey].color || BOARD_DEFAULT_CELL_COLOR);
    })
  });
}

function renderMonster(game) {
  const state = getState(game)
  const monster = state.monster;
  let vector = monster.vector;
  let pos = vectorSum(monster.pos, vector);

  const newCell = state.board[pos[0]][pos[1]];

  if (newCell === KEY_WALL) {
    pos = monster.pos;
    vector = getRandomVector();
  }

  const time = ((new Date().getTime() - state.created) / 1000).toFixed(2);
  game.setDot(pos[0], pos[1], MONSTER_COLOR);
  game.setText('Time passed: ' + String(time) + 's');

  setState(game, {
    monster: {
      vector,
      pos,
    }
  })
}

export function update(game) {
  renderCaptives(game);
  renderMonster(game);
}

