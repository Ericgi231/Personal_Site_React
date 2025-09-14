export interface IntermissionData {
  id: string;
  animalPositions: { x: number; y: number }[];
}

export const intermissionMap: Record<string, IntermissionData> = {
  'tea-time1': {
    id: 'tea-time1',
    animalPositions: [
      { x: 100, y: 200 },
    ],
  },
};