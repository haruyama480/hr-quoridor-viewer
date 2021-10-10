<script lang="ts">
  import BoardView from "../BoardView.svelte";
  import { initState } from "../GameLogic2p";
  import {
    updatePawnGhost,
    validatePawn,
    validateWall,
  } from "../GameLogicCommon";
  import type { Grid, GridType, Position } from "../Layout";
  import { None, Piece } from "../Layout";

  export let board_size = "500px";
  export let grid_size = 9;

  const game_player_size = 2;

  let current_player_id = -1; // 0-index
  let { board, current_pawn, goal } = initState(grid_size);
  function nextTurn() {
    current_player_id = (current_player_id + 1) % game_player_size;
    updatePawnGhost(current_pawn[current_player_id], board);
  }

  nextTurn();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function clickCell(event: any): void {
    const gridType: GridType = event.detail.gridType;
    const next: Position = event.detail.nextPosition;
    const current: Position = current_pawn[current_player_id];
    let [y, x] = next;
    if (gridType.kind === "pawn") {
      if (!validatePawn(current, next, board)) {
        return;
      }
      let pawn_: Grid = JSON.parse(JSON.stringify(board.pawn)); // deep copy

      const [prey, prex] = current;
      pawn_[prey][prex] = None; // from
      pawn_[y][x] = Piece(current_player_id, false); // to
      board.pawn = pawn_;
      current_pawn[current_player_id] = [y, x];
      nextTurn();
      return;
    }

    let board_ = JSON.parse(JSON.stringify(board)); // deep copy
    if (gridType.kind === "vwall") {
      if (y === grid_size - 1) return;
      if (board.vertical_wall[y][x].kind === "piece") {
        return;
      }
      board_.vertical_wall[y][x] = Piece(current_player_id, false);
    } else if (gridType.kind === "hwall") {
      if (x === grid_size - 1) return;
      if (board.horizontal_wall[y][x].kind === "piece") {
        return;
      }
      board_.horizontal_wall[y][x] = Piece(current_player_id, false);
    }
    if (validateWall(current_pawn, goal, board_)) {
      board = board_;
      nextTurn();
      return;
    }
  }
</script>

<div style="--board-area: {board_size}">
  <BoardView {grid_size} {current_player_id} {board} on:clickCell={clickCell} />
</div>

<style>
  div {
    height: var(--board-area);
    width: var(--board-area);
  }
</style>
