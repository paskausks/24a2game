import { handleEvac, handleSacrifice } from './evac';
import { getState } from './state';
import { restartGame, stopGame } from './utils';

export function setupKeyListeners(game) {
  document.addEventListener('keyup', ({key}) => {
    const normalizedKey = key.toLowerCase();

    if (normalizedKey === 'w') {
      handleSacrifice(game);
    } else if (normalizedKey === 'q') {
      handleEvac(game);
    } else if (normalizedKey === 'r') {
      if (!getState(game)) {
        // game not initialized, don't (re-)start
        return;
      }

      restartGame(game);
    }
  });
}
