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