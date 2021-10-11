import { updatePawnGhost, validatePawn, validateWall } from "./GameLogicCommon";
import type { Board, Grid, PieceType, Position } from "./Model";
import { Ghost, None, Piece, Step } from "./Model";

export class Game2p {
  grid_size: number;
  board: Board;
  current_pawn: Position[];
  goal: Position[][];
  current_player: number;
  history: Step[];
  history_index: number;

  constructor(grid_size: number, history: Step[] = [], history_index = 0) {
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

    // history
    this.history = history;
    this.history_index = history_index;
  }

  public nextTurn(): void {
    this.current_player = (this.current_player + 1) % 2; // switch user
    updatePawnGhost(this.current_pawn[this.current_player], this.board);
  }

  public handleTurn(pieceType: PieceType, next: Position): boolean {
    const current: Position = this.current_pawn[this.current_player];
    const [y, x] = next;
    if (pieceType.kind === "pawn") {
      if (!validatePawn(current, next, this.board)) {
        return false;
      }
      const pawn_: Grid = JSON.parse(JSON.stringify(this.board.pawn)); // deep copy

      this.commitHistory(pieceType, next);
      const [prey, prex] = current;
      pawn_[prey][prex] = None; // from
      pawn_[y][x] = Piece(this.current_player, false); // to
      this.board.pawn = pawn_;
      this.current_pawn[this.current_player] = [y, x];
      return true;
    }

    const board_ = JSON.parse(JSON.stringify(this.board)); // deep copy
    if (pieceType.kind === "vwall") {
      if (y === this.grid_size - 1) return false;
      if (this.board.vertical_wall[y][x].kind === "piece") {
        return false;
      }
      board_.vertical_wall[y][x] = Piece(this.current_player, false);
    } else if (pieceType.kind === "hwall") {
      if (x === this.grid_size - 1) return false;
      if (this.board.horizontal_wall[y][x].kind === "piece") {
        return false;
      }
      board_.horizontal_wall[y][x] = Piece(this.current_player, false);
    }
    if (validateWall(this.current_pawn, this.goal, board_)) {
      this.commitHistory(pieceType, next);
      this.board = board_;
      return true;
    }
  }

  public commitHistory(piece: PieceType, next: Position): void {
    const current: Position = this.current_pawn[this.current_player];
    const history_ = this.history.slice(0, this.history_index);
    this.history_index++;
    history_.push({ piece, from: current, to: next });
    this.history = history_;
  }

  public previousStep(): boolean {
    if (this.history_index - 1 < 0) {
      return false;
    }
    this.history_index--;
    const step = this.history[this.history_index];
    const kind = step.piece.kind;
    const [fromy, fromx] = step.from;
    const [toy, tox] = step.to;
    if (kind === "pawn") {
      const prev_player = (this.current_player + 1) % 2;
      const pawn_: Grid = JSON.parse(JSON.stringify(this.board.pawn)); // deep copy
      pawn_[toy][tox] = None;
      pawn_[fromy][fromx] = Piece(prev_player, false);
      this.board.pawn = pawn_;
      this.current_pawn[prev_player] = [fromy, fromx];
    } else if (kind === "vwall") {
      this.board.vertical_wall[toy][tox] = None;
    } else if (kind === "hwall") {
      this.board.horizontal_wall[toy][tox] = None;
    }
    return true;
  }

  public nextStep(): boolean {
    if (this.history_index + 1 > this.history.length) {
      return false;
    }
    const step = this.history[this.history_index];
    const kind = step.piece.kind;
    const [fromy, fromx] = step.from;
    const [toy, tox] = step.to;
    if (kind === "pawn") {
      const pawn_: Grid = JSON.parse(JSON.stringify(this.board.pawn)); // deep copy
      pawn_[fromy][fromx] = None;
      pawn_[toy][tox] = Piece(this.current_player, false);
      this.board.pawn = pawn_;
      this.current_pawn[this.current_player] = [toy, tox];
    } else if (kind === "vwall") {
      this.board.vertical_wall[toy][tox] = Piece(this.current_player, false);
    } else if (kind === "hwall") {
      this.board.horizontal_wall[toy][tox] = Piece(this.current_player, false);
    }
    this.history_index++;
    return true;
  }

  public dumpHistory(): string[] {
    const ret = [];
    for (let i = 0; i < this.history.length; i++) {
      const step = this.history[i];
      let ss = "";
      ss += String.fromCharCode("a".charCodeAt(0) + step.to[0]);
      ss += step.to[1] + 1;
      if (step.piece.kind === "vwall") {
        ss += "v";
      } else if (step.piece.kind === "hwall") {
        ss += "h";
      }
      ret.push(ss);
    }
    return ret;
  }
}
