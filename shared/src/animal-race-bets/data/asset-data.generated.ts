import { IntermissionData, AnimalData, TrackData, ObjectData } from '../types/index';

export const ANIMAL_MAP: Record<string, AnimalData> = {
  "cow1": {
    "id": "cow1",
    "name": "Merciless Harvest",
    "tag": "MEH",
    "species": "Cow",
    "color": "#FFFFFF",
    "description": "",
    "friendIds": [],
    "rivalIds": [],
    "status": "Alive"
  },
  "frog1": {
    "id": "frog1",
    "name": "Raphael Cortez Alexander III",
    "tag": "III",
    "species": "Frog",
    "color": "#FFFFFF",
    "description": "",
    "friendIds": [],
    "rivalIds": [],
    "status": "Alive"
  },
  "horse1": {
    "id": "horse1",
    "name": "Raphael Cortez Alexander III",
    "tag": "III",
    "species": "Frog",
    "color": "#FFFFFF",
    "description": "",
    "friendIds": [],
    "rivalIds": [],
    "status": "Alive"
  },
  "rat1": {
    "id": "rat1",
    "name": "Raphael Cortez Alexander III",
    "tag": "III",
    "species": "Frog",
    "color": "#FFFFFF",
    "description": "",
    "friendIds": [],
    "rivalIds": [],
    "status": "Alive"
  },
  "snail1": {
    "id": "snail1",
    "name": "Raphael Cortez Alexander III",
    "tag": "III",
    "species": "Frog",
    "color": "#FFFFFF",
    "description": "",
    "friendIds": [],
    "rivalIds": [],
    "status": "Alive"
  }
} as const;

export const TRACK_MAP: Record<string, TrackData> = {
  "club1": {
    "id": "club1",
    "animalPositions": [
      {
        "coordinates": {
          "x": 200,
          "y": 200
        }
      },
      {
        "coordinates": {
          "x": 200,
          "y": 300
        }
      }
    ],
    "goalPosition": {
      "coordinates": {
        "x": 1200,
        "y": 300
      }
    }
  },
  "club2": {
    "id": "club2",
    "animalPositions": [
      {
        "coordinates": {
          "x": 200,
          "y": 200
        }
      },
      {
        "coordinates": {
          "x": 200,
          "y": 300
        }
      }
    ],
    "goalPosition": {
      "coordinates": {
        "x": 1200,
        "y": 800
      }
    }
  },
  "forest1": {
    "id": "forest1",
    "animalPositions": [
      {
        "coordinates": {
          "x": 200,
          "y": 200
        }
      },
      {
        "coordinates": {
          "x": 200,
          "y": 300
        }
      }
    ],
    "goalPosition": {
      "coordinates": {
        "x": 1400,
        "y": 1550
      }
    }
  },
  "forest2": {
    "id": "forest2",
    "animalPositions": [
      {
        "coordinates": {
          "x": 200,
          "y": 200
        }
      },
      {
        "coordinates": {
          "x": 200,
          "y": 300
        }
      }
    ],
    "goalPosition": {
      "coordinates": {
        "x": 300,
        "y": 1500
      }
    }
  }
} as const;

export const OBJECT_MAP: Record<string, ObjectData> = {
  "goal": {
    "id": "goal",
    "description": "#1 Trophy"
  }
} as const;

export const INTERMISSION_MAP: Record<string, IntermissionData> = {
  "tea-time": {
    "id": "tea-time",
    "animalPositions": [
      {
        "coordinates": {
          "x": 490,
          "y": 960
        },
        "size": {
          "w": 288,
          "h": 288
        }
      },
      {
        "coordinates": {
          "x": 1460,
          "y": 950
        },
        "size": {
          "w": 288,
          "h": 288
        },
        "flipped": true
      }
    ]
  }
} as const;

