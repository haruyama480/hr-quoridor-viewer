export type CellType = "none" | "ghost" | "piece";
export interface Cell {
  kind: CellType;
  player_id: number;
  notable: boolean;
}
export const None: Cell = { kind: "none", player_id: -1, notable: false };
export const Ghost: Cell = { kind: "ghost", player_id: -1, notable: false };
export function Piece(pid: number, ntb: boolean): Cell {
  return { kind: "piece", player_id: pid, notable: ntb };
}

export type Position = [number, number];
export type Grid = Cell[][];
export function gmap(grid: Grid, f: (Cell) => Cell): Grid {
  return grid.map((row) => row.map((cell) => f(cell)));
}

export type GridTypeEnum = "unknown" | "pawn" | "vwall" | "hwall";
export interface GridType {
  kind: GridTypeEnum;
}
export const UNKNOWN: GridType = { kind: "unknown" };
export const Pawn: GridType = { kind: "pawn" };
export const VWall: GridType = { kind: "vwall" };
export const HWall: GridType = { kind: "hwall" };

export interface Board {
  pawn: Grid;
  vertical_wall: Grid;
  horizontal_wall: Grid;
}

export class GridLayout {
  grid_size: number;
  cell_size: number;
  constructor(grid_size: number) {
    this.grid_size = grid_size;
    this.cell_size = grid_size * 2 + 1;
  }
  public isMargin(i: number): boolean {
    return i === 0 || i === this.cell_size - 1; // first or last
  }
  public isPath(i: number): boolean {
    return i % 2 === 0 && !this.isMargin(i);
  }
  public toGridIndex(cy: number, cx: number): [GridType, Position] {
    let gt: GridType = UNKNOWN;
    if (this.isPCell(cy, cx)) {
      gt = Pawn;
    } else if (this.isVCell(cy, cx)) {
      gt = VWall;
    } else if (this.isHCell(cy, cx)) {
      gt = HWall;
    }
    // PCell, VCell, HCellをすべて0始まりのindexに
    // marginは、-1 や grid_size-1 になったりする
    const y = Math.floor((cy - 1) / 2);
    const x = Math.floor((cx - 1) / 2);
    return [gt, [y, x]];
  }

  // PCell : where a pawn can be exist
  public hasPCell(i: number): boolean {
    return !this.isMargin(i) && !this.isPath(i);
  }
  public isPCell(cy: number, cx: number): boolean {
    return this.hasPCell(cx) && this.hasPCell(cy);
  }
  public getPawn(map: Grid, cy: number, cx: number): Cell {
    const [gt, [y, x]] = this.toGridIndex(cy, cx);
    if (gt.kind !== "pawn") {
      return None;
    } else {
      return map[y][x];
    }
  }

  // VCell : where a vertical wall can be exist
  public isVCell(cy: number, cx: number): boolean {
    return this.hasPCell(cy) && this.isPath(cx);
  }
  public getVerticalWall(map: Grid, cy: number, cx: number): Cell {
    // eslint-disable-next-line prefer-const
    const [gt, [y, x]] = this.toGridIndex(cy, cx);
    if (gt.kind !== "vwall" || y === this.grid_size - 1) return None;
    return map[y][x];
  }

  // HCell : where a horizontal wall can be exist
  public isHCell(cy: number, cx: number): boolean {
    return this.isPath(cy) && this.hasPCell(cx);
  }
  public getHorizontalWall(map: Grid, cy: number, cx: number): Cell {
    // eslint-disable-next-line prefer-const
    const [gt, [y, x]] = this.toGridIndex(cy, cx);
    if (gt.kind !== "hwall" || x === this.grid_size - 1) return None;
    return map[y][x];
  }
}
