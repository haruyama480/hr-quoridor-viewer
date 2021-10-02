<script lang="ts">
  export let game_row_size: number;
  game_row_size = 5;
  $: inner_n = game_row_size * 2 + 1;

  let real_pawn: any[][]; // (y,x):位置 value:pawnのplayer_id(ex, 1-2) 0のとき非表示
  // let real_wall: number[][]; // (y,x):位置 value:色 0のとき非表示
  let ghost_pawn: number[][];
  let ghost_vertical_wall: number[][];
  let ghost_horizontal_wall: number[][];

  real_pawn = [...Array(game_row_size)].map(() =>
    [...Array(game_row_size)].map(() => Object.assign({}))
  ); // size(n,n)
  real_pawn[0][0].key = 1;

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

  function isMargin(i: number): boolean {
    return i === 0 || i === inner_n - 1; // first or last
  }
  function isPath(i: number): boolean {
    return i % 2 === 0 && !isMargin(i);
  }
  function toIndex(cy: number, cx: number): [number, number] {
    // Cellは0始まりのindexに
    // Pathも0始まりのindexに
    // 手前のmarginは、-1になる
    const y = Math.floor((cy - 1) / 2);
    const x = Math.floor((cx - 1) / 2);
    return [y, x];
  }
  function hasPCell(i: number): boolean {
    // PCell is for cell where pawn can be exists
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
  function hasGhostVerticalWall(map: any, cy: number, cx: number): boolean {
    const [y, x] = toIndex(cy, cx);
    if (y === game_row_size - 1) {
      return isPath(cx) && hasPCell(cy) && map[y - 1][x] === 1;
    } else {
      return isPath(cx) && hasPCell(cy) && map[y][x] === 1;
    }
  }
  function hasGhostHorizontalWall(map: any, cy: number, cx: number): boolean {
    const [y, x] = toIndex(cy, cx);
    if (x === game_row_size - 1) {
      return hasPCell(cx) && isPath(cy) && map[y][x - 1] === 1;
    } else {
      return hasPCell(cx) && isPath(cy) && map[y][x] === 1;
    }
  }
  function handleMouseEnter(cy: number, cx: number): any {
    return (event: any) => {
      console.log(cx, cy, event);
    };
  }
  function handleClick(cy: number, cx: number): any {
    return (event: any) => {
      if (!isPCell(cx, cy)) return;
      const [y, x] = toIndex(cy, cx);
      let real_pawn_ = [...Array(game_row_size)].map(() =>
        [...Array(game_row_size)].map(() => Object.assign({}))
      );
      real_pawn_[y][x].key = 1;
      console.log(y, x, event, real_pawn_);
      real_pawn = real_pawn_;
    };
  }

  // FOR ANIMATION
  import { quintOut } from "svelte/easing";
  import { crossfade } from "svelte/transition";
  const [send, receive] = crossfade({
    duration: (d) => Math.sqrt(d * 700),

    fallback(node) {
      const style = getComputedStyle(node);
      const transform = style.transform === "none" ? "" : style.transform;

      return {
        duration: 6000,
        easing: quintOut,
        css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`,
      };
    },
  });
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
          on:mouseenter={handleMouseEnter(y, x)}
          on:click={handleClick(y, x)}
        >
          <div class="cell" style="height: 100%; width:100%;">
            {#if isPCell(y, x)}
              {#if hasRealPawn(real_pawn, y, x)}
                <div
                  class="pawn"
                  in:receive={getRealPawn(real_pawn, y, x)}
                  out:send={getRealPawn(real_pawn, y, x)}
                />
              {:else if hasGhostPawn(ghost_pawn, y, x)}
                <div class="ghost pawn" />
              {/if}
            {:else if hasGhostVerticalWall(ghost_vertical_wall, y, x)}
              <div
                class="ghost verticalWall"
                class:lastVerticalWall={y === inner_n - 2}
              />
            {:else if hasGhostHorizontalWall(ghost_horizontal_wall, y, x)}
              <div
                class="ghost horizontalWall"
                class:lastHorizontalWall={x === inner_n - 2}
              />
            {/if}
          </div>
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
    position: relative;
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
    position: absolute;
    top: 20%;
    left: 20%;
    height: 60%;
    width: 60%;
    border-radius: 50%;
    background: #000;
    z-index: 1;
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
