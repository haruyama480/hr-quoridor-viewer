<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { quintOut } from "svelte/easing";
  import { crossfade } from "svelte/transition";
  import { HrQuoridorLayout } from "./HrQuoridorLayout";

  export let game_row_size = 5;
  export let current_player_id = 1;
  const ql = new HrQuoridorLayout(game_row_size);

  export let real_pawn: number[][]; // (y,x):位置 value:pawnのplayer_id(ex, 1-2) 0のとき非表示
  export let real_vertical_wall: number[][]; // (y,x):位置 value:色 0のとき非表示
  export let real_horizontal_wall: number[][]; // (y,x):位置 value:色 0のとき非表示
  export let ghost_pawn: number[][];
  export let ghost_vertical_wall: number[][];
  export let ghost_horizontal_wall: number[][];
  $: rvwall = real_vertical_wall; // for html
  $: rhwall = real_horizontal_wall;

  // HANDLER
  const dispatch = createEventDispatcher();
  function hoverCell(cy: number, cx: number): () => void {
    return () => {
      dispatch("hoverCell", {
        cx,
        cy,
      });
    };
  }
  function clickCell(cy: number, cx: number): () => void {
    return () => {
      dispatch("clickCell", {
        cx,
        cy,
      });
    };
  }

  // ANIMATION
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
  {#each Array.from({ length: ql.cell_size }, (_, i) => ql.cell_size - i - 1) as y}
    <div
      class="columnContainer"
      class:rowPCell={ql.hasPCell(y)}
      class:rowPath={ql.isPath(y)}
      class:rowMargin={ql.isMargin(y)}
    >
      {#each Array.from({ length: ql.cell_size }, (_, i) => i) as _, x}
        <div
          class:columnPCell={ql.hasPCell(x)}
          class:columnPath={ql.isPath(x)}
          class:columnMargin={ql.isMargin(x)}
          on:mouseenter={hoverCell(y, x)}
          on:click={clickCell(y, x)}
        >
          {#if !ql.isMargin(y) && !ql.isMargin(x)}
            <div class="cell" style="height: 100%; width:100%;">
              {#if ql.isPCell(y, x)}
                {#if ql.getRealPawn(real_pawn, y, x) !== 0}
                  <div
                    class="pawn player{ql.getRealPawn(real_pawn, y, x)}"
                    in:receive={{ key: ql.getRealPawn(real_pawn, y, x) }}
                    out:send={{ key: ql.getRealPawn(real_pawn, y, x) }}
                  />
                {:else if ql.hasGhostPawn(ghost_pawn, y, x)}
                  <div class="ghost pawn player{current_player_id}" />
                {/if}
              {:else if ql.isVCell(y, x)}
                {#if ql.getVerticalWall(rvwall, y, x) !== 0}
                  <div
                    class="verticalWall player{ql.getVerticalWall(
                      rvwall,
                      y,
                      x
                    )}"
                  />
                {:else if ql.hasGhostVerticalWall(ghost_vertical_wall, y, x)}
                  <div
                    class="ghost verticalWall player{current_player_id}"
                    class:lastVerticalWall={y === ql.cell_size - 2}
                  />
                {/if}
              {:else if ql.isHCell(y, x)}
                {#if ql.getHorizontalWall(rhwall, y, x) !== 0}
                  <div
                    class="horizontalWall player{ql.getHorizontalWall(
                      rhwall,
                      y,
                      x
                    )}"
                  />
                {:else if ql.hasGhostHorizontalWall(ghost_horizontal_wall, y, x)}
                  <div
                    class="ghost horizontalWall player{current_player_id}"
                    class:lastHorizontalWall={x === ql.cell_size - 2}
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
    background-color: rgb(152 177 191);
  }
  .rowPath,
  .columnPath,
  .rowMargin :not(.columnMargin),
  .columnMargin {
    background-color: rgb(177 196 207);
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
