<script lang="ts">
  import BoardView from "../BoardView.svelte";
  import { Game2p } from "../GameLogic2p";
  import type { PieceType, Position } from "../Model";
  import Clipboard from "../util/CopyClipBoard.svelte";

  export let board_size = "500px";
  export let grid_size = 9;
  export let history_ = "";
  export let step_: number = -1;
  export let showCopy: boolean = false;

  let game = new Game2p(grid_size);
  const urlParams = new URLSearchParams(window.location.search);
  if (history_ !== "") {
    game.loadHistory(history_, step_);
  } else if (urlParams.has("history")) {
    const history_str = urlParams.get("history");
    const step: number = urlParams.has("step")
      ? parseInt(urlParams.get("step"))
      : -1;
    game.loadHistory(history_str, step);
    console.log(history_str);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function clickCell(event: any): void {
    const pieceType: PieceType = event.detail.pieceType;
    const next: Position = event.detail.nextPosition;
    if (game.handleTurn(pieceType, next)) {
      game.nextTurn();
      game = game; // trigger render
    }
  }

  function nextStep() {
    if (game.nextStep()) {
      game.nextTurn();
      game = game;
    }
  }
  function previousStep() {
    if (game.previousStep()) {
      game.nextTurn();
      game = game;
    }
  }
  function clear() {
    game = new Game2p(grid_size);
  }
  $: grid_size = game.grid_size;
  $: current_player_id = game.current_player;
  $: board = game.board;
  $: share_url =
    window.location.origin +
    window.location.pathname +
    "?history=" +
    game.dumpHistory();
</script>

<div style="--board-area: {board_size}">
  <BoardView {grid_size} {current_player_id} {board} on:clickCell={clickCell} />
</div>
<div style="margin: 5px; width: {board_size}">
  <button on:click={nextStep}> next </button>
  <button on:click={previousStep}> previous </button>
  {#if showCopy}
    <Clipboard text={share_url} let:copy>
      <button on:click={copy}>Copy</button>
    </Clipboard>
  {/if}
  <button on:click={clear}>Clear</button>
  <p style="margin-top: 0px;">{game.dumpHistory()}</p>
</div>

<style>
  div {
    height: var(--board-area);
    width: var(--board-area);
  }
  button:active {
    transform: translateY(2px);
  }

  p {
    /* https://stackoverflow.com/a/5852740 */
    word-wrap: break-word; /* IE 5.5-7 */
    white-space: -moz-pre-wrap; /* Firefox 1.0-2.0 */
    white-space: pre-wrap; /* current browsers */
  }
</style>
