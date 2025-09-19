import { ANIMAL_SIZE, GOAL_SIZE } from "../constants/canvas-constants";
import { TransformInfo } from "../types/canvas-types";

export interface TrackData {
  id: string;
  animals: TransformInfo[];
  goal: TransformInfo;
}

/**
 * Map of track IDs to their data.
 */
export const TRACK_MAP: Record<string, TrackData> = {
  'forest1': {
    id: 'forest1',
    animals: [
      {
        pos: { x: 200, y: 200 },
        size: { w: ANIMAL_SIZE, h: ANIMAL_SIZE },
      },
      {
        pos: { x: 200, y: 300 },
        size: { w: ANIMAL_SIZE, h: ANIMAL_SIZE },
      },
    ],
    goal: {
      pos: { x: 1000, y: 1000 },
      size: { w: GOAL_SIZE, h: GOAL_SIZE },
    },
  },
  'forest2': {
    id: 'forest2',
    animals: [
      {
        pos: { x: 200, y: 200 },
        size: { w: ANIMAL_SIZE, h: ANIMAL_SIZE },
      },
      {
        pos: { x: 200, y: 300 },
        size: { w: ANIMAL_SIZE, h: ANIMAL_SIZE },
      },
    ],
    goal: {
      pos: { x: 1000, y: 1000 },
      size: { w: GOAL_SIZE, h: GOAL_SIZE },
    },
  },
  'club1': {
    id: 'club1',
    animals: [
      {
        pos: { x: 200, y: 200 },
        size: { w: ANIMAL_SIZE, h: ANIMAL_SIZE },
      },
      {
        pos: { x: 200, y: 300 },
        size: { w: ANIMAL_SIZE, h: ANIMAL_SIZE },
      },
    ],
    goal: {
      pos: { x: 1000, y: 1000 },
      size: { w: GOAL_SIZE, h: GOAL_SIZE },
    },
  },
  'club2': {
    id: 'club2',
    animals: [
      {
        pos: { x: 200, y: 200 },
        size: { w: ANIMAL_SIZE, h: ANIMAL_SIZE },
      },
      {
        pos: { x: 200, y: 300 },
        size: { w: ANIMAL_SIZE, h: ANIMAL_SIZE },
      },
    ],
    goal: {
      pos: { x: 1000, y: 1000 },
      size: { w: GOAL_SIZE, h: GOAL_SIZE },
    },
  },
};