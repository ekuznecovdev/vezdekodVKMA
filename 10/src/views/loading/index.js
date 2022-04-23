import { View } from "@vkontakte/vkui";
import { LoadingPanel } from "./Loading.panel";
import "./index.scss";

export const LoadingView = ({ id }) => {
  return (
    <View id={id} activePanel="loadingPanel">
      <LoadingPanel id="loadingPanel" />
    </View>
  );
};
