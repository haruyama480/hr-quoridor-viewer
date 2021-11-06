<script lang="ts">
  import RecordBoard from "./sample/RecordBoard.svelte";
</script>

<RecordBoard
  grid_size={9}
  board_size="60vmin"
  showCopy={true}
  showClear={true}
  loadFromUrl={true}
  showHistory={true}
/>
