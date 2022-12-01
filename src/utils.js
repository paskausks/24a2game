import { BOARD_DEFAULT_CELL_COLOR, CELLS, EVACS_MIN, LOSSES_MAX, PENALTY_FEED, PENALTY_SACRIFICE } from './constants';
import { getState, setState, resetState } from './state';
import { onDotClicked } from './on-dot-clicked';
import { PIECE_ACTION_EVAC, PIECE_ACTION_MONSTER, PIECE_ACTION_SACRIFICE } from './piece-action';
import { setStartingUIElements } from './hud';

// top left is 0,0.
const VECTORS = [
  [0, -1], // N
  [1, 0], // E
  [0, 1], // S
  [-1, 0], // W
  [1, -1], // NE
  [1, 1], // SE
  [-1, 1], // SW
  [-1, -1], // NW
];

export function getRandomVector() {
  return VECTORS[Math.floor(Math.random() * (VECTORS.length - 1))];
}

export function vectorSum(vector1, vector2) {
  return [
    vector1[0] + vector2[0],
    vector1[1] + vector2[1],
  ]
}

export function setCellColor(game, x, y) {
  const state = getState(game);
  game.setDot(x, y, CELLS[state.board[x][y]].color || BOARD_DEFAULT_CELL_COLOR);
}

export function removePiece(board, x, y) {
  const newBoard = JSON.parse(JSON.stringify(board));
  newBoard[x][y] = null;
  return newBoard;
}

export function displayableValue(floatValue) {
  return (floatValue * 100).toFixed(0);
}

export function lossesRemaining(losses) {
  return Math.max(LOSSES_MAX - losses, 0);
}

export function evacsRemaining(evacs) {
  return Math.max(EVACS_MIN - evacs, 0);
}

export function handlePieceAction(game, x, y, action) {
  const state = getState(game);
  const oldBoard = state.board;
  const unit = CELLS[oldBoard[x][y]];
  const board = removePiece(oldBoard, x, y);
  const currentSelection = state.selectedCell;
  const currentSelectionMatchesPos = currentSelection && currentSelection[0] === x && currentSelection[1] === y;
  const extra = {}
  let score = state.score;

  switch(action) {
    case PIECE_ACTION_EVAC: {
      score = score + unit.value;

      const monsterPos = state.monster.pos;

      extra.lastEvac = new Date().getTime();
      extra.evacs = state.evacs + 1;
      extra.monster = {
        ...state.monster,
        vector: [
          // evac makes the monster go to the (approximate) evac direction
          monsterPos[0] === x ? 0 : monsterPos[0] > x ? -1 : 1,
          monsterPos[1] === y ? 0 : monsterPos[1] > y ? -1 : 1,
        ],
      }

      onDotClicked(game, null);

      break;
    }
    case PIECE_ACTION_SACRIFICE: {
      extra.losses = state.losses + 1
      score = score - unit.value * PENALTY_SACRIFICE;

      // sacrifice makes the monster turn back
      state.monster.vector
      extra.monster = {
        ...state.monster,
        vector: [
          state.monster.vector[0] * -1,
          state.monster.vector[1] * -1,
        ],
      }

      onDotClicked(game, null);
      break;
    }
    case PIECE_ACTION_MONSTER: {
      extra.losses = state.losses + 1
      score = score - unit.value * PENALTY_FEED;

      // monster eats selected piece
      if (currentSelectionMatchesPos) {
        onDotClicked(game, null);
      }

      break;
    }
    default:
      break;
  }

  setState(game, {
    ...extra,
    board,
    score: Math.max(0, score),
  })
}

export function stopGame(game) {
  setState(game, {
    stopped: true,
  });
}

export function restartGame(game) {
  setStartingUIElements();
  resetState(game);
}
