<script lang="ts">
  import ChevronLeft from "svelte-material-icons/ChevronLeft.svelte";
  import ChevronRight from "svelte-material-icons/ChevronRight.svelte";
  import ShareVariant from "svelte-material-icons/ShareVariant.svelte";
  import TrashCan from "svelte-material-icons/TrashCan.svelte";
  import BoardView from "../BoardView.svelte";
  import { Game2p } from "../GameLogic2p";
  import type { PieceType, Position } from "../Model";
  import Clipboard from "../util/CopyClipBoard.svelte";
  export let board_size = "500px";
  export let grid_size = 9;
  export let history_ = null;
  export let step_: number = -1;
  export let showCopy: boolean = false;
  export let showClear: boolean = false;
  export let showHistory: boolean = false;
  export let loadFromUrl: boolean = false;

  let game = new Game2p(grid_size);
  const urlParams = new URLSearchParams(window.location.search);
  if (loadFromUrl === false) {
    game.loadHistory(history_, step_);
  } else if (urlParams.has("history")) {
    // true for test
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
  $: steps_str = game.dumpStep() < 0 ? "" : "&step=" + game.dumpStep();
  $: share_url =
    window.location.origin +
    window.location.pathname +
    "?history=" +
    game.dumpHistory() +
    steps_str;
</script>

<div style="width: {board_size}; height: {board_size}">
  <BoardView {grid_size} {current_player_id} {board} on:clickCell={clickCell} />
</div>
<div style="width: {board_size}">
  <button on:click={previousStep}> <ChevronLeft /> </button><button
    on:click={nextStep}><ChevronRight /></button
  >{#if showClear}<button on:click={clear}><TrashCan /></button
    >{/if}{#if showCopy}<Clipboard text={share_url} let:copy
      ><button on:click={copy}> <ShareVariant /> </button></Clipboard
    >{/if}
  <!-- agry because avoid whitespace between buttons https://svelte.dev/repl/80b8863b778c4b608537a98fb811de43?version=3.16.7 -->
</div>
<div style="width: {board_size}">
  {#if showHistory}
    <p style="margin-top: 0px;">{game.dumpHistory()}</p>
  {/if}
</div>

<style>
  button:active {
    transform: translateY(2px);
  }

  p {
    /* https://stackoverflow.com/a/5852740 */
    word-wrap: break-word; /* IE 5.5-7 */
    white-space: -moz-pre-wrap; /* Firefox 1.0-2.0 */
    white-space: pre-wrap; /* current browsers */
  }
  button {
    margin: 5px;
  }
</style>
