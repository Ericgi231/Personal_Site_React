export interface CanvasAnimation {
  frames: AnimationFrame[];
}

export interface AnimationFrame {
  sprites: SpriteData[];
}

export interface SpriteData {
  img: HTMLImageElement;
  transform: TransformInfo;
}

export interface TransformInfo {
  coordinates: {x: number, y:number};
  size?: {w: number, h: number};
  flipped?: boolean;
}