import { OuterBox, LevelGrid, LevelSquare} from "@pages/MoraJai/MoraJai.styles.js";
import { MORA_JAI_BOXES, type MoraJaiBox } from "@pages/MoraJai/MoraJai.boxes.js";

interface MoraJaiMenuProps {
  onLevelSelected: (selected: MoraJaiBox) => void;
  onCreateLevel: () => void;
}

const MoraJaiMenu: React.FC<MoraJaiMenuProps> = ({ onLevelSelected, onCreateLevel }) => {
  return (
    <OuterBox>
      <h1>Mora Jai Boxes Online</h1>
      <p>The magnificent puzzle game Blue Prince by Dogubomb contains many a secret and convoluted puzzle.<br/>
      Among them are the clear and concise Mora Jai boxes which require no explination.<br/>
      Select a box below to enjoy fun for the whole family!
      </p>
      <button hidden disabled onClick={onCreateLevel}>Level Editor (Coming Soon)</button>
      {MORA_JAI_BOXES.map((group) => (
        <div key={group.location} style={{ marginBottom: 32 }}>
          <h2 style={{ margin: "24px 0 12px 0" }}>{group.location}</h2>
          <LevelGrid>
            {group.boxes.map((box) => (
              <LevelSquare
                key={box.id}
                $solved={localStorage.getItem(box.id) === "true"}
                onClick={() => onLevelSelected(box)}
                title={box.name}
              >
                {box.name}
              </LevelSquare>
            ))}
          </LevelGrid>
        </div>
      ))}
    </OuterBox>
  );
};

export default MoraJaiMenu;