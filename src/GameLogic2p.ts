import { updatePawnGhost, validatePawn, validateWall } from "./GameLogicCommon";
import type { Board, Grid, GridType, Position } from "./Layout";
import { Ghost, None, Piece } from "./Layout";

export class Game2p {
  grid_size: number;
  board: Board;
  current_pawn: Position[];
  goal: Position[][];
  current_player: number;

  constructor(grid_size: number) {
    this.grid_size = grid_size;
    const n = grid_size;

    // set board
    const pawn: Grid = [...Array(n)].map(() => Array(n).fill(Ghost)); // size(n,n)
    const center = Math.floor(n / 2);
    pawn[0][center] = Piece(0, false);
    pawn[n - 1][center] = Piece(1, false);
    const vertical_wall: Grid = [...Array(n - 1)].map(() =>
      Array(n - 1).fill(Ghost)
    ); // size(n-1,n-1)
    const horizontal_wall: Grid = [...Array(n - 1)].map(() =>
      Array(n - 1).fill(Ghost)
    ); // size(n-1,n-1)
    this.board = {
      pawn,
      vertical_wall,
      horizontal_wall,
    };

    // set current_pawn, goal
    this.current_pawn = [
      [0, center],
      [n - 1, center],
    ]; // supports only 2-player game
    this.goal = [
      [...Array(n)].map((_, i) => [n - 1, i]),
      [...Array(n)].map((_, i) => [0, i]),
    ];

    this.current_player = -1;
    this.nextTurn();
  }

  public nextTurn(): void {
    this.current_player = (this.current_player + 1) % 2;
    updatePawnGhost(this.current_pawn[this.current_player], this.board);
  }

  public handleTurn(gridType: GridType, next: Position): boolean {
    const current: Position = this.current_pawn[this.current_player];
    const [y, x] = next;
    if (gridType.kind === "pawn") {
      if (!validatePawn(current, next, this.board)) {
        return false;
      }
      const pawn_: Grid = JSON.parse(JSON.stringify(this.board.pawn)); // deep copy

      const [prey, prex] = current;
      pawn_[prey][prex] = None; // from
      pawn_[y][x] = Piece(this.current_player, false); // to
      this.board.pawn = pawn_;
      this.current_pawn[this.current_player] = [y, x];
      return true;
    }

    const board_ = JSON.parse(JSON.stringify(this.board)); // deep copy
    if (gridType.kind === "vwall") {
      if (y === this.grid_size - 1) return false;
      if (this.board.vertical_wall[y][x].kind === "piece") {
        return false;
      }
      board_.vertical_wall[y][x] = Piece(this.current_player, false);
    } else if (gridType.kind === "hwall") {
      if (x === this.grid_size - 1) return false;
      if (this.board.horizontal_wall[y][x].kind === "piece") {
        return false;
      }
      board_.horizontal_wall[y][x] = Piece(this.current_player, false);
    }
    if (validateWall(this.current_pawn, this.goal, board_)) {
      this.board = board_;
      return true;
    }
  }
}
