export interface TrackData {
  id: string;
  animalPositions: { x: number; y: number }[];
  goalPosition: { x: number; y: number };
}

export const trackMap: Record<string, TrackData> = {
  'forest1': {
    id: 'forest1',
    animalPositions: [
      { x: 100, y: 200 },
      { x: 100, y: 200 },
      { x: 100, y: 200 },
      { x: 100, y: 200 },
    ],
    goalPosition: { x: 200, y: 200 },
  },
};