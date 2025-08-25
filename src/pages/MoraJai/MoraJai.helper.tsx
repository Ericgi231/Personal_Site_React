export const GRID_SIZE = 3;
export const GRID_CORNERS = {
  'tl': 0,
  'tr': GRID_SIZE - 1,
  'bl': GRID_SIZE * (GRID_SIZE - 1),
  'br': GRID_SIZE * GRID_SIZE - 1,
} as const;
export const CORNER_KEYS = ['tl', 'tr', 'bl', 'br'] as const;

export enum Realm {
  Grey = "#5e6b73",
  Black = "#12171a",
  Green = "#1ec82d",
  Pink = "#e05be7",
  Yellow = "#d1c800",
  Violet = "#a100c7",
  White = "#e7ebec",
  Red = "#c41d3a",
  Orange = "#ff8c1a",
  Blue = "#0084ff"
}

const SHARED_BG = "background-size: 90% 90%; background-repeat: no-repeat; background-position: center;";

function applyShade(hex: string, amount: number) {
  const m = hex.match(/[a-f\d]{2}/gi);
  if (!m) throw new Error(`Invalid hex color: ${hex}`);
  const to = (i: number) => Math.round(parseInt(m[i]!, 16) + (255 - parseInt(m[i]!, 16)) * amount);
  return `rgba(${to(0)},${to(1)},${to(2)},1)`;
}

export const realmPattern = (realm: Realm, shade = 0) => {
  const color = applyShade(realm, shade);
  let css: string[] = [];
  css.push(SHARED_BG);

  switch (realm) {
    case Realm.Blue:
      css.push(
        `background-image: url('data:image/svg+xml;utf8,<svg width="200" height="228" viewBox="0 0 200 228" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="
          M100,40
          Q106.0,60 120,70
          Q100,110 140,152
          Q130,152 130,196
          Q110,158 100,194
          Q90,158 70,196
          Q70,152 60,152
          Q100,110 80,70
          Q94.6,60 100,40
          Z" fill="${encodeURIComponent(color)}"/></svg>');`
      );
      break;
    case Realm.Red:
      css.push(
        `background-image: url('data:image/svg+xml;utf8,<svg width="100" height="90" viewBox="0 0 100 90" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon 
          points="
            50,10 
            90,40 
            73,85 
            27,85 
            10,40
          " fill="${encodeURIComponent(color)}"/></svg>');`
      );
      break;
    case Realm.Green:
      css.push(
        `background-image: url('data:image/svg+xml;utf8,<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon 
          points="
            50,15 
            85,50 
            50,85 
            15,50
          " fill="${encodeURIComponent(color)}"/></svg>');`
      );
      break;
    case Realm.Yellow:
      css.push(
        `background-image: url('data:image/svg+xml;utf8,<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon 
          points="
            15,75 
            38,45 
            48,55 
            62,20 
            85,75
          " fill="${encodeURIComponent(color)}"/></svg>');`
      );
      break;
    case Realm.Orange:
      css.push(
        `background-image: url('data:image/svg+xml;utf8,<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon 
          points="
            12,32 
            50,80 
            88,32 
            66,32 
            50,55 
            34,32
          " fill="${encodeURIComponent(color)}"/></svg>');`
      );
      break;
    case Realm.Pink:
      css.push(
        `background-image: url('data:image/svg+xml;utf8,<svg width="70" height="100" viewBox="0 0 70 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="0" width="40" height="100" fill="${encodeURIComponent(color)}"/>
          <circle cx="20" cy="50" r="20" fill="${encodeURIComponent(color)}"/>
        </svg>');`
      );
      break;
    case Realm.Violet:
      css.push(
        `background-image: url('data:image/svg+xml;utf8,<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon 
          points="
            20,10 
            80,10 
            60,50 
            80,90 
            20,90 
            40,50
          " fill="${encodeURIComponent(color)}"/></svg>');`
      );
      break;
    case Realm.Grey:
      // No pattern
      break;
    case Realm.Black:
      css.push(
        `background-image: url('data:image/svg+xml;utf8,<svg width="90" height="100" viewBox="0 0 90 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon 
            points="
              40,13
              50,13 
              57,25 
              32,25
            " fill="${encodeURIComponent(color)}"/>
          <rect x="25" y="22.5" width="40" height="55" fill="${encodeURIComponent(color)}"/>
          <polygon 
            points="
              32,75 
              57,75 
              50,87 
              40,87
            " fill="${encodeURIComponent(color)}"/>
        </svg>');`
      );
      break;
    case Realm.White:
      css.push(
        `background-image: url('data:image/svg+xml;utf8,<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18,65 A32,32 0 0 1 82,65" stroke="${encodeURIComponent(color)}" stroke-width="24" fill="none"/>
        </svg>');`
      );
      break;
    default:
      return "";
  }
  return css.join(' ').replace(/\s+/g, ' ');
};

