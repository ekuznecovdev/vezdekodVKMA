import { View } from "@vkontakte/vkui";
import { TimerPanel } from "./Timer.panel";
import "./index.scss";

export const TimerView = ({ id, setActiveView }) => {
  return (
    <View id={id} activePanel="timerPanel">
      <TimerPanel id="timerPanel" setActiveView={setActiveView} />
    </View>
  );
};
