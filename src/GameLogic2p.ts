import type { Board, Grid, Position } from "./Layout";
import { Ghost, Piece } from "./Layout";

export function initState(grid_size: number): {
  board: Board;
  current_pawn: Position[];
  goal: Position[][]; // goal[i]: all user_i's goals
} {
  const n = grid_size;
  const pawn: Grid = [...Array(n)].map(() => Array(n).fill(Ghost)); // size(n,n)
  const center = Math.floor(n / 2);
  const current_pawn: Position[] = [
    [0, center],
    [n - 1, center],
  ]; // supports only 2-player game
  pawn[0][center] = Piece(0, false);
  pawn[n - 1][center] = Piece(1, false);
  const goal: Position[][] = [
    [...Array(n)].map((_, i) => [n - 1, i]),
    [...Array(n)].map((_, i) => [0, i]),
  ];

  const vertical_wall: Grid = [...Array(n - 1)].map(() =>
    Array(n - 1).fill(Ghost)
  ); // size(n-1,n-1)
  const horizontal_wall: Grid = [...Array(n - 1)].map(() =>
    Array(n - 1).fill(Ghost)
  ); // size(n-1,n-1)

  return {
    board: {
      pawn,
      vertical_wall,
      horizontal_wall,
    },
    current_pawn,
    goal,
  };
}
