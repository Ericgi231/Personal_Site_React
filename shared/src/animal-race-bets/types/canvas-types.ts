export interface SpriteData {
  img: HTMLImageElement;
  transform: TransformInfo;
}

export interface TransformInfo {
  coordinates: {x: number, y:number};
  size?: {w: number, h: number};
  flipped?: boolean;
}