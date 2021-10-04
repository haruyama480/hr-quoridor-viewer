import type { Board, Position } from "./HrQuoridorLayout";

export const validatePawn: (
  pre: Position,
  post: Position,
  board: Board
) => boolean = (pre, post, board) => {
  // TODO: validate pawn move
  return true;
};

export const validateWall: (
  player: Position[],
  goal: Position[][],
  board: Board
) => boolean = (player, goal, board) => {
  // TODO: validate no cross wall
  // TODO: validate no goal
  return true;
};
