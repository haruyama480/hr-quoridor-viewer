<script lang="ts">
  export let game_row_size: number;
  game_row_size = 5;
  $: inner_n = game_row_size * 2 + 1;

  // interface Position {
  // 	y: number;
  // 	x: number;
  // }

  // let real_pawn: Position[]; // i: player(1-index)
  // let real_wall: number[][]; // (y,x):位置 value:色 0のとき非表示
  let ghost_pawn: number[][];
  let ghost_vertical_wall: number[][];
  let ghost_horizontal_wall: number[][];

  ghost_pawn = [...Array(game_row_size)].map((i) =>
    Array(game_row_size).fill(1)
  ); // fill 0 with size(n,n)
  ghost_pawn[0][0] = 1;
  ghost_pawn[1][1] = 1;
  ghost_vertical_wall = [...Array(game_row_size - 1)].map((i) =>
    Array(game_row_size - 1).fill(1)
  ); // fill 0 with size(n-1,n-1)
  ghost_vertical_wall[0][0] = 1;
  ghost_vertical_wall[1][1] = 1;
  ghost_horizontal_wall = [...Array(game_row_size - 1)].map((i) =>
    Array(game_row_size - 1).fill(1)
  ); // fill 0 with size(n-1,n-1)
  ghost_horizontal_wall[0][0] = 1;
  ghost_horizontal_wall[1][1] = 1;

  function isMargin(i: number): boolean {
    return i === 0 || i === inner_n - 1; // first or last
  }
  function isPath(i: number): boolean {
    return i % 2 === 0 && !isMargin(i);
  }
  function hasPCell(i: number): boolean {
    // PCell is for cell where pawn can be exists
    return !isMargin(i) && !isPath(i);
  }
  function isPCell(cy: number, cx: number): boolean {
    return hasPCell(cx) && hasPCell(cy);
  }
  function toIndex(cy: number, cx: number): [number, number] {
    // Cellは0始まりのindexに
    // Pathも0始まりのindexに
    // 手前のmarginは、-1になる
    const y = Math.floor((cy - 1) / 2);
    const x = Math.floor((cx - 1) / 2);
    return [y, x];
  }
  function hasGhostPawn(cy: number, cx: number): boolean {
    const [y, x] = toIndex(cy, cx);
    return isPCell(cx, cy) && ghost_pawn[x][y] === 1;
  }
  function hasGhostVerticalWall(cy: number, cx: number): boolean {
    const [y, x] = toIndex(cy, cx);
    if (y === game_row_size - 1) {
      return isPath(cx) && hasPCell(cy) && ghost_vertical_wall[x][y - 1] === 1;
    } else {
      return isPath(cx) && hasPCell(cy) && ghost_vertical_wall[x][y] === 1;
    }
  }
  function hasGhostHorizontalWall(cy: number, cx: number): boolean {
    const [y, x] = toIndex(cy, cx);
    if (x === game_row_size - 1) {
      return (
        hasPCell(cx) && isPath(cy) && ghost_horizontal_wall[x - 1][y] === 1
      );
    } else {
      return hasPCell(cx) && isPath(cy) && ghost_horizontal_wall[x][y] === 1;
    }
  }
  function handleMouseEnter(cy: number, cx: number): any {
    return (event: any) => {
      console.log(cx, cy, event);
    };
  }
  function handleClick(cy: number, cx: number): any {
    return (event: any) => {
      console.log(cx, cy, event);
    };
  }
</script>

<div class="rowContainer">
  {#each Array.from({ length: inner_n }, (_, i) => inner_n - i - 1) as y}
    <div
      class="columnContainer"
      class:rowPCell={hasPCell(y)}
      class:rowPath={isPath(y)}
      class:rowMargin={isMargin(y)}
    >
      {#each Array.from({ length: inner_n }, (_, i) => i) as _, x}
        <div
          class:columnPCell={hasPCell(x)}
          class:columnPath={isPath(x)}
          class:columnMargin={isMargin(x)}
          class="cell"
          on:mouseenter={handleMouseEnter(y, x)}
          on:click={handleClick(y, x)}
        >
          {#if hasGhostPawn(y, x)}
            <div class="ghost pawn" />
          {:else if hasGhostVerticalWall(y, x)}
            <div
              class="ghost verticalWall"
              class:lastVerticalWall={y === inner_n - 2}
            />
          {:else if hasGhostHorizontalWall(y, x)}
            <div
              class="ghost horizontalWall"
              class:lastHorizontalWall={x === inner_n - 2}
            />
          {:else}
            <div>error</div>
          {/if}
        </div>
      {/each}
    </div>
  {/each}
</div>

<style type="text/css">
  /* grid layout */
  .rowContainer {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
  .rowPCell {
    flex: 1 auto;
  }
  .rowPath {
    flex: 0.2 auto;
  }
  .rowMargin {
    flex: 0.3 auto;
  }

  .columnContainer {
    display: flex;
    flex-direction: row;
    width: 100%;
  }
  .columnPCell {
    flex: 1 auto;
  }
  .columnPath {
    flex: 0.2 auto;
  }
  .columnMargin {
    flex: 0.3 auto;
  }
  .cell {
    display: flex;
  }

  /* color */
  .rowPCell .columnPCell {
    background-color: rgb(161, 142, 128);
  }
  .rowPath,
  .columnPath,
  .rowMargin :not(.columnMargin),
  .columnMargin {
    background-color: rgb(177, 160, 146);
  }
  .rowContainer > .columnContainer:first-child > :first-child {
    border-radius: 100% 0 0 0;
  }
  .rowContainer > .columnContainer:first-child > :last-child {
    border-radius: 0 100% 0 0;
  }
  .rowContainer > .columnContainer:last-child > :last-child {
    border-radius: 0 0 100% 0;
  }
  .rowContainer > .columnContainer:last-child > :first-child {
    border-radius: 0 0 0 100%;
  }

  .pawn {
    margin: auto;
    height: 85%;
    width: 85%;
    border-radius: 50%;
    background: #000;
  }

  .cell {
    position: relative;
  }
  .verticalWall,
  .horizontalWall {
    position: absolute;
    border-radius: 10%;
    background: #000;
    z-index: 1;
  }
  .verticalWall {
    left: 7%;
    width: 86%;
    bottom: 0%;
    height: 220%;
  }
  .horizontalWall {
    left: 0%;
    width: 220%;
    bottom: 7%;
    height: 86%;
  }
  .verticalWall.lastVerticalWall {
    bottom: unset;
    top: 0%;
  }
  .horizontalWall.lastHorizontalWall {
    left: unset;
    right: 0%;
  }

  .ghost {
    opacity: 0.4;
    visibility: hidden;
  }

  div:hover > .ghost {
    visibility: visible;
  }
</style>
