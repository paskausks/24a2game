import { BOARD_DEFAULT_CELL_COLOR, BOARD_DIMEN, BOARD_FPS } from './constants';
import { create } from './create';
import { setupKeyListeners } from './keyboard';
import { setupButtonListener } from './setup-button-listener';
import { onDotClicked } from './on-dot-clicked';
import { update } from './update';

const config = {
  container: 'game',
  gridHeight: BOARD_DIMEN,
  gridWidth: BOARD_DIMEN,
  frameRate: BOARD_FPS,
  defaultDotColor: BOARD_DEFAULT_CELL_COLOR,
  onDotClicked: (x, y) => onDotClicked(game, x, y),
  create,
  update,
}

let game = new Game(config);

setupKeyListeners(game);
setupButtonListener(game);
