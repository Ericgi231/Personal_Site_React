import { PositionInfo } from "../types/canvas-types";

export interface IntermissionData {
  id: string;
  animalPositions: PositionInfo[];
}

/**
 * Map of intermission scene IDs to their data.
 */
export const INTERMISSION_MAP: Record<string, IntermissionData> = {
  'tea-time': {
    id: 'tea-time',
    animalPositions: [
      {
        position: { x: 490, y: 960 },
        flipped: false,
        size: 3,
      },
      {
        position: { x: 1460, y: 950 },
        flipped: true,
        size: 3,
      },
    ]
  },
};