import { BOARD_DEFAULT_CELL_COLOR, BOARD_DIMEN } from './constants';
import { create } from './create';
import { update } from './update';

const game = new Game({
  container: 'container',
  gridHeight: BOARD_DIMEN,
  gridWidth: BOARD_DIMEN,
  defaultDotColor: BOARD_DEFAULT_CELL_COLOR,
  create,
  update,
});

game.run();
