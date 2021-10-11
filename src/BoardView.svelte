<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { quintOut } from "svelte/easing";
  import { crossfade, scale } from "svelte/transition";
  import { GridLayout } from "./Layout";
  import type { Board, PieceType, Position } from "./Model";

  export let grid_size = 9;
  export let current_player_id = 0;
  export let option_same_wall_color = false;
  const ql = new GridLayout(grid_size);

  export let board: Board;
  $: pawn = board.pawn;
  $: vwall = board.vertical_wall;
  $: hwall = board.horizontal_wall;

  // HANDLER
  const dispatch = createEventDispatcher();
  function hoverCell(cy: number, cx: number): () => void {
    return () => {
      let pieceType: PieceType;
      let nextPosition: Position;
      [pieceType, nextPosition] = ql.toGridIndex(cy, cx);
      dispatch("hoverCell", {
        pieceType,
        nextPosition,
        cx, // to handle clicked margin
        cy,
      });
    };
  }
  function clickCell(cy: number, cx: number): () => void {
    return () => {
      let pieceType: PieceType;
      let nextPosition: Position;
      [pieceType, nextPosition] = ql.toGridIndex(cy, cx);
      dispatch("clickCell", {
        pieceType,
        nextPosition,
        cx, // to handle clicked margin
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
            <div class="cell">
              {#if ql.isPCell(y, x)}
                {#if ql.getPawn(pawn, y, x).kind === "piece"}
                  <div
                    class="pawn player{ql.getPawn(pawn, y, x).player_id}"
                    in:receive={{ key: ql.getPawn(pawn, y, x).player_id }}
                    out:send={{ key: ql.getPawn(pawn, y, x).player_id }}
                  />
                {:else if ql.getPawn(pawn, y, x).kind === "ghost"}
                  <div class="ghost pawn player{current_player_id}" />
                {/if}
              {:else if ql.isVCell(y, x)}
                {#if ql.getVerticalWall(vwall, y, x).kind === "piece"}
                  <div
                    class="verticalWall"
                    class:player0={ql.getVerticalWall(vwall, y, x).player_id ===
                      0 || option_same_wall_color}
                    class:player1={ql.getVerticalWall(vwall, y, x).player_id ===
                      1 && !option_same_wall_color}
                    transition:scale
                  />
                {:else if ql.getVerticalWall(vwall, y, x).kind === "ghost"}
                  <div
                    class="ghost verticalWall player{current_player_id}"
                    class:player0={current_player_id === 0 ||
                      option_same_wall_color}
                    class:player1={current_player_id === 1 &&
                      !option_same_wall_color}
                  />
                {/if}
              {:else if ql.isHCell(y, x)}
                {#if ql.getHorizontalWall(hwall, y, x).kind === "piece"}
                  <div
                    class="horizontalWall"
                    class:player0={ql.getHorizontalWall(hwall, y, x)
                      .player_id === 0 || option_same_wall_color}
                    class:player1={ql.getHorizontalWall(hwall, y, x)
                      .player_id === 1 && !option_same_wall_color}
                    transition:scale
                  />
                {:else if ql.getHorizontalWall(hwall, y, x).kind === "ghost"}
                  <div
                    class="ghost horizontalWall"
                    class:player0={current_player_id === 0 ||
                      option_same_wall_color}
                    class:player1={current_player_id === 1 &&
                      !option_same_wall_color}
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
    height: 100%;
    width: 100%;
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
    /* border: 1px solid gray; */
    /* box-sizing: border-box; */
    z-index: 1;
  }

  .cell {
    position: relative;
  }
  .verticalWall,
  .horizontalWall {
    position: absolute;
    border-radius: 5px;
    /* border: 1px solid gray;
    box-sizing: border-box; */
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

  .ghost {
    opacity: 0.4;
    visibility: hidden;
  }

  div:hover > .ghost {
    visibility: visible;
  }

  .player0 {
    background: #fff;
  }
  .player1 {
    background: #2a2a2a;
  }
</style>
