export type CellType = "none" | "ghost" | "piece";
export interface Cell {
  kind: CellType;
  player_id: number;
  notable: boolean;
}
export const None: Cell = { kind: "none", player_id: -1, notable: false };
export const Ghost: Cell = { kind: "ghost", player_id: -1, notable: false };
export const Piece: (pid: number, ntb: boolean) => Cell = (pid, ntb) => {
  return { kind: "piece", player_id: pid, notable: ntb };
};
export const matchCell: (c1: Cell, kind: CellType, pid: number) => boolean = (
  c1,
  kind,
  pid
) => {
  if (kind === "none" || kind === "ghost") return c1.kind === kind;
  return c1.kind === kind && c1.player_id === pid;
};

export type Grid = Cell[][];
export const gmap: (grid: Grid, f: (Cell) => Cell) => Grid = (grid, f) => {
  return grid.map((row) => row.map((cell) => f(cell)));
};

export class HrQuoridorLayout {
  game_size: number;
  cell_size: number;
  constructor(game_size: number) {
    this.game_size = game_size;
    this.cell_size = game_size * 2 + 1;
  }

  public initState(): {
    pawn_map: Grid;
    pawn_position: [number, number][]; // supports only 2-player game
    vertical_wall_map: Grid;
    horizontal_wall_map: Grid;
  } {
    const n = this.game_size;
    const pawn_map = [...Array(n)].map(() => Array(n).fill(Ghost)); // size(n,n)
    const center = Math.floor(n / 2);
    const pawn_position = [
      [0, center],
      [n - 1, center],
    ];
    pawn_map[0][center] = Piece(0, false);
    pawn_map[n - 1][center] = Piece(1, false);

    const vertical_wall_map = [...Array(n - 1)].map(() =>
      Array(n - 1).fill(Ghost)
    ); // size(n-1,n-1)
    const horizontal_wall_map = [...Array(n - 1)].map(() =>
      Array(n - 1).fill(Ghost)
    ); // size(n-1,n-1)

    return {
      pawn_map,
      pawn_position,
      vertical_wall_map,
      horizontal_wall_map,
    };
  }

  public isMargin(i: number): boolean {
    return i === 0 || i === this.cell_size - 1; // first or last
  }
  public isPath(i: number): boolean {
    return i % 2 === 0 && !this.isMargin(i);
  }
  public toIndex(cy: number, cx: number): [number, number] {
    // PCell, VCell, HCellをすべて0始まりのindexに
    // marginは、-1 や game_size-1 になったりする
    const y = Math.floor((cy - 1) / 2);
    const x = Math.floor((cx - 1) / 2);
    return [y, x];
  }

  // PCell : where a pawn can be exist
  public hasPCell(i: number): boolean {
    return !this.isMargin(i) && !this.isPath(i);
  }
  public isPCell(cy: number, cx: number): boolean {
    return this.hasPCell(cx) && this.hasPCell(cy);
  }
  public getPawn(map: Grid, cy: number, cx: number): Cell {
    const [y, x] = this.toIndex(cy, cx);
    if (this.isPCell(cy, cx)) {
      return map[y][x];
    } else {
      return None;
    }
  }

  // VCell : where a vertical wall can be exist
  public isVCell(cy: number, cx: number): boolean {
    return this.hasPCell(cy) && this.isPath(cx);
  }
  public getVerticalWall(map: Grid, cy: number, cx: number): Cell {
    // eslint-disable-next-line prefer-const
    let [y, x] = this.toIndex(cy, cx);
    if (!this.isVCell(cy, cx) || y === this.game_size - 1) return None;
    return map[y][x];
  }

  // HCell : where a horizontal wall can be exist
  public isHCell(cy: number, cx: number): boolean {
    return this.isPath(cy) && this.hasPCell(cx);
  }
  public getHorizontalWall(map: Grid, cy: number, cx: number): Cell {
    // eslint-disable-next-line prefer-const
    let [y, x] = this.toIndex(cy, cx);
    if (!this.isHCell(cy, cx) || x === this.game_size - 1) return None;
    return map[y][x];
  }
}