export function handleButtonAction(
  color: Realm, 
  buttonIndex: number, 
  buttons: Realm[], 
  setButtons: React.Dispatch<React.SetStateAction<Realm[]>>)
{
  switch (color) {
    case Realm.Grey:
      handleGrey();
      break;
    case Realm.Black:
      handleBlack(buttons, buttonIndex, setButtons);
      break;
    case Realm.Green:
      handleGreen(buttons, buttonIndex, setButtons);
      break;
    case Realm.Pink:
      handlePink(buttonIndex, setButtons);
      break;
    case Realm.Yellow:
      handleYellow(buttonIndex, setButtons);
      break;
    case Realm.Violet:
      handleViolet(buttonIndex, setButtons);
      break;
    case Realm.Red:
      handleRed(setButtons);
      break;
    case Realm.Orange:
      handleOrange(buttons, buttonIndex, setButtons);
      break;
    case Realm.White:
      handleWhite(buttons, buttonIndex, setButtons);
      break;
    case Realm.Blue:
      handleBlue(buttons, buttonIndex, setButtons);
      break;
  }
}

const handleGrey = () => {};

const handleBlack = (
  buttons: Realm[],
  buttonIndex: number,
  setButtons: React.Dispatch<React.SetStateAction<Realm[]>>
) => {
  const row = Math.floor(buttonIndex / GRID_SIZE);
  const start = row * GRID_SIZE;
  const end = start + GRID_SIZE;
  const rowColors = buttons.slice(start, end);
  const rotated = [rowColors[rowColors.length - 1], ...rowColors.slice(0, -1)];
  setButtons(prev =>
    prev.map((color, idx) =>
      idx >= start && idx < end ? rotated[idx - start]! : color
    )
  );
};

const handleGreen = (
  buttons: Realm[],
  buttonIndex: number,
  setButtons: React.Dispatch<React.SetStateAction<Realm[]>>
) => {
  if (buttonIndex === Math.floor(buttons.length / 2)) return;
  const oppositeIndex = buttons.length - 1 - buttonIndex;
  setButtons(prev => {
    const copy = [...prev];
    [copy[buttonIndex], copy[oppositeIndex]] = [copy[oppositeIndex]!, copy[buttonIndex]!];
    return copy;
  });
};

const handlePink = (
  buttonIndex: number,
  setButtons: React.Dispatch<React.SetStateAction<Realm[]>>
) => {
  const directions = [
    [-1, -1], [0, -1], [1, -1],
    [1, 0], [1, 1], [0, 1],
    [-1, 1], [-1, 0]
  ];

  const x = buttonIndex % GRID_SIZE;
  const y = Math.floor(buttonIndex / GRID_SIZE);

  const neighborIndices = directions
    .map(([dx, dy]) => {
      const nx = x + dx!;
      const ny = y + dy!;
      if (nx >= 0 && nx < GRID_SIZE && ny >= 0 && ny < GRID_SIZE) {
        return ny * GRID_SIZE + nx;
      }
      return null;
    })
    .filter((idx): idx is number => idx !== null);

  setButtons(prev => {
    const copy = [...prev];
    const values = neighborIndices.map(idx => prev[idx]);
    const rotated = [values[values.length - 1], ...values.slice(0, values.length - 1)];
    neighborIndices.forEach((idx, i) => {
      copy[idx] = rotated[i]!;
    });
    return copy;
  });
};

