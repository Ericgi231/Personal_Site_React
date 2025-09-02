import { Realm } from "./helper";

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
      { name: "Orinda Aries", id: '', grid: [
        Realm.Green, Realm.Black, Realm.Green,
        Realm.Black, Realm.Black, Realm.Black,
        Realm.Green, Realm.Yellow, Realm.Green
      ], corners: Array(4).fill(Realm.Black) },
      { name: "Fenn Aries", id: '', grid: [
        Realm.Grey, Realm.Green, Realm.Grey,
        Realm.Orange, Realm.Red, Realm.Orange,
        Realm.White, Realm.Green, Realm.Black
      ], corners: Array(4).fill(Realm.Red) },
      { name: "Arch Aries", id: '', grid: [
        Realm.Black, Realm.Yellow, Realm.Grey,
        Realm.Yellow, Realm.Green, Realm.Yellow,
        Realm.Grey, Realm.Yellow, Realm.Black
      ], corners: Array(4).fill(Realm.Yellow) },
      { name: "Eraja", id: '', grid: [
        Realm.Yellow, Realm.Violet, Realm.Yellow,
        Realm.Green, Realm.Red, Realm.Black,
        Realm.Violet, Realm.Violet, Realm.Violet
      ], corners: Array(4).fill(Realm.Violet) },
      { name: "Corarica", id: '', grid: [
        Realm.Orange, Realm.Black, Realm.Orange,
        Realm.Orange, Realm.Orange, Realm.Orange,
        Realm.Violet, Realm.Green, Realm.Violet
      ], corners: Array(4).fill(Realm.Orange) },
      { name: "Mora Jai", id: '', grid: [
        Realm.Yellow, Realm.Yellow, Realm.Yellow,
        Realm.White, Realm.Pink, Realm.White,
        Realm.Grey, Realm.Grey, Realm.Grey
      ], corners: Array(4).fill(Realm.White) },
      { name: "Verra", id: '', grid: [
        Realm.Pink, Realm.Pink, Realm.Grey,
        Realm.Grey, Realm.Grey, Realm.Grey,
        Realm.Orange, Realm.Orange, Realm.Orange
      ], corners: Array(4).fill(Realm.Pink) },
      { name: "Nuance", id: '', grid: [
        Realm.Green, Realm.Grey, Realm.Green,
        Realm.Grey, Realm.Orange, Realm.Orange,
        Realm.Grey, Realm.Black, Realm.Violet
      ], corners: Array(4).fill(Realm.Green) },
    ],
  },
  {
    location: Location.Estate,
    boxes: [
      { name: "Tunnel", id: '', grid: [
        Realm.Black, Realm.Orange, Realm.Pink,
        Realm.Orange, Realm.Orange, Realm.Orange,
        Realm.Pink, Realm.Orange, Realm.Orange
      ], corners: Array(4).fill(Realm.Orange) },
      { name: "Master Bedroom", id: '', grid: [
        Realm.White, Realm.Grey, Realm.White,
        Realm.White, Realm.Grey, Realm.Grey,
        Realm.Grey, Realm.Grey, Realm.White
      ], corners: Array(4).fill(Realm.White) },
      { name: "Closed Exhibit", id: '', grid: [
        Realm.Orange, Realm.Black, Realm.Orange,
        Realm.Orange, Realm.Red, Realm.Orange,
        Realm.Orange, Realm.Black, Realm.Orange
      ], corners: Array(4).fill(Realm.Red) },
      { name: "Underpass", id: '', grid: [
        Realm.Black, Realm.Black, Realm.Black,
        Realm.Grey, Realm.Black, Realm.Grey,
        Realm.Yellow, Realm.Grey, Realm.Yellow
      ], corners: Array(4).fill(Realm.Black) },
      { name: "Tomb", id: '', grid: [
        Realm.Grey, Realm.Violet, Realm.Grey,
        Realm.Grey, Realm.Pink, Realm.Grey,
        Realm.Violet, Realm.Violet, Realm.Violet
      ], corners: Array(4).fill(Realm.Violet) },
      { name: "Trading Post", id: '', grid: [
        Realm.Pink, Realm.Grey, Realm.Grey,
        Realm.Grey, Realm.Yellow, Realm.Yellow,
        Realm.Grey, Realm.Yellow, Realm.Yellow
      ], corners: Array(4).fill(Realm.Yellow) },
      { name: "Solarium", id: '', grid: [
        Realm.Green, Realm.Grey, Realm.Yellow,
        Realm.Green, Realm.Yellow, Realm.Green,
        Realm.Yellow, Realm.Grey, Realm.Green
      ], corners: Array(4).fill(Realm.Green) },
      { name: "Lost & Found", id: '', grid: [
        Realm.Pink, Realm.Pink, Realm.Pink,
        Realm.Pink, Realm.Grey, Realm.Pink,
        Realm.Grey, Realm.Grey, Realm.Grey
      ], corners: Array(4).fill(Realm.Pink) },
      { name: "Throne Room", id: '', grid: [
        Realm.Black, Realm.Green, Realm.Blue,
        Realm.Blue, Realm.Blue, Realm.Blue,
        Realm.Violet, Realm.Grey, Realm.Grey
      ], corners: Array(4).fill(Realm.Blue) },
    ],
  },
  {
    location: Location.AriesCourt,
    boxes: [
      { name: "Box 1", id: '', grid: [
        Realm.Black, Realm.Black, Realm.Black,
        Realm.Green, Realm.Black, Realm.Grey,
        Realm.Grey, Realm.Grey, Realm.Pink
      ], corners: Array(4).fill(Realm.Black) },
      { name: "Box 2", id: '', grid: [
        Realm.Orange, Realm.Grey, Realm.Violet,
        Realm.Orange, Realm.Grey, Realm.Violet,
        Realm.Black, Realm.Black, Realm.Black
      ], corners: Array(4).fill(Realm.Black) },
      { name: "Box 3", id: '', grid: [
        Realm.Black, Realm.Black, Realm.Black,
        Realm.Grey, Realm.Grey, Realm.Grey,
        Realm.Pink, Realm.Violet, Realm.Orange
      ], corners: Array(4).fill(Realm.Black) },
      { name: "Box 4", id: '', grid: [
        Realm.Black, Realm.Black, Realm.Black,
        Realm.Orange, Realm.Grey, Realm.Orange,
        Realm.Yellow, Realm.Grey, Realm.Yellow
      ], corners: Array(4).fill(Realm.Black) },
      { name: "Box 5", id: '', grid: [
        Realm.Orange, Realm.Grey, Realm.Pink,
        Realm.Black, Realm.Grey, Realm.Black,
        Realm.Green, Realm.Grey, Realm.Orange
      ], corners: Array(4).fill(Realm.Black) },
      { name: "Box 6", id: '', grid: [
        Realm.Black, Realm.Violet, Realm.Black,
        Realm.Grey, Realm.Grey, Realm.Grey,
        Realm.Orange, Realm.Green, Realm.Orange
      ], corners: Array(4).fill(Realm.Black) },
      { name: "Box 7", id: '', grid: [
        Realm.Orange, Realm.Orange, Realm.Orange,
        Realm.Black, Realm.Green, Realm.Black,
        Realm.Violet, Realm.Green, Realm.Violet
      ], corners: Array(4).fill(Realm.Black) },
      { name: "Box 8", id: '', grid: [
        Realm.Black, Realm.Green, Realm.Yellow,
        Realm.Black, Realm.Black, Realm.Black,
        Realm.Grey, Realm.Grey, Realm.Grey
      ], corners: Array(4).fill(Realm.Black) },
    ],
  },
  {
    location: Location.Atelier,
    boxes: [
      { name: "Archive", id: '', grid: [
        Realm.Red, Realm.Grey, Realm.Black, 
        Realm.Orange, Realm.Orange, Realm.Orange, 
        Realm.Green, Realm.Grey, Realm.Violet
      ], corners: [Realm.Orange, Realm.Red, Realm.Red, Realm.Orange] },
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
      { name: "Coat Check", id: '', grid: [
        Realm.Yellow, Realm.Green, Realm.Yellow,
        Realm.Black, Realm.Black, Realm.Black,
        Realm.Blue, Realm.Green, Realm.Blue
      ], corners: [Realm.Blue, Realm.Black, Realm.Black, Realm.Blue] },
      { name: "Aquarium", id: '', grid: [
        Realm.Pink, Realm.Grey, Realm.Yellow,
        Realm.Red, Realm.Yellow, Realm.White,
        Realm.Orange, Realm.Blue, Realm.Black
      ], corners: Array(4).fill(Realm.Yellow) },
      { name: "Foyer", id: '', grid: [
        Realm.Green, Realm.Green, Realm.Green,
        Realm.Grey, Realm.Orange, Realm.Orange,
        Realm.Blue, Realm.Grey, Realm.Violet
      ], corners: Array(4).fill(Realm.Green) },
      { name: "Pool", id: '', grid: [
        Realm.Red, Realm.White, Realm.Yellow,
        Realm.Blue, Realm.Green, Realm.Blue,
        Realm.Blue, Realm.Yellow, Realm.Blue
      ], corners: Array(4).fill(Realm.Red) },
      { name: "Servants Quarters", id: '', grid: [
        Realm.Grey, Realm.Grey, Realm.Grey,
        Realm.Black, Realm.Red, Realm.Black,
        Realm.White, Realm.Grey, Realm.Yellow
      ], corners: Array(4).fill(Realm.Black) },
      { name: "Pump Room", id: '', grid: [
        Realm.Violet, Realm.Blue, Realm.Violet,
        Realm.Black, Realm.Green, Realm.Orange,
        Realm.Black, Realm.Green, Realm.Orange
      ], corners: Array(4).fill(Realm.Violet) },
      { name: "Furnace", id: '', grid: [
        Realm.Black, Realm.Grey, Realm.Grey,
        Realm.White, Realm.Green, Realm.White,
        Realm.Blue, Realm.Yellow, Realm.Orange
      ], corners: Array(4).fill(Realm.Blue) },
      { name: "Gymnasium", id: '', grid: [
        Realm.Pink, Realm.White, Realm.Pink,
        Realm.Black, Realm.Red, Realm.Black,
        Realm.Grey, Realm.Grey, Realm.Grey
      ], corners: Array(4).fill(Realm.Red) },
      { name: "Laundry", id: '', grid: [
        Realm.Pink, Realm.Orange, Realm.Violet,
        Realm.Orange, Realm.Grey, Realm.Grey,
        Realm.Pink, Realm.Blue, Realm.Violet
      ], corners: Array(4).fill(Realm.Violet) },
      { name: "Guest Bedroom", id: '', grid: [
        Realm.Yellow, Realm.Yellow, Realm.Yellow,
        Realm.Black, Realm.Black, Realm.Black,
        Realm.Grey, Realm.Green, Realm.Grey
      ], corners: [Realm.Black, Realm.Yellow, Realm.Yellow, Realm.Black] },
      { name: "Conference", id: '', grid: [
        Realm.Yellow, Realm.Yellow, Realm.Yellow,
        Realm.Black, Realm.Grey, Realm.Black,
        Realm.Orange, Realm.Green, Realm.Orange
      ], corners: Array(4).fill(Realm.Yellow) },
      { name: "Den", id: '', grid: [
        Realm.Grey, Realm.Pink, Realm.Grey,
        Realm.Orange, Realm.Green, Realm.Orange,
        Realm.Violet, Realm.Grey, Realm.Violet
      ], corners: Array(4).fill(Realm.Violet) },
      { name: "West Wing Hall", id: '', grid: [
        Realm.Black, Realm.Green, Realm.Black,
        Realm.Grey, Realm.Orange, Realm.Grey,
        Realm.Violet, Realm.Violet, Realm.Violet
      ], corners: Array(4).fill(Realm.Violet) },
      { name: "Passageway", id: '', grid: [
        Realm.Pink, Realm.White, Realm.Pink,
        Realm.Orange, Realm.Red, Realm.Orange,
        Realm.Violet, Realm.White, Realm.Violet
      ], corners: Array(4).fill(Realm.Violet) },
      { name: "Dark Room", id: '', grid: [
        Realm.Yellow, Realm.Orange, Realm.Yellow,
        Realm.Orange, Realm.Orange, Realm.Orange,
        Realm.Pink, Realm.Orange, Realm.Pink
      ], corners: Array(4).fill(Realm.Orange) },
      { name: "Closet", id: '', grid: [
        Realm.Pink, Realm.Orange, Realm.Pink,
        Realm.Orange, Realm.Orange, Realm.Orange,
        Realm.Green, Realm.Orange, Realm.Green
      ], corners: Array(4).fill(Realm.Orange) },
      { name: "Parlor", id: '', grid: [
        Realm.Black, Realm.Blue, Realm.Black,
        Realm.Black, Realm.Green, Realm.Orange,
        Realm.Blue, Realm.Green, Realm.Blue
      ], corners: Array(4).fill(Realm.Green) },
      { name: "Billiard Room", id: '', grid: [
        Realm.Pink, Realm.White, Realm.Pink,
        Realm.Blue, Realm.Grey, Realm.Blue,
        Realm.Pink, Realm.Red, Realm.Pink
      ], corners: Array(4).fill(Realm.Red) },
      { name: "Trophy Room", id: '', grid: [
        Realm.White, Realm.Red, Realm.Grey,
        Realm.Grey, Realm.Pink, Realm.Grey,
        Realm.Black, Realm.Red, Realm.White
      ], corners: Array(4).fill(Realm.White) },
      { name: "The Foundation", id: '', grid: [
        Realm.Grey, Realm.Orange, Realm.Orange,
        Realm.Yellow, Realm.Orange, Realm.Black,
        Realm.Blue, Realm.Blue, Realm.Orange
      ], corners: Array(4).fill(Realm.Orange) },
      { name: "Ballroom", id: '', grid: [
        Realm.Green, Realm.White, Realm.White,
        Realm.Black, Realm.White, Realm.Black,
        Realm.Blue, Realm.White, Realm.Blue
      ], corners: Array(4).fill(Realm.Blue) },
      { name: "Spare Room", id: '', grid: [
        Realm.Black, Realm.Blue, Realm.Grey,
        Realm.Blue, Realm.Orange, Realm.Blue,
        Realm.Black, Realm.Orange, Realm.Yellow
      ], corners: Array(4).fill(Realm.Blue) },
      { name: "Nook", id: '', grid: [
        Realm.Red, Realm.Green, Realm.Orange,
        Realm.Black, Realm.Black, Realm.Black,
        Realm.Violet, Realm.Blue, Realm.Violet
      ], corners: Array(4).fill(Realm.Violet) },
      { name: "Kitchen", id: '', grid: [
        Realm.Orange, Realm.Green, Realm.Orange,
        Realm.Yellow, Realm.Orange, Realm.Orange,
        Realm.Blue, Realm.Yellow, Realm.Orange
      ], corners: Array(4).fill(Realm.Orange) },
      { name: "Corridor", id: '', grid: [
        Realm.Green, Realm.Yellow, Realm.Green,
        Realm.Blue, Realm.Orange, Realm.Blue,
        Realm.Blue, Realm.Orange, Realm.Blue
      ], corners: Array(4).fill(Realm.Blue) },
      { name: "Music Room", id: '', grid: [
        Realm.Pink, Realm.Blue, Realm.Blue,
        Realm.Blue, Realm.Blue, Realm.Violet,
        Realm.Green, Realm.Grey, Realm.Pink
      ], corners: Array(4).fill(Realm.Blue) },
      { name: "Lavatory", id: '', grid: [
        Realm.Orange, Realm.Yellow, Realm.Orange,
        Realm.Green, Realm.Yellow, Realm.Green,
        Realm.Black, Realm.Yellow, Realm.Black
      ], corners: [Realm.Green, Realm.Yellow, Realm.Yellow, Realm.Green] },
      { name: "Solarium", id: '', grid: [
        Realm.Black, Realm.Green, Realm.Black,
        Realm.Orange, Realm.Violet, Realm.Orange,
        Realm.Blue, Realm.Green, Realm.Blue
      ], corners: Array(4).fill(Realm.Green) },
      { name: "Hallway", id: '', grid: [
        Realm.White, Realm.White, Realm.White,
        Realm.Yellow, Realm.White, Realm.Black,
        Realm.Blue, Realm.Blue, Realm.Blue
      ], corners: Array(4).fill(Realm.Blue) },
      { name: "Dining Room", id: '', grid: [
        Realm.Pink, Realm.Orange, Realm.Pink,
        Realm.Orange, Realm.Blue, Realm.Orange,
        Realm.Pink, Realm.Orange, Realm.Pink
      ], corners: Array(4).fill(Realm.Orange) },
      { name: "Observatory", id: '', grid: [
        Realm.Green, Realm.Blue, Realm.Grey,
        Realm.Black, Realm.Blue, Realm.Grey,
        Realm.Violet, Realm.Blue, Realm.Blue
      ], corners: Array(4).fill(Realm.Blue) },
      { name: "East Wing Hall", id: '', grid: [
        Realm.Violet, Realm.White, Realm.Violet,
        Realm.White, Realm.White, Realm.White,
        Realm.Blue, Realm.Pink, Realm.Blue
      ], corners: Array(4).fill(Realm.Blue) },
      { name: "Bedroom", id: '', grid: [
        Realm.Orange, Realm.Yellow, Realm.Orange,
        Realm.Green, Realm.Grey, Realm.Green,
        Realm.Blue, Realm.Green, Realm.Blue
      ], corners: Array(4).fill(Realm.Green) },
      { name: "Drawing Room", id: '', grid: [
        Realm.Violet, Realm.Violet, Realm.Violet,
        Realm.Black, Realm.Grey, Realm.Grey,
        Realm.Orange, Realm.Blue, Realm.Orange
      ], corners: Array(4).fill(Realm.Violet) },
      { name: "Gallery", id: '', grid: [
        Realm.Grey, Realm.Yellow, Realm.Grey,
        Realm.Black, Realm.Blue, Realm.Black,
        Realm.Blue, Realm.Blue, Realm.Blue
      ], corners: Array(4).fill(Realm.Blue) },
      { name: "Library", id: '', grid: [
        Realm.Pink, Realm.Orange, Realm.Orange,
        Realm.Blue, Realm.Blue, Realm.Pink,
        Realm.Orange, Realm.Orange, Realm.Pink
      ], corners: Array(4).fill(Realm.Blue) },
      { name: "Cloister", id: '', grid: [
        Realm.Pink, Realm.Black, Realm.Pink,
        Realm.Orange, Realm.Grey, Realm.Orange,
        Realm.Pink, Realm.Red, Realm.Pink
      ], corners: [Realm.Orange, Realm.Red, Realm.Red, Realm.Orange] },
      { name: "Conservatory", id: '', grid: [
        Realm.Black, Realm.Grey, Realm.Orange,
        Realm.Orange, Realm.Green, Realm.Orange,
        Realm.Orange, Realm.Green, Realm.Yellow
      ], corners: Array(4).fill(Realm.Green) },
      { name: "Maid’s Chamber", id: '', grid: [
        Realm.Pink, Realm.Pink, Realm.Pink,
        Realm.Orange, Realm.Orange, Realm.Orange,
        Realm.Violet, Realm.Violet, Realm.Violet
      ], corners: Array(4).fill(Realm.Violet) },
      { name: "Entrance Hall", id: '', grid: [
        Realm.Yellow, Realm.Green, Realm.Grey,
        Realm.Yellow, Realm.Yellow, Realm.Blue,
        Realm.Yellow, Realm.Black, Realm.Grey
      ], corners: Array(4).fill(Realm.Yellow) },
      { name: "Pantry", id: '', grid: [
        Realm.Blue, Realm.Violet, Realm.Blue,
        Realm.Black, Realm.Blue, Realm.Violet,
        Realm.Blue, Realm.Violet, Realm.Violet
      ], corners: Array(4).fill(Realm.Blue) },
      { name: "Storeroom", id: '', grid: [
        Realm.Black, Realm.Black, Realm.Black,
        Realm.Grey, Realm.Orange, Realm.Grey,
        Realm.Pink, Realm.Red, Realm.Pink
      ], corners: Array(4).fill(Realm.Red) },
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