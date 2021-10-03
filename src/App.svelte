<script lang="ts">
  import { Cell, Ghost, HrQuoridorLayout, Piece } from "./HrQuoridorLayout";
  import HrQuoridorView from "./HrQuoridorView.svelte";

  const game_row_size = 9;
  const game_player_size = 2;
  const ql = new HrQuoridorLayout(game_row_size);

  let current_player_id = 0; // 0-index

  let pawn_map: Cell[][]; // (y,x):位置 value:pawnのplayer_id(ex, 0,1) -1のとき非表示
  let vertical_wall_map: Cell[][]; // (y,x):位置 value:色 0のとき非表示
  let real_horizontal_wall: number[][]; // (y,x):位置 value:色 0のとき非表示
  let ghost_horizontal_wall: number[][];

  pawn_map = [...Array(game_row_size)].map(() =>
    Array(game_row_size).fill(Ghost)
  ); // size(n,n)
  pawn_map[0][0] = Piece(0, false);
  pawn_map[2][2] = Piece(1, false);

  vertical_wall_map = [...Array(game_row_size - 1)].map(() =>
    Array(game_row_size - 1).fill(Ghost)
  ); // size(n-1,n-1)
  real_horizontal_wall = [...Array(game_row_size - 1)].map(() =>
    Array(game_row_size - 1).fill(-1)
  ); // size(n-1,n-1)
  ghost_horizontal_wall = [...Array(game_row_size - 1)].map(() =>
    Array(game_row_size - 1).fill(1)
  ); // size(n-1,n-1)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function clickCell(event: any): void {
    const cy = event.detail.cy;
    const cx = event.detail.cx;
    let [y, x] = ql.toIndex(cy, cx);
    if (ql.isPCell(cy, cx)) {
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
      let vertical_wall__map = Object.assign([], vertical_wall_map);
      if (y === game_row_size - 1) y--;
      vertical_wall__map[y][x] = Piece(current_player_id, false);
      vertical_wall_map = vertical_wall__map;
    } else if (ql.isHCell(cy, cx)) {
      let real_horizontal_wall_ = Object.assign([], real_horizontal_wall);
      if (x === game_row_size - 1) x--;
      real_horizontal_wall_[y][x] = current_player_id;
      real_horizontal_wall = real_horizontal_wall_;
    }
    // FIXME: switch only when state changed
    current_player_id = (current_player_id + 1) % game_player_size;
  }
</script>

<div style="height: 500px; width:500px; margin: 0px; padding: 0px;">
  <HrQuoridorView
    {game_row_size}
    {current_player_id}
    {pawn_map}
    {vertical_wall_map}
    {real_horizontal_wall}
    {ghost_horizontal_wall}
    on:clickCell={clickCell}
  />
</div>
