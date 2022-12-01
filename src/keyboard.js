import { handleEvac, handleSacrifice } from './evac';
import { restartGame, stopGame } from './utils';

export function setupKeyListeners(game) {
  document.addEventListener('keyup', ({key}) => {
    const normalizedKey = key.toLowerCase();

    if (normalizedKey === 'w') {
      handleSacrifice(game);
    } else if (normalizedKey === 'q') {
      handleEvac(game);
    } else if (normalizedKey === 'r') {
      restartGame(game);
    } else if (normalizedKey === 's') {
      stopGame(game);
    }
  });
}
