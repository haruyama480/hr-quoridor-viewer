import type { Cell, Grid, PieceType, Position } from "./Model";
import { HWall, None, Pawn, UNKNOWN, VWall } from "./Model";

// helper class which handles between HTML element index and grid index
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
  public toGridIndex(cy: number, cx: number): [PieceType, Position] {
    let gt: PieceType = UNKNOWN;
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
