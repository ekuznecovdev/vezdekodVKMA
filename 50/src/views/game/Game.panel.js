import { Icon28MasksOutline } from "@vkontakte/icons";
import { Icon20RemoveCircleOutline } from "@vkontakte/icons";
import {
  Button,
  Input,
  Panel,
  PanelHeader,
  PanelHeaderContent,
} from "@vkontakte/vkui";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArrayToNum, getRandNum } from "../../lib/modules/util";
import { Icon16Done } from "@vkontakte/icons";
import { LocationBlock } from "../../lib/components/LocationBlock/LocationBlock";
import { Icon20ViewOutline } from "@vkontakte/icons";

export const GamePanel = ({ id, setActiveView }) => {
  const gameData = useSelector((s) => s.game);
  const dispatch = useDispatch();
  const [action, setAction] = useState("nameInsert");
  const [gamemode, setGamemode] = useState("preparation");
  const [userRound, setUserRound] = useState(1);
  const [location, setLocation] = useState(getRandNum(1, 5));
  const [showCard, setShowCard] = useState(false);
  const [isShowSpies, setShowSpies] = useState(false);
  const [playersName, setPlayersName] = useState([]);
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
      type: "ui/setView",
      payload: "homeView",
    });
    setActiveView("homeView");
    return;
  };
  const seeCard = () => {
    setShowCard(true);
  };
  const showSpies = () => {
    setShowSpies(true);
  };

  const confirmNames = () => {
    return setAction("game");
  };

  useEffect(() => {
    console.log(playersName);
  }, [playersName]);

  console.log(gameData);
  return (
    <Panel id={id}>
      <PanelHeader separator={false}>
        <PanelHeaderContent before={<Icon28MasksOutline />} status="Игра">
          SPYFALL
        </PanelHeaderContent>
      </PanelHeader>
      {gameData.settings ? (
        <>
          {action == "nameInsert" ? (
            <div className="namesForm">
              <span className="header">Ввод данных игроков</span>
              {getArrayToNum(gameData.settings.playerCount - 1, 0).map(
                (v, i) => {
                  const onChange = (e) => {
                    const id = v;
                    const newData = [...playersName];
                    newData[id] = e.currentTarget.value;
                    return setPlayersName(newData);
                  };
                  return (
                    <Input
                      placeholder={`Имя игрока #${v + 1}`}
                      key={i}
                      onChange={onChange}
                    />
                  );
                }
              )}
              <div className="actions">
                <Button
                  mode="commerce"
                  size="m"
                  stretched
                  onClick={confirmNames}
                  before={<Icon16Done width={20} height={20} />}
                >
                  Начать игру
                </Button>
              </div>
            </div>
          ) : (
            <div className="gameContent">
              <div className="roundInfo">
                <span className="roundInfo__In">
                  {gamemode == "preparation"
                    ? `Просмотр карт | ${
                        playersName[userRound - 1]
                          ? playersName[userRound - 1]
                          : `Игрок #${userRound}`
                      }`
                    : `Карт больше нет`}
                </span>
              </div>

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
                      ? "ВЫ ШПИОН"
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
                  ) : !isShowSpies ? (
                    <Button
                      mode="commerce"
                      size="m"
                      onClick={showSpies}
                      before={<Icon20ViewOutline />}
                    >
                      Показать шпионов
                    </Button>
                  ) : (
                    <div className="spiesList">
                      {gameData.settings.spyPlayerId.length == 1
                        ? `Шпионом был игрок #${gameData.settings.spyPlayerId[0]}`
                        : `Шпионами были игрок #${gameData.settings.spyPlayerId[0]} и игрок #${gameData.settings.spyPlayerId[1]}`}
                    </div>
                  )}
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
          )}
        </>
      ) : null}
    </Panel>
  );
};
