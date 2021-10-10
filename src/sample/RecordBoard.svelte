<script lang="ts">
  import BoardView from "../BoardView.svelte";
  import { Game2p } from "../GameLogic2p";
  import type { PieceType, Position } from "../Model";

  export let board_size = "500px";
  export let grid_size = 9;

  let game = new Game2p(grid_size);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function clickCell(event: any): void {
    const pieceType: PieceType = event.detail.pieceType;
    const next: Position = event.detail.nextPosition;
    if (game.handleTurn(pieceType, next)) {
      game.nextTurn();
      game = game; // trigger render
      console.log(JSON.stringify(game));
    }
  }

  $: grid_size = game.grid_size;
  $: current_player_id = game.current_player;
  $: board = game.board;
</script>

<div style="--board-area: {board_size}">
  <BoardView {grid_size} {current_player_id} {board} on:clickCell={clickCell} />
</div>

<style>
  div {
    height: var(--board-area);
    width: var(--board-area);
  }
</style>
