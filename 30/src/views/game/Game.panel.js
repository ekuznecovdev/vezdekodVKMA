import { Icon28MasksOutline } from "@vkontakte/icons";
import { Icon20RemoveCircleOutline } from "@vkontakte/icons";
import {
  Button,
  Panel,
  PanelHeader,
  PanelHeaderContent,
} from "@vkontakte/vkui";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArrayToNum, getRandNum } from "../../lib/modules/util";
import { Icon16Done } from "@vkontakte/icons";
import { LocationBlock } from "../../lib/components/LocationBlock/LocationBlock";

export const GamePanel = ({ id, setActiveView }) => {
  const gameData = useSelector((s) => s.game);
  const dispatch = useDispatch();
  const [gamemode, setGamemode] = useState("preparation");
  const [userRound, setUserRound] = useState(1);
  const [location, setLocation] = useState(getRandNum(1, 5));
  const [showCard, setShowCard] = useState(false);
  const locations = [
    "island",
    "jungle",
    "mine",
    "park",
    "sahara",
    "underground",
  ];
  const ruLocations = [
    "Остров",
    "Джунгли",
    "Шахта",
    "Парк",
    "Пустыня",
    "Подвал",
  ];
  const nextRound = () => {
    setShowCard(false);
    if (Number(userRound + 1) > gameData.settings.playerCount) {
      setGamemode("game");
      setUserRound(1);
    } else {
      setUserRound(Number(userRound + 1));
    }
  };
  const endGame = () => {
    dispatch({
      type: "game/setSettings",
      payload: null,
    });
    setActiveView("homeView");
    return;
  };
  const seeCard = () => {
    setShowCard(true);
  };
  console.log(gameData);
  return (
    <Panel id={id}>
      <PanelHeader separator={false}>
        <PanelHeaderContent before={<Icon28MasksOutline />} status="Игра">
          SPYFALL
        </PanelHeaderContent>
      </PanelHeader>
      {gameData.settings ? (
        <div className="gameContent">
          <span className="roundInfo">
            {gamemode == "preparation"
              ? "Просмотр карт | Игрок #" + userRound
              : `Карт больше нет`}
          </span>

          <div className="cardWrapper">
            <LocationBlock
              showDesc={showCard}
              cssName={
                !gameData.settings.spyPlayerId.includes(userRound)
                  ? locations[location - 1]
                  : ""
              }
              name={
                gameData.settings.spyPlayerId.includes(userRound)
                  ? "вы шпион"
                  : ruLocations[location - 1]
              }
              className={`card ${
                showCard ? `card--show card--location${location}` : ""
              }`}
            />
          </div>

          <div className="actionsWrapper">
            <div className="actions">
              {gamemode == "preparation" ? (
                <>
                  {showCard ? (
                    <Button
                      mode="commerce"
                      size="m"
                      onClick={nextRound}
                      before={<Icon16Done width={20} height={20} />}
                    >
                      Передать ход
                    </Button>
                  ) : (
                    <Button
                      mode="commerce"
                      size="m"
                      onClick={seeCard}
                      before={<Icon16Done width={20} height={20} />}
                    >
                      Посмотреть карту
                    </Button>
                  )}
                </>
              ) : null}
              <Button
                size="m"
                mode="destructive"
                before={<Icon20RemoveCircleOutline />}
                onClick={endGame}
              >
                Вернуться в меню
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </Panel>
  );
};
