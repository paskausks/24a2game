import { setStartingUIElements } from './hud';
import { resetState } from './state';

export function create(game) {
  resetState(game);
  setStartingUIElements();
}

