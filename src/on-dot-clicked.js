import { showSelectionData } from './hud';
import { setState, getState } from './state';

export function onDotClicked(game, x, y) {

  const state = getState(game);

  if (x === null || typeof x === 'undefined') {
    // if null passed as x or arg ommiteed,
    // remove selection
    showSelectionData(null);
    setState(game, {
      selectedCell: null,
    });
    return;
  }

  const cell = state.board[x][y];

  let selectedCell = null;

  showSelectionData(cell);

  if (!cell) {
    // ignore floor
    setState(game, {
      selectedCell,
    });

    return;
  }

  setState(game, {
    selectedCell: [x, y],
  });
}
