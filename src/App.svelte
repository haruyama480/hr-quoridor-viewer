<script lang="ts">
  import type { Grid, Position } from "./HrQuoridorLayout";
  import {
    Cell,
    Ghost,
    gmap,
    HrQuoridorLayout,
    matchCell,
    Piece,
  } from "./HrQuoridorLayout";
  import HrQuoridorView from "./HrQuoridorView.svelte";

  const game_row_size = 9;
  const game_player_size = 2;
  const ql = new HrQuoridorLayout(game_row_size);

  let current_player_id = 0; // 0-index
  let { board, current_pawn } = ql.initState();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function clickCell(event: any): void {
    const cy = event.detail.cy;
    const cx = event.detail.cx;
    const next: Position = ql.toIndex(cy, cx);
    let [y, x] = next;
    if (ql.isPCell(cy, cx)) {
      if (matchCell(board.pawn[y][x], "piece", current_player_id)) {
        return;
      }
      let pawn_: Grid = JSON.parse(JSON.stringify(board.pawn)); // deep copy
      pawn_ = gmap(pawn_, (cell: Cell) =>
        matchCell(cell, "piece", current_player_id) ? Ghost : cell
      );
      current_pawn[current_player_id] = [y, x];
      pawn_[y][x] = Piece(current_player_id, false);
      board.pawn = pawn_;
    } else if (ql.isVCell(cy, cx)) {
      if (matchCell(board.vertical_wall[y][x], "piece", current_player_id)) {
        return;
      }
      let vertical_wall_ = Object.assign([], board.vertical_wall);
      if (y === game_row_size - 1) y--;
      vertical_wall_[y][x] = Piece(current_player_id, false);
      board.vertical_wall = vertical_wall_;
    } else if (ql.isHCell(cy, cx)) {
      if (matchCell(board.horizontal_wall[y][x], "piece", current_player_id)) {
        return;
      }
      let horizontal_wall_ = Object.assign([], board.horizontal_wall);
      if (x === game_row_size - 1) x--;
      horizontal_wall_[y][x] = Piece(current_player_id, false);
      board.horizontal_wall = horizontal_wall_;
    }
    current_player_id = (current_player_id + 1) % game_player_size;
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
