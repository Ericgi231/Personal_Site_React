import { useEffect } from "react";
import { MenuOuterBox, LevelGrid, LevelSquare, LocationSection, MenuTitle, MenuDescription, LocationHeader, AccessibleToggleButton } from "../MoraJai.styles";
import { MORA_JAI_BOXES, type MoraJaiBox } from "../boxes";
import { LOCAL_STORAGE_KEY_ACCESSIBLE, LOCAL_STORAGE_KEY_SOLVED_MAP, useLocalStorageState } from "../helper";

interface MoraJaiMenuProps {
  onLevelSelected: (selected: MoraJaiBox) => void;
  onCreateLevel: () => void;
}

const LOCAL_STORAGE_KEY_MENU_SCROLL = "moraJaiMenuScroll";

const Menu: React.FC<MoraJaiMenuProps> = ({ onLevelSelected, onCreateLevel }) => {
  const [accessibleMode, setAccessibleMode] = useLocalStorageState(LOCAL_STORAGE_KEY_ACCESSIBLE, false);
  const [solvedMap, setSolvedMap] = useLocalStorageState<Record<string, boolean>>(LOCAL_STORAGE_KEY_SOLVED_MAP, {});

  const handleToggleAccessible = () => setAccessibleMode(!accessibleMode);

  const handleLevelSelected = (box: MoraJaiBox) => {
    localStorage.setItem(LOCAL_STORAGE_KEY_MENU_SCROLL, window.scrollY.toString());
    onLevelSelected(box);
  };

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_MENU_SCROLL);
    if (saved) {
      const html = document.documentElement;
      const prevScrollBehavior = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";
      window.scrollTo({ top: parseInt(saved, 10), behavior: "auto" });
      html.style.scrollBehavior = prevScrollBehavior;
    }
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY_SOLVED_MAP);
    if (stored) {
      setSolvedMap(JSON.parse(stored));
    }
  }, [setSolvedMap]);

  return (
    <MenuOuterBox>
      <AccessibleToggleButton
        onClick={handleToggleAccessible}
        aria-pressed={accessibleMode}
        aria-label="Toggle accessible mode"
      >
        {accessibleMode ? "Accessible: On" : "Accessible: Off"}
      </AccessibleToggleButton>
      <MenuTitle>Mora Jai Boxes Online</MenuTitle>
      <MenuDescription>
        The magnificent puzzle game Blue Prince by Dogubomb contains many a secret and convoluted puzzle.<br />
        Among them are the clear and concise Mora Jai boxes which require no explanation.<br />
        Select a box below to enjoy fun for the whole family!
      </MenuDescription>
      <button hidden disabled onClick={onCreateLevel}>Level Editor (Coming Soon)</button>
      {MORA_JAI_BOXES.map((group) => (
        <LocationSection key={group.location}>
          <LocationHeader>{group.location}</LocationHeader>
          <LevelGrid>
            {group.boxes.map((box) => (
              <LevelSquare
                key={box.id}
                $solved={!!solvedMap[box.id]}
                onClick={() => handleLevelSelected(box)}
                title={box.name}
              >
                {box.name}
              </LevelSquare>
            ))}
          </LevelGrid>
        </LocationSection>
      ))}
    </MenuOuterBox>
  );
};


export default Menu;