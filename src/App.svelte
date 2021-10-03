<script lang="ts">
  import { Cell, Ghost, HrQuoridorLayout, Piece } from "./HrQuoridorLayout";
  import HrQuoridorView from "./HrQuoridorView.svelte";

  const game_row_size = 9;
  const game_player_size = 2;
  const ql = new HrQuoridorLayout(game_row_size);

  let current_player_id = 0; // 0-index
  let { pawn_map, vertical_wall_map, horizontal_wall_map } = ql.initState();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function clickCell(event: any): void {
    const cy = event.detail.cy;
    const cx = event.detail.cx;
    let [y, x] = ql.toIndex(cy, cx);
    if (ql.isPCell(cy, cx)) {
      if (
        pawn_map[y][x].kind === "piece" &&
        pawn_map[y][x].player_id === current_player_id
      ) {
        return; // no change;
      }
      let pawn_map_: Cell[][] = JSON.parse(JSON.stringify(pawn_map)); // deep copy
      pawn_map_ = pawn_map_.map((row: Cell[]) =>
        row.map((cell: Cell) =>
          cell.kind == "piece" && cell.player_id == current_player_id
            ? Ghost
            : cell
        )
      );
      pawn_map_[y][x] = Piece(current_player_id, false);
      pawn_map = pawn_map_;
    } else if (ql.isVCell(cy, cx)) {
      if (
        vertical_wall_map[y][x].kind === "piece" &&
        vertical_wall_map[y][x].player_id === current_player_id
      ) {
        return; // no change;
      }
      let vertical_wall_map_ = Object.assign([], vertical_wall_map);
      if (y === game_row_size - 1) y--;
      vertical_wall_map_[y][x] = Piece(current_player_id, false);
      vertical_wall_map = vertical_wall_map_;
    } else if (ql.isHCell(cy, cx)) {
      if (
        horizontal_wall_map[y][x].kind === "piece" &&
        horizontal_wall_map[y][x].player_id === current_player_id
      ) {
        return; // no change;
      }
      let horizontal_wall_map_ = Object.assign([], horizontal_wall_map);
      if (x === game_row_size - 1) x--;
      horizontal_wall_map_[y][x] = Piece(current_player_id, false);
      horizontal_wall_map = horizontal_wall_map_;
    }
    current_player_id = (current_player_id + 1) % game_player_size;
  }
</script>

<div style="height: 500px; width:500px; margin: 0px; padding: 0px;">
  <HrQuoridorView
    {game_row_size}
    {current_player_id}
    {pawn_map}
    {vertical_wall_map}
    {horizontal_wall_map}
    on:clickCell={clickCell}
  />
</div>
