import { View } from "@vkontakte/vkui";
import { LoadingPanel } from "./Loading.panel";
import "./index.scss";

export const LoadingView = ({ id, setActiveView }) => {
  return (
    <View id={id} activePanel="loadingPanel">
      <LoadingPanel id="loadingPanel" setActiveView={setActiveView} />
    </View>
  );
};
