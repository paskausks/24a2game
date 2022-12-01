import { getState, resetState } from "./state";

const BUTTON = document.getElementById('startbutton');

export function setupButtonListener(game) {
  BUTTON.addEventListener('click', () => {
    const state = getState(game);
    if (!state || state.step === 0) {
      game.run()
      BUTTON.innerText = 'Restart';
      document.getElementById('container').style.visibility = 'visible';
    } else {
      resetState(game);
    }
  });
}
