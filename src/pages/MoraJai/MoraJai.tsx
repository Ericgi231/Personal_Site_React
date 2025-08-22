import { useState } from "react";
import { GridContainer, GridBox, GridButton } from "@pages/MoraJai/MoraJai.styles.js";

const GRID_SIZE = 3;

export const COLOR_ENUM = [
  "grey",
  "black",
  "green",
  "pink",
  "yellow",
  "violet",
  "white",
  "red",
  "orange",
  "blue"
];

const DEFAULT_GRID = Array(GRID_SIZE * GRID_SIZE).fill(0);
const PUZZLE_1 = [1,2,3,4,5,6,7,8,9];

const MoraJai = () => {
  const [active, setActive] = useState(PUZZLE_1);

  const handleClick = ( buttonIndex: number ) => {
    setActive(prev =>
      prev.map((val, i) =>
        i === buttonIndex ? (val + 1) % COLOR_ENUM.length : val
      )
    );
  };

  return (
    <GridContainer>
      <GridBox>
        {active.map((colorIndex, buttonIndex) => (
          <GridButton
            key={buttonIndex}
            style={{ background: COLOR_ENUM[colorIndex] }}
            onClick={() => handleClick(buttonIndex)}
            aria-label={`Grid button ${buttonIndex + 1}, color ${COLOR_ENUM[colorIndex]}`}
          >
            {buttonIndex + 1}
          </GridButton>
        ))}
      </GridBox>
    </GridContainer>
  );
};

export default MoraJai;