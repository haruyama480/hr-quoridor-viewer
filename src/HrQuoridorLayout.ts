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
  public hasRealPawn(map: any, cy: number, cx: number): boolean {
    const [y, x] = this.toIndex(cy, cx);
    return this.isPCell(cx, cy) && Object.keys(map[y][x]).length !== 0;
  }
  public getRealPawn(map: any, cy: number, cx: number): any {
    const [y, x] = this.toIndex(cy, cx);
    if (this.hasRealPawn(map, cy, cx)) {
      return map[y][x];
    } else {
      return {};
    }
  }
  public hasGhostPawn(map: any, cy: number, cx: number): boolean {
    const [y, x] = this.toIndex(cy, cx);
    return this.isPCell(cx, cy) && map[y][x] === 1;
  }

  // VCell : where a vertical wall can be exist
  public isVCell(cy: number, cx: number): boolean {
    return this.hasPCell(cy) && this.isPath(cx);
  }
  public getVerticalWall(map: any, cy: number, cx: number): number {
    // eslint-disable-next-line prefer-const
    let [y, x] = this.toIndex(cy, cx);
    if (!this.isVCell(cy, cx) || y === this.game_size - 1) return 0;
    return map[y][x];
  }
  public hasGhostVerticalWall(map: any, cy: number, cx: number): boolean {
    // eslint-disable-next-line prefer-const
    let [y, x] = this.toIndex(cy, cx);
    if (y === this.game_size - 1) y--;
    return this.isVCell(cy, cx) && map[y][x] === 1;
  }

  // HCell : where a horizontal wall can be exist
  public isHCell(cy: number, cx: number): boolean {
    return this.isPath(cy) && this.hasPCell(cx);
  }
  public getHorizontalWall(map: any, cy: number, cx: number): number {
    // eslint-disable-next-line prefer-const
    let [y, x] = this.toIndex(cy, cx);
    if (!this.isHCell(cy, cx) || x === this.game_size - 1) return 0;
    return map[y][x];
  }
  public hasGhostHorizontalWall(map: any, cy: number, cx: number): boolean {
    // eslint-disable-next-line prefer-const
    let [y, x] = this.toIndex(cy, cx);
    if (x === this.game_size - 1) x--;
    return this.isHCell(cy, cx) && map[y][x] === 1;
  }
}
export default HrQuoridorLayout;
