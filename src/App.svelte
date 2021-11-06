<script lang="ts">
  import RecordBoard from "./sample/RecordBoard.svelte";
</script>

<div class="container">
  <div class="content">
    <RecordBoard
      grid_size={9}
      board_size="100%"
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
  .content {
    flex: 1 1 auto;
    max-width: 500px;
    aspect-ratio: 1;
  }
</style>
