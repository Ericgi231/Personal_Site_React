import { useState } from "react";
import { GridContainer } from "@pages/MoraJai/MoraJai.styles.js";
import MoraJaiGame from "@pages/MoraJai/MoraJai.game.js";
import MoraJaiMenu from "@pages/MoraJai/MoraJai.menu.js";
import { MORA_JAI_BOXES, type MoraJaiBox } from "@pages/MoraJai/MoraJai.boxes.js";

enum MoraJaiPage {
  Menu = "menu",
  Game = "game",
  Editor = "editor"
}

const MoraJai = () => {
  const [page, setPage] = useState<MoraJaiPage>(MoraJaiPage.Menu);
  const [selectedBox, setSelectedBox] = useState<MoraJaiBox>(MORA_JAI_BOXES[0]!.boxes[0]!);

  return (
    <GridContainer>
      {page === MoraJaiPage.Menu && (
        <MoraJaiMenu
          onLevelSelected={(box: MoraJaiBox) => {
            setSelectedBox(box);
            setPage(MoraJaiPage.Game);
          }}
          onCreateLevel={() => setPage(MoraJaiPage.Editor)}
        />
      )}
      {page === MoraJaiPage.Game && (
        <MoraJaiGame onBack={() => setPage(MoraJaiPage.Menu) } box={selectedBox}/>
      )}
      {/* {page === MoraJaiPage.Editor && (
        <MoraJaiEditor onBack={() => setPage(MoraJaiPage.Menu)} />
      )} */}
    </GridContainer>
  );
};

//TODO clean code
//TODO add custom levels
//TODO finish adding all standard levels

export default MoraJai;