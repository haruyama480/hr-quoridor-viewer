
export type CellType = 'none' | 'ghost' | 'piece'
export interface Cell {
  kind: CellType;
  player_id: number;
  notable: boolean;
}
export const None : Cell = {kind: "none", player_id: -1, notable: false};
export const Ghost : Cell = {kind: "ghost", player_id: -1, notable: false};
export const Piece : (pid: number, ntb: boolean) => Cell = (pid, ntb) => {return {kind: "piece", player_id: pid, notable: ntb}};

export class HrQuoridorLayout {
  game_size: number;
  cell_size: number;
  constructor(game_size: number) {
    this.game_size = game_size;
    this.cell_size = game_size * 2 + 1;
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
  public getPawn(map: Cell[][], cy: number, cx: number): Cell {
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
  public getVerticalWall(map: Cell[][], cy: number, cx: number): Cell {
    // eslint-disable-next-line prefer-const
    let [y, x] = this.toIndex(cy, cx);
    if (!this.isVCell(cy, cx) || y === this.game_size - 1) return None;
    return map[y][x];
  }

  // HCell : where a horizontal wall can be exist
  public isHCell(cy: number, cx: number): boolean {
    return this.isPath(cy) && this.hasPCell(cx);
  }
  public getHorizontalWall(map: number[][], cy: number, cx: number): number {
    // eslint-disable-next-line prefer-const
    let [y, x] = this.toIndex(cy, cx);
    if (!this.isHCell(cy, cx) || x === this.game_size - 1) return -1;
    return map[y][x];
  }
  public hasGhostHorizontalWall(map: number[][], cy: number, cx: number): boolean {
    // eslint-disable-next-line prefer-const
    let [y, x] = this.toIndex(cy, cx);
    if (x === this.game_size - 1) x--;
    return this.isHCell(cy, cx) && map[y][x] === 1;
  }
}
