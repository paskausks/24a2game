import {
    BOARD_SELECT_COLOR, EVACS_MIN, LOSSES_MAX,
} from './constants';
import { getState, setState } from './state';
import { setCellColor, stopGame } from './utils';
import {
  setEvacLabel,
  showScore,
  setLossesLabel,
  setEvacCountLabel,
  showGameResults
} from './hud';
import { isEvacReady } from './evac';
import { renderMonster } from './monster';
import { onDotClicked } from './on-dot-clicked';

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
  const state = getState(game)

  if (!state) {
    return;
  }

  const lastEvac = state.lastEvac;
  const losses = state?.losses || 0;
  const evacs = state?.evacs || 0;

  setEvacLabel(isEvacReady(lastEvac));
  setLossesLabel(losses);
  setEvacCountLabel(evacs);
}

function checkWinCondition(game) {
  const state = getState(game);

  if (!state) {
    return;
  }

  const losses = state.losses;
  const evacs = state.evacs;
  const gameLost = losses >= LOSSES_MAX;
  const gameWon = evacs >= EVACS_MIN;

  if (gameLost || gameWon) {
    // just unselect the last selected unit
    onDotClicked(game, null);
    stopGame(game);
    showGameResults(gameWon && !gameLost, state.created);
  }
}

export function update(game) {
  const stopped = getState(game)?.stopped || false;
  if (stopped) {
    return;
  }

  setStep(game);

  renderCaptives(game);
  renderMonster(game);
  renderSelection(game);

  updateScore(game);
  updateEvacStatus(game);

  checkWinCondition(game);
}

