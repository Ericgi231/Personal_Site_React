import { useState } from "react";
import { GridContainer, OuterBox, GridBoxWrapper, GridBox, GridButton, CornerButton } from "@pages/MoraJai/MoraJai.styles.js";
import { handleButtonAction } from "@pages/MoraJai/MoraJai.helpers.js";

export const GRID_SIZE = 3;
const CORNERS = {
  tl: 0,
  tr: GRID_SIZE - 1,
  bl: GRID_SIZE * (GRID_SIZE - 1),
  br: GRID_SIZE * GRID_SIZE - 1,
};

export enum Realm {
  Grey = "#5e6b73",    // was #6D767B
  Black = "#12171a",   // unchanged (already fully desaturated)
  Green = "#1ec82d",   // was #209C2E
  Pink = "#e05be7",    // was #CC80D0
  Yellow = "#d1c800",  // was #B1B02F
  Violet = "#a100c7",  // was #882498
  White = "#e7ebec",   // unchanged (white can't be saturated)
  Red = "#c41d3a",     // was #99242C
  Orange = "#ff8c1a",  // was #C87C30
  Blue = "#0084ff"     // was #1E71BF
}

const DEFAULT_GRID: Realm[] = Array(GRID_SIZE * GRID_SIZE).fill(Realm.White);
const PUZZLE_1: Realm[] = [Realm.White, Realm.White, Realm.White,
                          Realm.White, Realm.White, Realm.White,
                          Realm.Blue, Realm.White, Realm.White];
const PUZZLE_2: Realm[] = [Realm.Black, Realm.Green, Realm.Pink,
                          Realm.Yellow, Realm.Black, Realm.White,
                          Realm.Red, Realm.Orange, Realm.Blue];

const MoraJai = () => {
  const [buttons, setButtons] = useState<Realm[]>(PUZZLE_1);
  const [pressedIndex, setPressedIndex] = useState<number | null>(null);

  const handleClick = (color: Realm, buttonIndex: number) => {
    console.log(`${color} pos ${buttonIndex}`);
    setPressedIndex(buttonIndex);
    setTimeout(() => setPressedIndex(null), 200);
    handleButtonAction(color, buttonIndex, buttons, setButtons);
  };

  const handleCornerClick = (corner: keyof typeof CORNERS) => {
    const gridIndex = CORNERS[corner];
    const realm = buttons[gridIndex];
    alert(`The color of the ${corner.toUpperCase()} grid button is: ${realm}`);
  };

  return (
    <GridContainer>
      <OuterBox>
        <GridBoxWrapper>
          <GridBox>
            <CornerButton $corner="tl" aria-label="Top Left" onClick={() => handleCornerClick("tl")}>TL</CornerButton>
            <CornerButton $corner="tr" aria-label="Top Right" onClick={() => handleCornerClick("tr")}>TR</CornerButton>
            <CornerButton $corner="bl" aria-label="Bottom Left" onClick={() => handleCornerClick("bl")}>BL</CornerButton>
            <CornerButton $corner="br" aria-label="Bottom Right" onClick={() => handleCornerClick("br")}>BR</CornerButton>
            {buttons.map((color, buttonIndex) => (
              <GridButton
                $corner={
                  buttonIndex === 0 ? 'tl' :
                  buttonIndex === GRID_SIZE - 1 ? 'tr' :
                  buttonIndex === GRID_SIZE * (GRID_SIZE - 1) ? 'bl' :
                  buttonIndex === GRID_SIZE * GRID_SIZE - 1 ? 'br' :
                  'none'
                }
                key={buttonIndex}
                style={{ background: color }}
                $pressed={pressedIndex === buttonIndex}
                onClick={() => handleClick(color, buttonIndex)}
                aria-label={`Grid button ${buttonIndex}, color ${color}`}
              >
                {buttonIndex}
              </GridButton>
            ))}
          </GridBox>
        </GridBoxWrapper>
      </OuterBox>
    </GridContainer>
  );
};

export default MoraJai;