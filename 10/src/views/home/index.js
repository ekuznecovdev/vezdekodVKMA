import { View } from "@vkontakte/vkui";
import { HomePanel } from "./Home.panel";
import "./index.scss";

export const HomeView = ({ id }) => {
  return (
    <View id={id} activePanel="homePanel">
      <HomePanel id="homePanel" />
    </View>
  );
};
