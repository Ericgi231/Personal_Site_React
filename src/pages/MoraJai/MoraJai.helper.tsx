import { useEffect, useState } from "react";
import { BOX_METAL } from "./MoraJai.styles.js";

export const GRID_SIZE = 3;
export const GRID_CORNERS = {
  'tl': 0,
  'tr': GRID_SIZE - 1,
  'bl': GRID_SIZE * (GRID_SIZE - 1),
  'br': GRID_SIZE * GRID_SIZE - 1,
} as const;
export const CORNER_KEYS = ['tl', 'tr', 'bl', 'br'] as const;
export const LOCAL_STORAGE_KEY_ACCESSIBLE = "accessibleMode";
export const LOCAL_STORAGE_KEY_SOLVED_MAP = "moraJaiSolved";

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

const SHARED_BG = "background-size: 100% 100%; background-repeat: no-repeat; background-position: center;";

function applyShade(hex: string, amount: number) {
  const m = hex.match(/[a-f\d]{2}/gi);
  if (!m) throw new Error(`Invalid hex color: ${hex}`);
  const to = (i: number) => Math.round(parseInt(m[i]!, 16) + (255 - parseInt(m[i]!, 16)) * amount);
  return `rgba(${to(0)},${to(1)},${to(2)},1)`;
}

export function useLocalStorageState<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored !== null ? JSON.parse(stored) : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

/**
 * Returns the CSS pattern for a given realm.
 * @param realm The realm symbol
 * @param baseColor The base color in hex
 * @param shade A number from -1 to 1 for shading.
 * @param border If true, adds a border to the SVG.
 * @returns A CSS string for the background pattern.
 */
export const realmPattern = (realm: Realm, baseColor: string, shade: number, border = false) => {
  const color = applyShade(baseColor, shade);
  let css: string[] = [];
  css.push(SHARED_BG);

  switch (realm) {
    case Realm.Blue:
      css.push(
        `background-image: url('data:image/svg+xml;utf8,<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="
          M50,10
          Q53,23 60,26
          Q50,60 70,70
          Q65,72 62,90
          Q55,77 50,90
          Q45,77 38,90
          Q35,72 30,70
          Q50,60 40,26
          Q47,23 50,10
          Z
        " fill="${encodeURIComponent(color)}" ${border ? `stroke="${encodeURIComponent(BOX_METAL)}" stroke-width="4"` : ""}/></svg>');`
      );
      break;
    case Realm.Red:
      css.push(
        `background-image: url('data:image/svg+xml;utf8,<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon 
          points="
            50,10 
            90,45 
            73,85 
            27,85
            10,45
          " fill="${encodeURIComponent(color)}" ${border ? `stroke="${encodeURIComponent(BOX_METAL)}" stroke-width="4"` : ""}/></svg>');`
      );
      break;
    case Realm.Green:
      css.push(
        `background-image: url('data:image/svg+xml;utf8,<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon 
          points="
            50,10 
            85,50 
            50,90 
            15,50
          " fill="${encodeURIComponent(color)}" ${border ? `stroke="${encodeURIComponent(BOX_METAL)}" stroke-width="4"` : ""}/></svg>');`
      );
      break;
    case Realm.Yellow:
      css.push(
        `background-image: url('data:image/svg+xml;utf8,<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon 
          points="
            20,80 
            38,30 
            48,45 
            58,15 
            80,80
          " fill="${encodeURIComponent(color)}" ${border ? `stroke="${encodeURIComponent(BOX_METAL)}" stroke-width="4"` : ""}/></svg>');`
      );
      break;
    case Realm.Orange:
      css.push(
        `background-image: url('data:image/svg+xml;utf8,<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon 
          points="
            10,39 
            50,84
            90,39 
            72,24 
            50,39 
            28,24
          " fill="${encodeURIComponent(color)}" ${border ? `stroke="${encodeURIComponent(BOX_METAL)}" stroke-width="4"` : ""}/></svg>');`
      );
      break;
    case Realm.Pink:
      css.push(
        `background-image: url('data:image/svg+xml;utf8,<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="
            M60,10
            L85,35
            L70,50
            A10,10 1 0 1 55,75
            L50,70
            L35,85
            L10,60
            Z
          " fill="${encodeURIComponent(color)}" ${border ? `stroke="${encodeURIComponent(BOX_METAL)}" stroke-width="4"` : ""}/></svg>');`
      );
      break;
    case Realm.Violet:
      css.push(
        `background-image: url('data:image/svg+xml;utf8,<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon 
          points="
            25,15 
            75,15 
            65,50 
            75,85 
            25,85 
            35,50
          " fill="${encodeURIComponent(color)}" ${border ? `stroke="${encodeURIComponent(BOX_METAL)}" stroke-width="4"` : ""}/></svg>');`
      );
      break;
    case Realm.Grey:
      // No pattern
      break;
    case Realm.Black:
      css.push(
        `background-image: url('data:image/svg+xml;utf8,<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon 
          points="
            35,25
            40,25
            45,15
            55,15
            60,25
            65,25
            65,75
            60,75
            55,85
            45,85
            40,75
            35,75
          " fill="${encodeURIComponent(color)}" ${border ? `stroke="${encodeURIComponent(BOX_METAL)}" stroke-width="4"` : ""}/></svg>');`
      );
      break;
    case Realm.White:
      css.push(
        `background-image: url('data:image/svg+xml;utf8,<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path 
          d="
            M10,65
            A30,30 0 0 1 90,65
            L60,70
            C50,55 40,70 40,70
            L10,65
            Z
          " fill="${encodeURIComponent(color)}" ${border ? `stroke="${encodeURIComponent(BOX_METAL)}" stroke-width="4"` : ""}/></svg>');`
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