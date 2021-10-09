import type { Board, Cell, Position } from "./HrQuoridorLayout";
import { Ghost, None } from "./HrQuoridorLayout";

function isPiece(cell: Cell) {
  return cell.kind === "piece";
}

function canMoveUp(y: number, x: number, board: Board): boolean {
  const N = board.pawn.length;
  if (y >= N - 1) {
    return false;
  }
  let movable = true;
  if (x > 0) {
    movable = movable && !isPiece(board.horizontal_wall[y][x - 1]);
  }
  if (x < N - 1) {
    movable = movable && !isPiece(board.horizontal_wall[y][x]);
  }
  return movable;
}

function canMoveDown(y: number, x: number, board: Board): boolean {
  const N = board.pawn.length;
  if (y === 0) {
    return false;
  }
  let movable = true;
  if (x > 0) {
    movable = movable && !isPiece(board.horizontal_wall[y - 1][x - 1]);
  }
  if (x < N - 1) {
    movable = movable && !isPiece(board.horizontal_wall[y - 1][x]);
  }
  return movable;
}

function canMoveRight(y: number, x: number, board: Board): boolean {
  const N = board.pawn.length;
  if (x === N - 1) {
    return false;
  }
  let movable = true;
  if (y > 0) {
    movable = movable && !isPiece(board.vertical_wall[y - 1][x]);
  }
  if (y < N - 1) {
    movable = movable && !isPiece(board.vertical_wall[y][x]);
  }
  return movable;
}

function canMoveLeft(y: number, x: number, board: Board): boolean {
  const N = board.pawn.length;
  if (x === 0) {
    return false;
  }
  let movable = true;
  if (y > 0) {
    movable = movable && !isPiece(board.vertical_wall[y - 1][x - 1]);
  }
  if (y < N - 1) {
    movable = movable && !isPiece(board.vertical_wall[y][x - 1]);
  }
  return movable;
}

export function validatePawn(
  pre: Position,
  post: Position,
  board: Board
): boolean {
  if (
    (pre[0] === post[0] && pre[1] === post[1]) ||
    isPiece(board.pawn[post[0]][post[1]])
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
          isPiece(board.pawn[p1[0]][p1[1] + 1])
        );
      } else {
        if (!(p1[0] <= p2[0])) {
          [p1, p2] = [p2, p1]; //swap
        }
        return (
          canMoveUp(p1[0], p1[1], board) &&
          canMoveUp(p1[0] + 1, p1[1], board) &&
          isPiece(board.pawn[p1[0] + 1][p1[1]])
        );
      }
    } else {
      const doubleUp =
        canMoveUp(p1[0], p1[1], board) &&
        !canMoveUp(p1[0] + 1, p1[1], board) &&
        isPiece(board.pawn[p1[0] + 1][p1[1]]);
      const doubleDown =
        canMoveDown(p1[0], p1[1], board) &&
        !canMoveDown(p1[0] - 1, p1[1], board) &&
        isPiece(board.pawn[p1[0] - 1][p1[1]]);
      const doubleRight =
        canMoveRight(p1[0], p1[1], board) &&
        !canMoveRight(p1[0], p1[1] + 1, board) &&
        isPiece(board.pawn[p1[0]][p1[1] + 1]);
      const doubleLeft =
        canMoveLeft(p1[0], p1[1], board) &&
        !canMoveLeft(p1[0], p1[1] - 1, board) &&
        isPiece(board.pawn[p1[0]][p1[1] - 1]);
      if (p1[1] < p2[1]) {
        if (p1[0] < p2[0]) {
          // 1: pre, 2: post position
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
}

export function validateWall(
  player: Position[],
  goal: Position[][],
  board: Board
): boolean {
  const N = board.pawn.length;
  for (let y = 0; y < N - 1; y++) {
    for (let x = 0; x < N - 1; x++) {
      // validate no cross
      if (
        isPiece(board.vertical_wall[y][x]) &&
        isPiece(board.horizontal_wall[y][x])
      ) {
        return false;
      }
      // validate no vertical overlap
      if (y !== N - 2) {
        if (
          isPiece(board.vertical_wall[y][x]) &&
          isPiece(board.vertical_wall[y + 1][x])
        ) {
          return false;
        }
      }
      // validate no horizontal overlap
      if (x !== N - 2) {
        if (
          isPiece(board.horizontal_wall[y][x]) &&
          isPiece(board.horizontal_wall[y][x + 1])
        ) {
          return false;
        }
      }
    }
  }
  // validate all players can reach their goals
  let reached: boolean[][];
  function dfs(y: number, x: number) {
    if (reached[y][x]) {
      return;
    }
    reached[y][x] = true;
    if (canMoveUp(y, x, board)) {
      dfs(y + 1, x);
    }
    if (canMoveDown(y, x, board)) {
      dfs(y - 1, x);
    }
    if (canMoveRight(y, x, board)) {
      dfs(y, x + 1);
    }
    if (canMoveLeft(y, x, board)) {
      dfs(y, x - 1);
    }
  }
  for (let i = 0; i < player.length; i++) {
    let has_goal = false;
    const posi = player[i];
    const goal_posi = goal[i];
    reached = [...Array(N)].map(() => Array(N).fill(false));
    dfs(posi[0], posi[1]); // calc reached
    for (let j = 0; j < goal_posi.length; j++) {
      const [gy, gx] = goal_posi[j];
      if (reached[gy][gx] === true) {
        has_goal = true;
      }
    }
    if (!has_goal) {
      return false;
    }
  }
  return true;
}

export function updatePawnGhost(current: Position, board: Board): void {
  const N = board.pawn.length;
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      if (board.pawn[y][x].kind !== "piece") {
        board.pawn[y][x] = validatePawn(current, [y, x], board) ? Ghost : None;
      }
    }
  }
}
