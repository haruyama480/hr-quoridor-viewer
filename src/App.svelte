<script lang="ts">
  import { HrQuoridorLayout } from "./HrQuoridorLayout";
  import HrQuoridorView from "./HrQuoridorView.svelte";

  const game_row_size = 9;
  const game_player_size = 2;
  const ql = new HrQuoridorLayout(game_row_size);

  let current_player_id = 1; // 1-index

  let real_pawn: number[][]; // (y,x):位置 value:pawnのplayer_id(ex, 1-2) 0のとき非表示
  let last_pawn_position: any = {}; // key:player_id, value [y,x]
  let real_vertical_wall: number[][]; // (y,x):位置 value:色 0のとき非表示
  let real_horizontal_wall: number[][]; // (y,x):位置 value:色 0のとき非表示
  let ghost_pawn: number[][];
  let ghost_vertical_wall: number[][];
  let ghost_horizontal_wall: number[][];

  real_pawn = [...Array(game_row_size)].map(() => Array(game_row_size).fill(0)); // size(n,n)
  real_pawn[0][0] = 1;
  real_pawn[2][2] = 2;
  last_pawn_position[1] = [0, 0];
  last_pawn_position[2] = [2, 2];

  real_vertical_wall = [...Array(game_row_size - 1)].map(() =>
    Array(game_row_size - 1).fill(0)
  ); // size(n-1,n-1)
  real_horizontal_wall = [...Array(game_row_size - 1)].map(() =>
    Array(game_row_size - 1).fill(0)
  ); // size(n-1,n-1)
  ghost_pawn = [...Array(game_row_size)].map(() =>
    Array(game_row_size).fill(1)
  ); // size(n,n)
  ghost_pawn[0][0] = 1;
  ghost_pawn[1][1] = 1;
  ghost_vertical_wall = [...Array(game_row_size - 1)].map(() =>
    Array(game_row_size - 1).fill(1)
  ); // size(n-1,n-1)
  ghost_vertical_wall[0][0] = 1;
  ghost_vertical_wall[1][1] = 1;
  ghost_horizontal_wall = [...Array(game_row_size - 1)].map(() =>
    Array(game_row_size - 1).fill(1)
  ); // size(n-1,n-1)
  ghost_horizontal_wall[0][0] = 1;
  ghost_horizontal_wall[1][1] = 1;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function clickCell(event: any): void {
    const cy = event.detail.cy;
    const cx = event.detail.cx;
    let [y, x] = ql.toIndex(cy, cx);
    if (ql.isPCell(cy, cx)) {
      let real_pawn_ = JSON.parse(JSON.stringify(real_pawn)); // deep copy
      const [prey, prex] = last_pawn_position[current_player_id];
      real_pawn_[prey][prex] = 0;
      real_pawn_[y][x] = current_player_id;
      real_pawn = real_pawn_;
      last_pawn_position[current_player_id] = [y, x];
    } else if (ql.isVCell(cy, cx)) {
      let real_vertical_wall_ = Object.assign([], real_vertical_wall);
      if (y === game_row_size - 1) y--;
      real_vertical_wall_[y][x] = current_player_id;
      real_vertical_wall = real_vertical_wall_;
    } else if (ql.isHCell(cy, cx)) {
      let real_horizontal_wall_ = Object.assign([], real_horizontal_wall);
      if (x === game_row_size - 1) x--;
      real_horizontal_wall_[y][x] = current_player_id;
      real_horizontal_wall = real_horizontal_wall_;
    }
    current_player_id =
      current_player_id + 1 > game_player_size ? 1 : current_player_id + 1;
  }
</script>

<div style="height: 500px; width:500px; margin: 0px; padding: 0px;">
  <HrQuoridorView
    {game_row_size}
    {current_player_id}
    {real_pawn}
    {last_pawn_position}
    {real_vertical_wall}
    {real_horizontal_wall}
    {ghost_pawn}
    {ghost_vertical_wall}
    {ghost_horizontal_wall}
    on:clickCell={clickCell}
  />
</div>
