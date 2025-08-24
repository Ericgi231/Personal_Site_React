import { MenuOuterBox, LevelGrid, LevelSquare, LocationSection, MenuTitle, MenuDescription, LocationHeader } from "@pages/MoraJai/MoraJai.styles.js";
import { MORA_JAI_BOXES, type MoraJaiBox } from "@pages/MoraJai/MoraJai.boxes.js";
import { useEffect } from "react";

interface MoraJaiMenuProps {
  onLevelSelected: (selected: MoraJaiBox) => void;
  onCreateLevel: () => void;
}

const MoraJaiMenu: React.FC<MoraJaiMenuProps> = ({ onLevelSelected, onCreateLevel }) => {
  const handleLevelSelected = (box: MoraJaiBox) => {
    localStorage.setItem("moraJaiMenuScroll", window.scrollY.toString());
    onLevelSelected(box);
  };

  useEffect(() => {
    const saved = localStorage.getItem("moraJaiMenuScroll");
    if (saved) {
      const html = document.documentElement;
      const prevScrollBehavior = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";
      window.scrollTo({ top: parseInt(saved, 10), behavior: "auto" });
      html.style.scrollBehavior = prevScrollBehavior;
    }
  }, []);

  return (
    <MenuOuterBox>
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
                $solved={localStorage.getItem(box.id) === "true"}
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


export default MoraJaiMenu;