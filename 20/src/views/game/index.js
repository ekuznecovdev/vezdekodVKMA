import { View } from "@vkontakte/vkui";
import { GamePanel } from "./Game.panel";
import "./index.scss";

export const GameView = ({ id }) => {
  return (
    <View id={id} activePanel="gamePanel">
      <GamePanel id="gamePanel" />
    </View>
  );
};
