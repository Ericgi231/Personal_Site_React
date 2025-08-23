import { Realm } from "@pages/MoraJai/MoraJai.helper.js";

export type MoraJaiBox = {
  name: string;
  id: string;
  grid: Realm[];
  corners: Realm[];
};

export type MoraJaiBoxGroup = {
  location: Location;
  boxes: MoraJaiBox[];
};

enum Location {
  Estate = "Estate",
  Sanctum = "Sanctum",
  Unknown = "Unknown",
  Atelier = "Atelier",
  Spoilers = "Spoilers",
}

const RAW_MORA_JAI_BOXES: MoraJaiBoxGroup[] = [
  {
    location: Location.Sanctum,
    boxes: [
      {
        name: "Orinda Aries",
        id: '',
        grid: [
          Realm.Green, Realm.Black, Realm.Green,
          Realm.Black, Realm.Black, Realm.Black,
          Realm.Green, Realm.Yellow, Realm.Green
        ],
        corners: Array(4).fill(Realm.Black),
      },
      {
        name: "Fenn Aries",
        id: '',
        grid: [
          Realm.Grey, Realm.Green, Realm.Grey,
          Realm.Orange, Realm.Red, Realm.Orange,
          Realm.White, Realm.Green, Realm.Black
        ],
        corners: Array(4).fill(Realm.Red),
      },
      {
        name: "Arch Aries",
        id: '',
        grid: [
          Realm.Black, Realm.Yellow, Realm.Grey,
          Realm.Yellow, Realm.Green, Realm.Yellow,
          Realm.Grey, Realm.Yellow, Realm.Black
        ],
        corners: Array(4).fill(Realm.Yellow),
      },
      {
        name: "Eraja",
        id: '',
        grid: [
          Realm.Yellow, Realm.Violet, Realm.Yellow,
          Realm.Green, Realm.Red, Realm.Black,
          Realm.Violet, Realm.Violet, Realm.Violet
        ],
        corners: Array(4).fill(Realm.Violet),
      },
      {
        name: "Corarica",
        id: '',
        grid: [
          Realm.Orange, Realm.Black, Realm.Orange,
          Realm.Orange, Realm.Orange, Realm.Orange,
          Realm.Violet, Realm.Green, Realm.Violet
        ],
        corners: Array(4).fill(Realm.Orange),
      },
      {
        name: "Mora Jai",
        id: '',
        grid: [
          Realm.Yellow, Realm.Yellow, Realm.Yellow,
          Realm.White, Realm.Pink, Realm.White,
          Realm.Grey, Realm.Grey, Realm.Grey
        ],
        corners: Array(4).fill(Realm.White),
      },
      {
        name: "Verra",
        id: '',
        grid: [
          Realm.Pink, Realm.Pink, Realm.Grey,
          Realm.Grey, Realm.Grey, Realm.Grey,
          Realm.Orange, Realm.Orange, Realm.Orange
        ],
        corners: Array(4).fill(Realm.Pink),
      },
      {
        name: "Nuance",
        id: '',
        grid: [
          Realm.Green, Realm.Grey, Realm.Green,
          Realm.Grey, Realm.Orange, Realm.Orange,
          Realm.Grey, Realm.Black, Realm.Violet
        ],
        corners: Array(4).fill(Realm.Green),
      },
    ],
  },
  {
    location: Location.Estate,
    boxes: [
      {
        name: "Tunnel",
        id: '',
        grid: [
          Realm.Black, Realm.Orange, Realm.Pink,
          Realm.Orange, Realm.Orange, Realm.Orange,
          Realm.Pink, Realm.Orange, Realm.Orange
        ],
        corners: Array(4).fill(Realm.Orange),
      },
    ],
  },
  {
    location: Location.Unknown,
    boxes: [
      {
        name: "Box 1",
        id: '',
        grid: [
          Realm.Black, Realm.Black, Realm.Black,
          Realm.Green, Realm.Black, Realm.Grey,
          Realm.Grey, Realm.Grey, Realm.Pink
        ],
        corners: Array(4).fill(Realm.Black),
      },
      {
        name: "Box 2",
        id: '',
        grid: [
          Realm.Orange, Realm.Grey, Realm.Violet,
          Realm.Orange, Realm.Grey, Realm.Violet,
          Realm.Black, Realm.Black, Realm.Black
        ],
        corners: Array(4).fill(Realm.Black),
      },
      {
        name: "Box 3",
        id: '',
        grid: [
          Realm.Black, Realm.Black, Realm.Black,
          Realm.Grey, Realm.Grey, Realm.Grey,
          Realm.Pink, Realm.Violet, Realm.Orange
        ],
        corners: Array(4).fill(Realm.Black),
      },
    ],
  },
  {
    location: Location.Atelier,
    boxes: [
      {
        name: "Conservatory",
        id: '',
        grid: [
          Realm.Black, Realm.Grey, Realm.Orange,
          Realm.Orange, Realm.Green, Realm.Orange,
          Realm.Orange, Realm.Green, Realm.Yellow
        ],
        corners: Array(4).fill(Realm.Green),
      },
    ],
  },
] as const;

export const MORA_JAI_BOXES: MoraJaiBoxGroup[] = RAW_MORA_JAI_BOXES.map(group => ({
  location: group.location,
  boxes: group.boxes.map(box => ({
    ...box,
    id: `${group.location}${box.name.replace(/\s+/g, "")}`,
  })),
}));

const allIds = MORA_JAI_BOXES.flatMap(group => group.boxes.map(box => box.id));
const duplicates = allIds.filter((id, idx, arr) => arr.indexOf(id) !== idx);
if (duplicates.length > 0) {
  console.warn("Duplicate MoraJaiBox ids found:", [...new Set(duplicates)]);
  throw new Error(`Duplicate MoraJaiBox ids found: ${[...new Set(duplicates)].join(", ")}`);
}