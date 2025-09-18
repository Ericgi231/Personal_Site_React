export interface TrackData {
  id: string;
  animalPositions: { x: number; y: number }[];
  goalPosition: { x: number; y: number };
}

/**
 * Map of track IDs to their data.
 */
export const TRACK_MAP: Record<string, TrackData> = {
  'forest1': {
    id: 'forest1',
    animalPositions: [
      { x: 200, y: 300 },
      { x: 200, y: 500 },
    ],
    goalPosition: { x: 1000, y: 1000 },
  },
  'club1': {
    id: 'club1',
    animalPositions: [
      { x: 200, y: 300 },
      { x: 200, y: 500 },
    ],
    goalPosition: { x: 1000, y: 1000 },
  },
  'forest2': {
    id: 'forest2',
    animalPositions: [
      { x: 200, y: 300 },
      { x: 200, y: 500 },
    ],
    goalPosition: { x: 1000, y: 1000 },
  },
  'club2': {
    id: 'club2',
    animalPositions: [
      { x: 200, y: 300 },
      { x: 200, y: 500 },
    ],
    goalPosition: { x: 1000, y: 1000 },
  },
};