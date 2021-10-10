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

export interface Board {
  pawn: Grid;
  vertical_wall: Grid;
  horizontal_wall: Grid;
}

export type GridTypeEnum = "unknown" | "pawn" | "vwall" | "hwall";
export interface GridType {
  kind: GridTypeEnum;
}
export const UNKNOWN: GridType = { kind: "unknown" };
export const Pawn: GridType = { kind: "pawn" };
export const VWall: GridType = { kind: "vwall" };
export const HWall: GridType = { kind: "hwall" };
