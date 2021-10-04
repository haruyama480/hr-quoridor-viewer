import type { Board, Cell, Position } from "./HrQuoridorLayout";

function isPiece(cell: Cell) {
  return cell.kind === "piece";
}

function canMoveUp(y: number, x: number, board: Board): boolean {
  const n = board.pawn.length;
  if (y >= n - 1) {
    return false;
  }
  let movable = true;
  if (x > 0) {
    movable = movable && !isPiece(board.horizontal_wall[y][x - 1]);
  }
  if (x < n - 1) {
    movable = movable && !isPiece(board.horizontal_wall[y][x]);
  }
  return movable;
}

function canMoveDown(y: number, x: number, board: Board): boolean {
  const n = board.pawn.length;
  if (y === 0) {
    return false;
  }
  let movable = true;
  if (x > 0) {
    movable = movable && !isPiece(board.horizontal_wall[y - 1][x - 1]);
  }
  if (x < n - 1) {
    movable = movable && !isPiece(board.horizontal_wall[y - 1][x]);
  }
  return movable;
}

function canMoveRight(y: number, x: number, board: Board): boolean {
  const n = board.pawn.length;
  if (x === n - 1) {
    return false;
  }
  let movable = true;
  if (y > 0) {
    movable = movable && !isPiece(board.vertical_wall[y - 1][x]);
  }
  if (y < n - 1) {
    movable = movable && !isPiece(board.vertical_wall[y][x]);
  }
  return movable;
}

function canMoveLeft(y: number, x: number, board: Board): boolean {
  const n = board.pawn.length;
  if (x === 0) {
    return false;
  }
  let movable = true;
  if (y > 0) {
    movable = movable && !isPiece(board.vertical_wall[y - 1][x - 1]);
  }
  if (y < n - 1) {
    movable = movable && !isPiece(board.vertical_wall[y][x - 1]);
  }
  return movable;
}

export const validatePawn: (
  pre: Position,
  post: Position,
  board: Board
) => boolean = (pre, post, board) => {
  if (
    (pre[0] === post[0] && pre[1] === post[1]) ||
    board.pawn[post[0]][post[1]].kind === "piece"
  ) {
    return false;
  }
  // copy
  let p1 = pre;
  let p2 = post;
  const dy = p2[0] - p1[0];
  const dx = p2[1] - p1[1];
  const l1_dist = Math.abs(dy) + Math.abs(dx);

  if (l1_dist === 1) {
    if (dy === 0) {
      if (!(p1[1] <= p2[1])) {
        [p1, p2] = [p2, p1]; //swap
      }
      return canMoveRight(p1[0], p1[1], board);
    } else {
      if (!(p1[0] <= p2[0])) {
        [p1, p2] = [p2, p1]; //swap
      }
      return canMoveUp(p1[0], p1[1], board);
    }
  } else if (l1_dist === 2) {
    if (dx * dy === 0) {
      if (dy === 0) {
        if (!(p1[1] <= p2[1])) {
          [p1, p2] = [p2, p1]; //swap
        }
        return (
          canMoveRight(p1[0], p1[1], board) &&
          canMoveRight(p1[0], p1[1] + 1, board) &&
          board.pawn[p1[0]][p1[1] + 1].kind === "piece"
        );
      } else {
        if (!(p1[0] <= p2[0])) {
          [p1, p2] = [p2, p1]; //swap
        }
        return (
          canMoveUp(p1[0], p1[1], board) &&
          canMoveUp(p1[0] + 1, p1[1], board) &&
          board.pawn[p1[0] + 1][p1[1]].kind === "piece"
        );
      }
    } else {
      const doubleUp =
        canMoveUp(p1[0], p1[1], board) &&
        !canMoveUp(p1[0] + 1, p1[1], board) &&
        board.pawn[p1[0] + 1][p1[1]].kind === "piece";
      const doubleDown =
        canMoveDown(p1[0], p1[1], board) &&
        !canMoveDown(p1[0] - 1, p1[1], board) &&
        board.pawn[p1[0] - 1][p1[1]].kind === "piece";
      const doubleRight =
        canMoveRight(p1[0], p1[1], board) &&
        !canMoveRight(p1[0], p1[1] + 1, board) &&
        board.pawn[p1[0]][p1[1] + 1].kind === "piece";
      const doubleLeft =
        canMoveLeft(p1[0], p1[1], board) &&
        !canMoveLeft(p1[0], p1[1] - 1, board) &&
        board.pawn[p1[0]][p1[1] - 1].kind === "piece";
      if (p1[1] < p2[1]) {
        if (p1[0] < p2[0]) {
          // _2
          // 1_
          return (
            (doubleUp && canMoveRight(p1[0] + 1, p1[1], board)) ||
            (doubleRight && canMoveUp(p1[0], p1[1] + 1, board))
          );
        } else {
          // 1_
          // _2
          return (
            (doubleDown && canMoveRight(p1[0] - 1, p1[1], board)) ||
            (doubleRight && canMoveDown(p1[0], p1[1] + 1, board))
          );
        }
      } else {
        if (p1[0] < p2[0]) {
          // 2_
          // _1
          return (
            (doubleUp && canMoveLeft(p1[0] + 1, p1[1], board)) ||
            (doubleLeft && canMoveUp(p1[0], p1[1] - 1, board))
          );
        } else {
          // _1
          // 2_
          return (
            (doubleDown && canMoveLeft(p1[0] - 1, p1[1], board)) ||
            (doubleLeft && canMoveDown(p1[0], p1[1] - 1, board))
          );
        }
      }
    }
  }
  return false;
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
