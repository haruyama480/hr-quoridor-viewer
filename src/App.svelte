<script lang="ts">
  import { validatePawn, validateWall } from "./HrQuoridorGameLogic";
  import type { Grid, Position } from "./HrQuoridorLayout";
  import {
    Cell,
    Ghost,
    gmap,
    HrQuoridorLayout,
    matchCell,
    None,
    Piece,
  } from "./HrQuoridorLayout";
  import HrQuoridorView from "./HrQuoridorView.svelte";

  const game_row_size = 9;
  const game_player_size = 2;
  const ql = new HrQuoridorLayout(game_row_size);
  $: N = game_row_size;

  let current_player_id = -1; // 0-index
  let { board, current_pawn, goal } = ql.initState();

  function nextTurn() {
    current_player_id = (current_player_id + 1) % game_player_size;
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        let cell = board.pawn[y][x];
        if (cell.kind === "none" || cell.kind === "ghost") {
          cell = validatePawn(current_pawn[current_player_id], [y, x], board)
            ? Ghost
            : None;
        }
        board.pawn[y][x] = cell;
      }
    }
  }

  nextTurn();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function clickCell(event: any): void {
    const cy = event.detail.cy;
    const cx = event.detail.cx;
    const next: Position = ql.toIndex(cy, cx);
    let [y, x] = next;
    if (ql.isPCell(cy, cx)) {
      if (!validatePawn(current_pawn[current_player_id], next, board)) {
        return;
      }
      let pawn_: Grid = JSON.parse(JSON.stringify(board.pawn)); // deep copy
      pawn_ = gmap(pawn_, (cell: Cell) =>
        matchCell(cell, "piece", current_player_id) ? Ghost : cell
      );
      current_pawn[current_player_id] = [y, x];
      pawn_[y][x] = Piece(current_player_id, false);
      board.pawn = pawn_;

      nextTurn();
      return;
    }

    let board_ = Object.assign([], board);
    if (ql.isVCell(cy, cx)) {
      if (matchCell(board.vertical_wall[y][x], "piece", current_player_id)) {
        return;
      }
      if (y === game_row_size - 1) y--;
      board_.vertical_wall[y][x] = Piece(current_player_id, false);
    } else if (ql.isHCell(cy, cx)) {
      if (matchCell(board.horizontal_wall[y][x], "piece", current_player_id)) {
        return;
      }
      if (x === game_row_size - 1) x--;
      board_.horizontal_wall[y][x] = Piece(current_player_id, false);
    }
    if (validateWall(current_pawn, goal, board)) {
      board = board_;
      nextTurn();
    }
  }
</script>

<div style="height: 500px; width:500px; margin: 0px; padding: 0px;">
  <HrQuoridorView
    {game_row_size}
    {current_player_id}
    {board}
    on:clickCell={clickCell}
  />
</div>
