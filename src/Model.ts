export type ViewType = "none" | "ghost" | "piece";
export interface Cell {
  kind: ViewType;
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

export type PieceTypeEnum = "unknown" | "pawn" | "vwall" | "hwall";
export interface PieceType {
  kind: PieceTypeEnum;
}
export const UNKNOWN: PieceType = { kind: "unknown" };
export const Pawn: PieceType = { kind: "pawn" };
export const VWall: PieceType = { kind: "vwall" };
export const HWall: PieceType = { kind: "hwall" };

export interface Step {
  piece: PieceType;
  from: Position;
  to: Position;
}
