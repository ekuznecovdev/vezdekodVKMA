// ? import styles
import "@vkontakte/vkui/dist/vkui.css";
import "./lib/styles/index.scss";

// ? import components
import { AdaptivityProvider, AppRoot, Root } from "@vkontakte/vkui";
import { LoadingView } from "./views/loading";
import { useRouter } from "./lib/hooks/useRouter";
import { HomeView } from "./views/home";
import { LocationsView } from "./views/locations";

import { GameView } from "./views/game";

export const App = () => {
  const router = useRouter();
  return (
    <AdaptivityProvider hasMouse={false}>
      <AppRoot>
        <Root activeView={router.activeView}>
          <HomeView id="homeView" />
          <LocationsView id="locationsView" />

          <GameView id="gameView" />
          <LoadingView id="loadingView" />
        </Root>
      </AppRoot>
    </AdaptivityProvider>
  );
};