const handleYellow = (
  buttonIndex: number,
  setButtons: React.Dispatch<React.SetStateAction<Realm[]>>
) => {
  if (buttonIndex < GRID_SIZE) return;
  setButtons(prev => {
    const copy = [...prev];
    [copy[buttonIndex], copy[buttonIndex - GRID_SIZE]] = [copy[buttonIndex - GRID_SIZE]!, copy[buttonIndex]!];
    return copy;
  });
};

const handleViolet = (
  buttonIndex: number,
  setButtons: React.Dispatch<React.SetStateAction<Realm[]>>
) => {
  if (buttonIndex >= (GRID_SIZE * GRID_SIZE) - GRID_SIZE) return;
  setButtons(prev => {
    const copy = [...prev];
    [copy[buttonIndex], copy[buttonIndex + GRID_SIZE]] = [copy[buttonIndex + GRID_SIZE]!, copy[buttonIndex]!];
    return copy;
  });
};

const handleRed = (
  setButtons: React.Dispatch<React.SetStateAction<Realm[]>>
) => {
  setButtons(prev =>
    prev.map((color) => {
      if (color === Realm.Black) return Realm.Red;
      if (color === Realm.White) return Realm.Black;
      return color;
    })
  );
};

const handleOrange = (
  buttons: Realm[],
  buttonIndex: number,
  setButtons: React.Dispatch<React.SetStateAction<Realm[]>>
) => {
  const neighbors = [
    buttonIndex % GRID_SIZE !== 0 ? buttons[buttonIndex - 1] : null,
    (buttonIndex + 1) % GRID_SIZE !== 0 ? buttons[buttonIndex + 1] : null,
    buttonIndex - GRID_SIZE >= 0 ? buttons[buttonIndex - GRID_SIZE] : null,
    buttonIndex + GRID_SIZE < GRID_SIZE * GRID_SIZE ? buttons[buttonIndex + GRID_SIZE] : null,
  ].filter((i): i is Realm => i !== null);

  const colorCounts = neighbors.reduce<Record<Realm, number>>((acc, color) => {
    acc[color] = (acc[color] || 0) + 1;
    return acc;
  }, {} as Record<Realm, number>);

  const entries = Object.entries(colorCounts) as [Realm, number][];
  const maxCount = Math.max(...entries.map(([, count]) => count));
  const candidates = entries.filter(([, count]) => count === maxCount);

  const majorityColor = candidates.length === 1 ? candidates[0]![0] : undefined;

  if (majorityColor) {
    setButtons(prev =>
      prev.map((color, idx) =>
        idx == buttonIndex && majorityColor ? majorityColor : color
      )
    );
  }
};

export const handleWhite = (
  buttons: Realm[],
  buttonIndex: number,
  setButtons: React.Dispatch<React.SetStateAction<Realm[]>>
) => {
  const orthogonalDirs = [
    -GRID_SIZE, 
    1,          
    GRID_SIZE,  
    -1          
  ];

  const neighbors = orthogonalDirs
    .map(dir => {
      const neighbor = buttonIndex + dir;
      if (
        neighbor < 0 ||
        neighbor >= buttons.length ||
        (dir === -1 && buttonIndex % GRID_SIZE === 0) || // left edge
        (dir === 1 && (buttonIndex + 1) % GRID_SIZE === 0) // right edge
      ) {
        return null;
      }
      return neighbor;
    })
    .filter((idx): idx is number => idx !== null);

  setButtons(prev => {
    const copy = [...prev];
    copy[buttonIndex] = Realm.Grey;
    neighbors.forEach(idx => {
      if (prev[idx] === Realm.Grey) {
        copy[idx] = buttons[buttonIndex]!;
      } else if (prev[idx] === Realm.White) {
        copy[idx] = Realm.Grey;
      }
    });
    return copy;
  });
};

const handleBlue = (
  buttons: Realm[],
  buttonIndex: number,
  setButtons: React.Dispatch<React.SetStateAction<Realm[]>>
) => {
  const middleIndex = Math.floor(buttons.length / 2);
  const middleColor = buttons[middleIndex];
  if (middleColor === Realm.Blue) return;
  handleButtonAction(middleColor!, buttonIndex, buttons, setButtons);
};