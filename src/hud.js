import { CELLS } from './constants';
import { displayableValue, evacsRemaining, lossesRemaining } from './utils';

const EL_INSTRUCTIONS = document.getElementById('instructions');
const EL_SCORE = document.getElementById('score');
const EL_LOSSES = document.getElementById('losses');
const EL_EVACS = document.getElementById('evacs');
const EL_SELECTION = document.getElementById('selected-cell');
const EL_SELECTED_LABEL = document.getElementById('selected-cell-label');
const EL_SELECTED_TYPE = document.getElementById('selected-cell-type');
const EL_SELECTED_VALUE = document.getElementById('selected-cell-value');
const EL_EVAC_STATUS = document.getElementById('evac-status');
const EL_GAME_RESULTS = document.getElementById('game-results');
const EL_GAME_OUTCOME = document.getElementById('game-outcome');
const EL_GAME_RESULTS_TIME = document.getElementById('game-results-time');

const CLASS_UNDISPLAYED = 'undisplayed';

export function showSelectionData(cellType) {
  const cellData = CELLS[cellType];

  if (!cellData) {
    EL_SELECTION.classList.add('hidden');
    return;
  }

  EL_SELECTED_TYPE.style.backgroundColor = `#${cellData.colorHex}`;
  EL_SELECTED_LABEL.innerText = cellData.label;
  EL_SELECTED_VALUE.innerText = displayableValue(cellData.value);

  EL_SELECTION.classList.remove('hidden');
}

export function showScore(newScore) {
  EL_SCORE.innerText = displayableValue(newScore);
}

export function setEvacLabel(isReady) {
  EL_EVAC_STATUS.innerText = isReady ? 'Evac ready!' : 'Evac pending!';

  const classList = EL_EVAC_STATUS.classList;
  const readyClass = 'ready';

  if (isReady) {
    classList.add(readyClass);
  } else {
    classList.remove(readyClass);
  }
}

export function setLossesLabel(losses) {
  EL_LOSSES.innerText = lossesRemaining(losses);
}

export function setEvacCountLabel(evacs) {
  EL_EVACS.innerText = evacsRemaining(evacs);
}

export function setStartingUIElements() {
  EL_GAME_RESULTS.classList.add(CLASS_UNDISPLAYED);
  EL_EVAC_STATUS.classList.remove(CLASS_UNDISPLAYED);
  EL_INSTRUCTIONS.classList.add(CLASS_UNDISPLAYED);
}

export function showGameResults(isVictory, timeMs) {
  EL_GAME_RESULTS.classList.remove(CLASS_UNDISPLAYED);
  EL_GAME_OUTCOME.innerText = isVictory ? 'Game won!' : 'Game lost!';
  EL_GAME_RESULTS_TIME.innerText = `${((new Date().getTime() - timeMs) / 1000).toFixed(2)}s`;
  EL_EVAC_STATUS.classList.add(CLASS_UNDISPLAYED);
}
