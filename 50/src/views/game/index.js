import { View } from "@vkontakte/vkui";
import { GamePanel } from "./Game.panel";
import "./index.scss";

export const GameView = ({ id, setActiveView }) => {
  return (
    <View id={id} activePanel="gamePanel">
      <GamePanel id="gamePanel" setActiveView={setActiveView} />
    </View>
  );
};
