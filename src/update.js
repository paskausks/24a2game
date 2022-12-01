import {
    BOARD_SELECT_COLOR,
} from './constants';
import { getState, setState } from './state';
import { setCellColor } from './utils';
import { setEvacLabel, showScore, setLossesLabel } from './hud';
import { isEvacReady } from './evac';
import { renderMonster } from './monster';

function setStep(game) {
  setState(game, {
    step: (getState(game).step || 0) + 1
  })
}

function renderCaptives(game) {
  const state = getState(game);

  // draw captives
  (state.board || []).forEach((col, x) => {
    col.forEach((cellKey, y) => {
      if (!cellKey) {
        return;
      }

      setCellColor(game, x, y);
    })
  });
}

function renderSelection(game) {
  const selection = getState(game)?.selectedCell;

  if (!selection) {
    return;
  }

  const [x, y] = selection;

  game.setDot(x, y, BOARD_SELECT_COLOR);
}

function updateScore(game) {
  showScore(getState(game)?.score || 0);
}

function updateEvacStatus(game) {
  const lastEvac = getState(game)?.lastEvac;
  setEvacLabel(isEvacReady(lastEvac));
}

function updateLosses(game) {
  const losses = getState(game)?.losses || 0;
  setLossesLabel(losses);
}

function checkWinCondition(game) {
  // TODO: Implement
}

export function update(game) {
  const paused = getState(game)?.paused || false;
  if (paused) {
    return;
  }

  setStep(game);

  renderCaptives(game);
  renderMonster(game);
  renderSelection(game);

  updateScore(game);
  updateEvacStatus(game);
  updateLosses(game)

  checkWinCondition(game);
}

