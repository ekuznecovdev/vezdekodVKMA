import { View } from "@vkontakte/vkui";
import { HomePanel } from "./Home.panel";
import "./index.scss";

export const HomeView = ({ id, setActiveView }) => {
  return (
    <View id={id} activePanel="homePanel">
      <HomePanel id="homePanel" setActiveView={setActiveView} />
    </View>
  );
};
