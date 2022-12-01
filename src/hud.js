import { CELLS } from './constants';
import { displayableValue, lossesRemaining } from './utils';

const EL_SCORE = document.getElementById('score');
const EL_LOSSES = document.getElementById('losses');
const EL_SELECTION = document.getElementById('selected-cell');
const EL_SELECTED_LABEL = document.getElementById('selected-cell-label');
const EL_SELECTED_TYPE = document.getElementById('selected-cell-type');
const EL_SELECTED_VALUE = document.getElementById('selected-cell-value');
const EL_EVAC_STATE = document.getElementById('evac-status');

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
  EL_EVAC_STATE.innerText = isReady ? 'Evac ready!' : 'Evac pending!';
}

export function setLossesLabel(losses) {
  EL_LOSSES.innerText = lossesRemaining(losses);
}
