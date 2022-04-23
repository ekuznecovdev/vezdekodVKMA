// ? import styles
import "@vkontakte/vkui/dist/vkui.css";
import "./lib/styles/index.scss";

// ? import components
import { AdaptivityProvider, AppRoot, Root } from "@vkontakte/vkui";
import { LoadingView } from "./views/loading";
import { HomeView } from "./views/home";
import { LocationsView } from "./views/locations";

import { GameView } from "./views/game";
import { TimerView } from "./views/timer";
import { useState } from "react";

export const App = () => {
  const [activeView, setActiveView] = useState("loadingView");
  return (
    <AdaptivityProvider hasMouse={false}>
      <AppRoot>
        <Root activeView={activeView}>
          <HomeView id="homeView" setActiveView={setActiveView} />
          <LocationsView id="locationsView" setActiveView={setActiveView} />
          <TimerView id="timerView" setActiveView={setActiveView} />
          <GameView id="gameView" setActiveView={setActiveView} />
          <LoadingView id="loadingView" setActiveView={setActiveView} />
        </Root>
      </AppRoot>
    </AdaptivityProvider>
  );
};
