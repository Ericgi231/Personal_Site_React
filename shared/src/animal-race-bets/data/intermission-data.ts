import { ANIMAL_SIZE } from "../constants/canvas-constants";
import { TransformInfo } from "../types/canvas-types";

export interface IntermissionData {
  id: string;
  animals: TransformInfo[];
}

/**
 * Map of intermission scene IDs to their data.
 */
export const INTERMISSION_MAP: Record<string, IntermissionData> = {
  'tea-time': {
    id: 'tea-time',
    animals: [
      {
        pos: { x: 490, y: 960 },
        size: { w: ANIMAL_SIZE*3, h: ANIMAL_SIZE*3 },
        flipped: false,
      },
      {
        pos: { x: 1460, y: 950 },
        size: { w: ANIMAL_SIZE*3, h: ANIMAL_SIZE*3 },
        flipped: true,
      },
    ]
  },
};