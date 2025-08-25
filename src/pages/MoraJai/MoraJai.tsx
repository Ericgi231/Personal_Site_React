import { useEffect, useState } from "react";
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

  useEffect(() => {
    const onPopState = (event: PopStateEvent) => {
      if (page === MoraJaiPage.Game) {
        setPage(MoraJaiPage.Menu);
      }
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [page]);

  return (
    <GridContainer>
      {page === MoraJaiPage.Menu && (
        <MoraJaiMenu
          onLevelSelected={(box: MoraJaiBox) => {
            setSelectedBox(box);
            setPage(MoraJaiPage.Game);
            window.history.pushState({ moraJai: "game" }, "Mora Jai Game");
          }}
          onCreateLevel={() => setPage(MoraJaiPage.Editor)}
        />
      )}
      {page === MoraJaiPage.Game && (
        <MoraJaiGame onBack={() => setPage(MoraJaiPage.Menu) } box={selectedBox}/>
      )}
    </GridContainer>
  );
};

//TODO Improve styling
//TODO add custom levels

export default MoraJai;