<script lang="ts">
  import HrQuoridorView from "./HrQuoridorView.svelte";

  const game_row_size = 9;
  let player_index = 1;

  let real_pawn: any[][]; // (y,x):位置 value:pawnのplayer_id(ex, 1-2) 0のとき非表示
  let last_pawn_position: any = {}; // key:player_id, value [y,x]
  let real_vertical_wall: number[][]; // (y,x):位置 value:色 0のとき非表示
  let real_horizontal_wall: number[][]; // (y,x):位置 value:色 0のとき非表示
  let ghost_pawn: number[][];
  let ghost_vertical_wall: number[][];
  let ghost_horizontal_wall: number[][];

  real_pawn = [...Array(game_row_size)].map(() =>
    [...Array(game_row_size)].map(() => Object.assign({}))
  ); // size(n,n)
  real_pawn[0][0].key = 1;
  real_pawn[2][2].key = 2;
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

  $: inner_n = game_row_size * 2 + 1;
  function isMargin(i: number): boolean {
    return i === 0 || i === inner_n - 1; // first or last
  }
  function isPath(i: number): boolean {
    return i % 2 === 0 && !isMargin(i);
  }
  function toIndex(cy: number, cx: number): [number, number] {
    // PCell, VCell, HCellをすべて0始まりのindexに
    // marginは、-1 や game_row_size-1 になったりする
    const y = Math.floor((cy - 1) / 2);
    const x = Math.floor((cx - 1) / 2);
    return [y, x];
  }

  // PCell : where a pawn can be exist
  function hasPCell(i: number): boolean {
    return !isMargin(i) && !isPath(i);
  }
  function isPCell(cy: number, cx: number): boolean {
    return hasPCell(cx) && hasPCell(cy);
  }
  function hasRealPawn(map: any, cy: number, cx: number): boolean {
    const [y, x] = toIndex(cy, cx);
    return isPCell(cx, cy) && Object.keys(map[y][x]).length !== 0;
  }
  function getRealPawn(map: any, cy: number, cx: number): any {
    const [y, x] = toIndex(cy, cx);
    if (hasRealPawn(map, cy, cx)) {
      return map[y][x];
    } else {
      return {};
    }
  }
  function hasGhostPawn(map: any, cy: number, cx: number): boolean {
    const [y, x] = toIndex(cy, cx);
    return isPCell(cx, cy) && map[y][x] === 1;
  }

  // VCell : where a vertical wall can be exist
  function isVCell(cy: number, cx: number): boolean {
    return hasPCell(cy) && isPath(cx);
  }
  function getVerticalWall(map: any, cy: number, cx: number): number {
    let [y, x] = toIndex(cy, cx);
    if (!isVCell(cy, cx) || y === game_row_size - 1) return 0;
    return map[y][x];
  }
  function hasGhostVerticalWall(map: any, cy: number, cx: number): boolean {
    let [y, x] = toIndex(cy, cx);
    if (y === game_row_size - 1) y--;
    return isVCell(cy, cx) && map[y][x] === 1;
  }

  // HCell : where a horizontal wall can be exist
  function isHCell(cy: number, cx: number): boolean {
    return isPath(cy) && hasPCell(cx);
  }
  function getHorizontalWall(map: any, cy: number, cx: number): number {
    let [y, x] = toIndex(cy, cx);
    if (!isHCell(cy, cx) || x === game_row_size - 1) return 0;
    return map[y][x];
  }
  function hasGhostHorizontalWall(map: any, cy: number, cx: number): boolean {
    let [y, x] = toIndex(cy, cx);
    if (x === game_row_size - 1) x--;
    return isHCell(cy, cx) && map[y][x] === 1;
  }

  function clickCell(event: any): any {
    const cy = event.detail.cy;
    const cx = event.detail.cx;
    let [y, x] = toIndex(cy, cx);
    if (isPCell(cy, cx)) {
      let real_pawn_ = JSON.parse(JSON.stringify(real_pawn)); // deep copy
      const [prey, prex] = last_pawn_position[player_index];
      real_pawn_[prey][prex] = {};
      real_pawn_[y][x].key = player_index;
      real_pawn = real_pawn_;
      last_pawn_position[player_index] = [y, x];
    } else if (isVCell(cy, cx)) {
      let real_vertical_wall_ = Object.assign([], real_vertical_wall);
      if (y === game_row_size - 1) y--;
      real_vertical_wall_[y][x] = player_index;
      real_vertical_wall = real_vertical_wall_;
    } else if (isHCell(cy, cx)) {
      let real_horizontal_wall_ = Object.assign([], real_horizontal_wall);
      if (x === game_row_size - 1) x--;
      real_horizontal_wall_[y][x] = player_index;
      real_horizontal_wall = real_horizontal_wall_;
    }
    player_index = player_index === 1 ? 2 : 1;
  }
</script>

<div style="height: 500px; width:500px; margin: 0px; padding: 0px;">
  <HrQuoridorView
    {game_row_size}
    {player_index}
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
