<script lang="ts">
  export let game_row_size = 5;
  export let player_index = 1;
  $: inner_n = game_row_size * 2 + 1;

  export let real_pawn: any[][]; // (y,x):位置 value:pawnのplayer_id(ex, 1-2) 0のとき非表示
  export let last_pawn_position: any = {}; // key:player_id, value [y,x]
  export let real_vertical_wall: number[][]; // (y,x):位置 value:色 0のとき非表示
  export let real_horizontal_wall: number[][]; // (y,x):位置 value:色 0のとき非表示
  export let ghost_pawn: number[][];
  export let ghost_vertical_wall: number[][];
  export let ghost_horizontal_wall: number[][];
  $: rvwall = real_vertical_wall; // for html
  $: rhwall = real_horizontal_wall;

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

  // handler
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
  function hoverCell(cy: number, cx: number): any {
    return (event: any) => {
      dispatch("hoverCell", {
        event,
        cx,
        cy,
      });
    };
  }
  function clickCell(cy: number, cx: number): any {
    return (event: any) => {
      dispatch("clickCell", {
        event,
        cx,
        cy,
      });
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
          on:mouseenter={hoverCell(y, x)}
          on:click={clickCell(y, x)}
        >
          {#if !isMargin(y) && !isMargin(x)}
            <div class="cell" style="height: 100%; width:100%;">
              {#if isPCell(y, x)}
                {#if hasRealPawn(real_pawn, y, x)}
                  <div
                    class="pawn player{getRealPawn(real_pawn, y, x).key}"
                    in:receive={getRealPawn(real_pawn, y, x)}
                    out:send={getRealPawn(real_pawn, y, x)}
                  />
                {:else if hasGhostPawn(ghost_pawn, y, x)}
                  <div class="ghost pawn" />
                {/if}
              {:else if isVCell(y, x)}
                {#if getVerticalWall(rvwall, y, x) !== 0}
                  <div
                    class="verticalWall player{getVerticalWall(rvwall, y, x)}"
                  />
                {:else if hasGhostVerticalWall(ghost_vertical_wall, y, x)}
                  <div
                    class="ghost verticalWall player{player_index}"
                    class:lastVerticalWall={y === inner_n - 2}
                  />
                {/if}
              {:else if isHCell(y, x)}
                {#if getHorizontalWall(rhwall, y, x) !== 0}
                  <div
                    class="horizontalWall player{getHorizontalWall(
                      rhwall,
                      y,
                      x
                    )}"
                  />
                {:else if hasGhostHorizontalWall(ghost_horizontal_wall, y, x)}
                  <div
                    class="ghost horizontalWall player{player_index}"
                    class:lastHorizontalWall={x === inner_n - 2}
                  />
                {/if}
              {/if}
            </div>
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
  .rowMargin:first-child > .columnMargin:first-child {
    border-radius: 100% 0 0 0;
  }
  .columnContainer:first-child > .columnMargin:last-child {
    border-radius: 0 100% 0 0;
  }
  .columnContainer:last-child > .columnMargin:last-child {
    border-radius: 0 0 100% 0;
  }
  .columnContainer:last-child > .columnMargin:first-child {
    border-radius: 0 0 0 100%;
  }

  .pawn {
    position: absolute;
    top: 15%;
    left: 15%;
    height: 70%;
    width: 70%;
    border-radius: 50%;
    border: 1px solid gray;
    box-sizing: border-box;
    z-index: 1;
  }

  .cell {
    position: relative;
  }
  .verticalWall,
  .horizontalWall {
    position: absolute;
    border-radius: 10%;
    border: 1px solid gray;
    box-sizing: border-box;
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

  .player1 {
    background: #000;
  }
  .player2 {
    background: #fff;
  }
</style>
