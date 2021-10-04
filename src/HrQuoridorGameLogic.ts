import type { Board, Position } from "./HrQuoridorLayout";

export const validatePawn: (
  pre: readonly Position,
  post: readonly Position,
  board: readonly Board
) => boolean = (pre, post, board) => {
  // TODO: validate pawn move
  return true;
};

export const validateWall: (
  player: readonly Position[],
  goal: readonly Position[][],
  board: readonly Board
) => boolean = (player, goal, board) => {
  // TODO: validate no cross wall
  // TODO: validate no goal
  return true;
};
