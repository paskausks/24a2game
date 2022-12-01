import { EVAC_COOLDOWN_MS } from './constants';
import { PIECE_ACTION_EVAC, PIECE_ACTION_SACRIFICE } from './piece-action';
import { setState, getState } from './state';
import { handlePieceAction } from './utils';

export function isEvacReady(lastEvacTimeStamp) {
  return new Date().getTime() - lastEvacTimeStamp >= EVAC_COOLDOWN_MS;
}

export function handleEvac(game) {
  const state = getState(game);

  if (!state) {
    return;
  }

  const selection = state.selectedCell;

  if (!selection) {
    return;
  }

  if (!isEvacReady(state.lastEvac)) {
    return;
  }

  // remove piece from board and remove selection marker
  const [x, y] = selection;
  handlePieceAction(game, x, y, PIECE_ACTION_EVAC);
}

export function handleSacrifice(game) {
  const state = getState(game);
  const selection = state.selectedCell;

  if (!selection) {
    return;
  }

  const [x, y] = selection;
  handlePieceAction(game, x, y, PIECE_ACTION_SACRIFICE);
}
