import { useState, useEffect } from "react";
import { GridContainer, OuterBox, GridBoxWrapper, GridBox, GridButton, CornerButton, ControlBar, NavButton, SolvedTracker, ScaledGameWrapper } from "@pages/MoraJai/MoraJai.styles.js";
import { handleButtonAction, Realm, GRID_CORNERS, CORNER_KEYS, GRID_SIZE } from "@/pages/MoraJai/MoraJai.helper.js";
import type { MoraJaiBox } from "@pages/MoraJai/MoraJai.boxes.js";

interface MoraJaiGameProps {
  onBack: () => void;
  box: MoraJaiBox;
}

const DESIGN_WIDTH = 630; 
const DESIGN_HEIGHT = 630;

const MoraJaiGame: React.FC<MoraJaiGameProps> = ({ onBack, box }) => {
  const [buttons, setButtons] = useState<Realm[]>(box.grid);
  const [corners, setCorners] = useState<Realm[]>(box.corners);
  const [cornersSolved, setCornersSolved] = useState<boolean[]>([false, false, false, false]);
  const [buttonPressedIndex, setButtonPressedIndex] = useState<number | null>(null);
  const [cornerPressedIndex, setCornerPressedIndex] = useState<number | null>(null);
  const [solvedActive, setSolvedActive] = useState(() => {
    const stored = localStorage.getItem(box.id);
    return stored === "true";
  });
  const [scale, setScale] = useState(1);

  const handleClick = (color: Realm, buttonIndex: number) => {
    console.log(`Grid: ${color} pos ${buttonIndex}`);
    setButtonPressedIndex(buttonIndex);
    setTimeout(() => setButtonPressedIndex(null), 200);
    handleButtonAction(color, buttonIndex, buttons, setButtons);
  };

  const handleCornerClick = (color: Realm, cornerIndex: number) => {
    console.log(`Corner: ${color} pos ${cornerIndex}`);
    console.log(`Grid: ${buttons[GRID_CORNERS[CORNER_KEYS[cornerIndex]!]]!} pos ${GRID_CORNERS[CORNER_KEYS[cornerIndex]!]}`);
    setCornerPressedIndex(cornerIndex);
    setTimeout(() => setCornerPressedIndex(null), 200);
    if (color === buttons[GRID_CORNERS[CORNER_KEYS[cornerIndex]!]]!) {
      setCornersSolved(prev => {
        const copy = [...prev];
        copy[cornerIndex] = true;
        return copy;
      });
    } else {
      setCornersSolved(prev =>
        prev.map(() => false)
      );
      setButtons(box.grid);
    }
  };

  useEffect(() => {
    function handleResize() {
      const wScale = window.innerWidth * 0.98 / DESIGN_WIDTH;
      const hScale = window.innerHeight * 0.90 / DESIGN_HEIGHT;
      setScale(Math.min(1, wScale, hScale));
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setCornersSolved(prev =>
      prev.map((solved, idx) => 
        solved ? buttons[GRID_CORNERS[CORNER_KEYS[idx]!]] === corners[idx] : false
      )
    );
  }, [buttons]);

  useEffect(() => {
    if (cornersSolved.every(solved => solved)) {
      setSolvedActive(true);
    }
  }, [cornersSolved]);

  useEffect(() => {
    localStorage.setItem(box.id, solvedActive ? "true" : "false");
  }, [solvedActive]);

  return (
    <GridContainer>
      <ControlBar>
        <NavButton onClick={onBack}>
          &larr; Back
        </NavButton>
        <SolvedTracker $active={solvedActive}>
          {solvedActive ? "+2 Allowance" : "Unsolved"}
        </SolvedTracker>
      </ControlBar>
      <ScaledGameWrapper $scale={scale}>
        <OuterBox>
          <GridBoxWrapper>
            <GridBox>
              {/* ...corners and buttons as before... */}
              {corners.map((color, cornerIndex) => (
                <CornerButton 
                  key={cornerIndex}
                  $corner={CORNER_KEYS[cornerIndex]!} 
                  aria-label={`Corner button ${cornerIndex}, color ${color}`}
                  style={{ background: color }} 
                  $pressed={cornerPressedIndex === cornerIndex}
                  $solved={cornersSolved[cornerIndex]!}
                  onClick={() => handleCornerClick(color, cornerIndex)}/>
              ))}
              {buttons.map((color, buttonIndex) => (
                <GridButton
                  key={buttonIndex}
                  $corner={
                    buttonIndex === 0 ? 'tl' :
                    buttonIndex === GRID_SIZE - 1 ? 'tr' :
                    buttonIndex === GRID_SIZE * (GRID_SIZE - 1) ? 'bl' :
                    buttonIndex === GRID_SIZE * GRID_SIZE - 1 ? 'br' :
                    'none'
                  }
                  style={{ background: color }}
                  $pressed={buttonPressedIndex === buttonIndex}
                  onClick={() => handleClick(color, buttonIndex)}
                  aria-label={`Grid button ${buttonIndex}, color ${color}`}
                >
                </GridButton>
              ))}
            </GridBox>
          </GridBoxWrapper>
        </OuterBox>
      </ScaledGameWrapper>
    </GridContainer>
  );
};

export default MoraJaiGame;