<script lang="ts">
  import RecordBoard from "./sample/RecordBoard.svelte";
</script>

<div class="board">
  <RecordBoard
    grid_size={9}
    board_size="100%"
    history_="e2,e8,d1v,c1v,b1v,a1v,e1v,f1v,g1v,h1v,h2h,f2h,h3h,h5h,h4h,h6h,h7h,h8h,f8h,d8h,f7h"
    step_={2}
  />
</div>

<style>
  .board {
    height: 400px;
    width: 400px;
    margin: auto;
  }
</style>
