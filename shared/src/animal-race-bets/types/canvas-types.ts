export interface AnimalInfo {
  filePath: string;
  positionInfo: PositionInfo;
}

export interface PositionInfo {
  position: {x: number, y:number};
  flipped: boolean;
  size: number;
}