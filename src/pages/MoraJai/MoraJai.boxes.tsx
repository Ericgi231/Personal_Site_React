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
  AriesCourt = "Aries Court",
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
      {
        name: "Master Bedroom",
        id: '',
        grid: [],
        corners: [],
      },
      {
        name: "Closed Exhibit",
        id: '',
        grid: [],
        corners: [],
      },
      {
        name: "Underpass",
        id: '',
        grid: [],
        corners: [],
      },
      {
        name: "Tomb",
        id: '',
        grid: [],
        corners: [],
      },
      {
        name: "Trading Post",
        id: '',
        grid: [],
        corners: [],
      },
      {
        name: "Solarium",
        id: '',
        grid: [],
        corners: [],
      },
      {
        name: "Lost & Found",
        id: '',
        grid: [],
        corners: [],
      },
      {
        name: "Throne Room",
        id: '',
        grid: [],
        corners: [],
      },
    ],
  },
  {
    location: Location.AriesCourt,
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
      {
        name: "Box 4",
        id: '',
        grid: [],
        corners: Array(4).fill(Realm.Black),
      },
      {
        name: "Box 5",
        id: '',
        grid: [],
        corners: Array(4).fill(Realm.Black),
      },
      {
        name: "Box 6",
        id: '',
        grid: [],
        corners: Array(4).fill(Realm.Black),
      },
      {
        name: "Box 7",
        id: '',
        grid: [],
        corners: Array(4).fill(Realm.Black),
      },
      {
        name: "Box 8",
        id: '',
        grid: [],
        corners: Array(4).fill(Realm.Black),
      },
    ],
  },
  {
    location: Location.Atelier,
    boxes: [
      { name: "Archive", id: '', grid: [
        Realm.Red, Realm.Grey, Realm.Black, 
        Realm.Orange, Realm.Orange, Realm.Orange, 
        Realm.Green, Realm.Grey, Realm.Violet
      ], corners: [Realm.Orange, Realm.Red, Realm.Orange, Realm.Red] },
      { name: "Chapel", id: '', grid: [
        Realm.Blue, Realm.Orange, Realm.Blue, 
        Realm.Black, Realm.Black, Realm.Orange, 
        Realm.Blue, Realm.Orange, Realm.Blue
      ], corners: Array(4).fill(Realm.Orange) },
      { name: "Vestibule", id: '', grid: [
        Realm.Grey, Realm.Green, Realm.Grey, 
        Realm.Orange, Realm.Black, Realm.Red, 
        Realm.Black, Realm.White, Realm.Violet
      ], corners: [Realm.Black, Realm.Violet, Realm.Orange, Realm.Red] },
      { name: "Coat Check", id: '', grid: [], corners: [] },
      { name: "Aquarium", id: '', grid: [], corners: [] },
      { name: "Foyer", id: '', grid: [], corners: [] },
      { name: "Pool", id: '', grid: [], corners: [] },
      { name: "Servants Quarters", id: '', grid: [], corners: [] },
      { name: "Pump Room", id: '', grid: [], corners: [] },
      { name: "Furnace", id: '', grid: [], corners: [] },
      { name: "Gymnasium", id: '', grid: [], corners: [] },
      { name: "Laundry", id: '', grid: [], corners: [] },
      { name: "Guest Bedroom", id: '', grid: [], corners: [] },
      { name: "Conference", id: '', grid: [], corners: [] },
      { name: "Den", id: '', grid: [], corners: [] },
      { name: "West Wing Hall", id: '', grid: [], corners: [] },
      { name: "Passageway", id: '', grid: [], corners: [] },
      { name: "Dark Room", id: '', grid: [], corners: [] },
      { name: "Closet", id: '', grid: [], corners: [] },
      { name: "Parlor", id: '', grid: [], corners: [] },
      { name: "Billiard Room", id: '', grid: [], corners: [] },
      { name: "Trophy Room", id: '', grid: [], corners: [] },
      { name: "The Foundation", id: '', grid: [], corners: [] },
      { name: "Ballroom", id: '', grid: [], corners: [] },
      { name: "Spare Room", id: '', grid: [], corners: [] },
      { name: "Nook", id: '', grid: [], corners: [] },
      { name: "Kitchen", id: '', grid: [], corners: [] },
      { name: "Corridor", id: '', grid: [], corners: [] },
      { name: "Music Room", id: '', grid: [], corners: [] },
      { name: "Lavatory", id: '', grid: [], corners: [] },
      { name: "Solarium", id: '', grid: [], corners: [] },
      { name: "Hallway", id: '', grid: [], corners: [] },
      { name: "Dining Room", id: '', grid: [], corners: [] },
      { name: "Observatory", id: '', grid: [], corners: [] },
      { name: "East Wing Hall", id: '', grid: [], corners: [] },
      { name: "Bedroom", id: '', grid: [], corners: [] },
      { name: "Drawing Room", id: '', grid: [], corners: [] },
      { name: "Gallery", id: '', grid: [], corners: [] },
      { name: "Library", id: '', grid: [], corners: [] },
      { name: "Cloister", id: '', grid: [], corners: [] },
      { name: "Conservatory", id: '', grid: [
        Realm.Black, Realm.Grey, Realm.Orange,
        Realm.Orange, Realm.Green, Realm.Orange,
        Realm.Orange, Realm.Green, Realm.Yellow
      ], corners: Array(4).fill(Realm.Green) },
      { name: "Maid’s Chamber", id: '', grid: [], corners: [] },
      { name: "Entrance Hall", id: '', grid: [], corners: [] },
      { name: "Pantry", id: '', grid: [], corners: [] },
      { name: "Storeroom", id: '', grid: [], corners: [] },
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