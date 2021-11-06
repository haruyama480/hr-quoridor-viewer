<script lang="ts">
  import RecordBoard from "./sample/RecordBoard.svelte";

  let conianer_width = 0;
  $: content_size = Math.min(conianer_width, 500) + "px";
</script>

<div class="container" bind:clientWidth={conianer_width}>
  <div>
    <RecordBoard
      grid_size={9}
      board_size={content_size}
      showCopy={true}
      showClear={true}
      loadFromUrl={true}
      showHistory={true}
    />
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-evenly;
  }
</style>
