<script lang="ts">
  import { validatePawn, validateWall } from "./HrQuoridorGameLogic";
  import type { Grid, Position } from "./HrQuoridorLayout";
  import { Ghost, HrQuoridorLayout, None, Piece } from "./HrQuoridorLayout";
  import HrQuoridorView from "./HrQuoridorView.svelte";

  const game_grid_size = 9;
  const game_player_size = 2;
  const ql = new HrQuoridorLayout(game_grid_size);

  let current_player_id = -1; // 0-index
  let { board, current_pawn, goal } = ql.initState();

  function nextTurn() {
    current_player_id = (current_player_id + 1) % game_player_size;
    for (let y = 0; y < game_grid_size; y++) {
      for (let x = 0; x < game_grid_size; x++) {
        if (board.pawn[y][x].kind !== "piece") {
          board.pawn[y][x] = validatePawn(
            current_pawn[current_player_id],
            [y, x],
            board
          )
            ? Ghost
            : None;
        }
      }
    }
  }

  nextTurn();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function clickCell(event: any): void {
    const cy = event.detail.cy;
    const cx = event.detail.cx;
    const current: Position = current_pawn[current_player_id];
    const next: Position = ql.toIndex(cy, cx);
    let [y, x] = next;
    if (ql.isPCell(cy, cx)) {
      if (!validatePawn(current, next, board)) {
        return;
      }
      let pawn_: Grid = JSON.parse(JSON.stringify(board.pawn)); // deep copy

      const [prey, prex] = current;
      pawn_[prey][prex] = None; // from
      pawn_[y][x] = Piece(current_player_id, false); // to
      board.pawn = pawn_;
      current_pawn[current_player_id] = [y, x];
      nextTurn();
      return;
    }

    let board_ = JSON.parse(JSON.stringify(board)); // deep copy
    if (ql.isVCell(cy, cx)) {
      if (y === game_grid_size - 1) return;
      if (board.vertical_wall[y][x].kind === "piece") {
        return;
      }
      board_.vertical_wall[y][x] = Piece(current_player_id, false);
    } else if (ql.isHCell(cy, cx)) {
      if (x === game_grid_size - 1) return;
      if (board.horizontal_wall[y][x].kind === "piece") {
        return;
      }
      board_.horizontal_wall[y][x] = Piece(current_player_id, false);
    }
    if (validateWall(current_pawn, goal, board_)) {
      board = board_;
      nextTurn();
    }
  }
</script>

<div style="height: 500px; width:500px; margin: 0px; padding: 0px;">
  <HrQuoridorView
    {game_grid_size}
    {current_player_id}
    {board}
    on:clickCell={clickCell}
  />
</div>
