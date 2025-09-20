import { TransformInfo } from "./canvas-types";

export interface MaskData {
  width: number;
  height: number;
  data: string;
}

export interface AnimalData {
  id: string;
  name: string;
  tag: string;
  species: string;
  color: string;
  friendIds?: string[];
  rivalIds?: string[];
  description?: string;
  status?: string;
}

export interface TrackData {
  id: string;
  animalPositions: TransformInfo[];
  goalPosition: TransformInfo;
}

export interface IntermissionData {
  id: string;
  animalPositions: TransformInfo[];
}

export interface ObjectData {
  id: string;
  description?: string;
}