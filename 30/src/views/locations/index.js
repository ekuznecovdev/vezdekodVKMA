import { View } from "@vkontakte/vkui";
import { LoactionsPanel } from "./Locations.panel";
import "./index.scss";

export const LocationsView = ({ id, setActiveView }) => {
  return (
    <View id={id} activePanel="locationsPanel">
      <LoactionsPanel id="locationsPanel" setActiveView={setActiveView} />
    </View>
  );
};
