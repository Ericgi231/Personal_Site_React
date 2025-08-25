import React, { useEffect, useState, Suspense } from "react";
import { GridContainer, MoraJaiLoading } from "@pages/MoraJai/MoraJai.styles.js";
import { MORA_JAI_BOXES, type MoraJaiBox } from "@pages/MoraJai/MoraJai.boxes.js";
const MoraJaiMenu = React.lazy(() => import("@pages/MoraJai/MoraJai.menu.js"));
const MoraJaiGame = React.lazy(() => import("@pages/MoraJai/MoraJai.game.js"));

enum MoraJaiPage {
  Menu = "menu",
  Game = "game",
  Editor = "editor"
}

const MoraJai = () => {
  const [page, setPage] = useState<MoraJaiPage>(MoraJaiPage.Menu);
  const [selectedBox, setSelectedBox] = useState<MoraJaiBox>(MORA_JAI_BOXES[0]!.boxes[0]!);

  useEffect(() => {
    const onPopState = () => {
      if (page === MoraJaiPage.Game) {
        setPage(MoraJaiPage.Menu);
      }
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [page]);

  return (
    <Suspense fallback={<MoraJaiLoading>Loading...</MoraJaiLoading>}>
      <GridContainer>
        <MoraJaiMenu 
          onLevelSelected={(box: MoraJaiBox) => {
            setSelectedBox(box);
            setPage(MoraJaiPage.Game);
            window.history.pushState({ moraJai: "game" }, "Mora Jai Game");
          }} onCreateLevel={() => setPage(MoraJaiPage.Editor)} showPage={page === MoraJaiPage.Menu}
        />
        <MoraJaiGame onBack={() => setPage(MoraJaiPage.Menu) } box={selectedBox} showPage={page === MoraJaiPage.Game} />
      </GridContainer>
    </Suspense>
  );
};

//TODO add custom levels

export default MoraJai;