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
import { getArrayToNum, getRandNum, toHumanTime } from "../../lib/modules/util";
import { Icon16Done } from "@vkontakte/icons";
import { LocationBlock } from "../../lib/components/LocationBlock/LocationBlock";
import { Icon20ViewOutline } from "@vkontakte/icons";
import { Icon20DoorArrowRightOutline } from "@vkontakte/icons";
import axios from "axios";

export const GamePanel = ({ id, setActiveView }) => {
  const dispatch = useDispatch();
  const gameData = useSelector((s) => s.game.onlineSettings);
  const vkData = useSelector((s) => s.user.vkData);
  const [location] = useState(gameData.gameSettings.location);
  const [showSpies, setShowSpies] = useState(false);
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

  const showSpiesFunc = () => {
    setShowSpies(true);
    return;
  };

  const gameExit = async () => {
    const res = await axios
      .post("http://localhost:3000/api.php", {
        authData: {
          vkSign: window.location.search,
          vkId: vkData.id,
          timestamp: Date.now(),
        },
        method: "exitGame",
        payload: {
          hash: gameData.gameHash,
        },
      })
      .catch((e) => {
        return {
          status: false,
          deadConnection: true,
          errorText: "Сервер временно недоступен",
        };
      });
    if (!res.data) {
      // here error, server offline
    }
    if (res.data.status) {
      // game created
    } else {
      // here error
    }
    setActiveView("homeView");
    return;
  };

  const startGame = async () => {
    const res = await axios
      .post("http://localhost:3000/api.php", {
        authData: {
          vkSign: window.location.search,
          vkId: vkData.id,
          timestamp: Date.now(),
        },
        method: "startGame",
      })
      .catch((e) => {
        return {
          status: false,
          deadConnection: true,
          errorText: "Сервер временно недоступен",
        };
      });
    if (!res.data) {
      // here error, server offline
    }
    if (res.data.status) {
      // game created
    } else {
      // here error
    }
    return;
  };

  const endGame = async () => {
    const res = await axios
      .post("http://localhost:3000/api.php", {
        authData: {
          vkSign: window.location.search,
          vkId: vkData.id,
          timestamp: Date.now(),
        },
        method: "deleteGame",
      })
      .catch((e) => {
        return {
          status: false,
          deadConnection: true,
          errorText: "Сервер временно недоступен",
        };
      });
    if (!res.data) {
      // here error, server offline
    }
    if (res.data.status) {
      // game created
    } else {
      // here error
    }
    setActiveView("homeView");
    return;
  };

  useEffect(() => {
    const i = setInterval(async () => {
      const res = await axios
        .post("http://localhost:3000/api.php", {
          authData: {
            vkSign: window.location.search,
            vkId: vkData.id,
            timestamp: Date.now(),
          },
          method: "gameInfo",
          payload: {
            hash: gameData.gameHash,
          },
        })
        .catch((e) => {
          return {
            status: false,
            deadConnection: true,
            errorText: "Сервер временно недоступен",
          };
        });
      if (!res.data) {
        // here error, server offline
      }
      if (res.data.status) {
        // game created
        dispatch({
          type: "game/setOnlineSettings",
          payload: res.data.gameData,
        });
        setActiveView("onlineGameView");
      } else {
        setActiveView("homeView");
        // here error
      }
    }, 1000);
    return () => clearInterval(i);
  }, []);

  console.log(gameData);
  return (
    <Panel id={id}>
      <PanelHeader separator={false}>
        <PanelHeaderContent before={<Icon28MasksOutline />} status="Игра">
          SPYFALL
        </PanelHeaderContent>
      </PanelHeader>
      {gameData ? (
        <div className="gameContent">
          <div className="roundInfo">
            <span className="roundInfo__In">
              {gameData.gameSettings.time > 0
                ? toHumanTime(gameData.gameSettings.time)
                : "Игра окончена"}
            </span>
          </div>

          <div className="cardWrapper">
            <LocationBlock
              showDesc={gameData.gameSettings.inGame}
              cssName={
                !gameData.gameSettings.spyPlayerId.includes(
                  gameData.playersId.indexOf(vkData.id) + 1
                )
                  ? locations[location - 1]
                  : ""
              }
              name={
                gameData.gameSettings.spyPlayerId.includes(
                  gameData.playersId.indexOf(vkData.id) + 1
                )
                  ? "ВЫ ШПИОН"
                  : ruLocations[location - 1]
              }
              className={`card ${`card--show card--location${location}`}`}
            />
          </div>

          {gameData.gameOwner != vkData.id && !gameData.gameSettings.inGame ? (
            <div className="actionsWrapper">
              <div className="actions">
                {!gameData.gameSettings.inGame ? (
                  <div className="spiesList" style={{ marginBottom: 5 }}>
                    зашло {gameData.playersId.length}/
                    {gameData.gameSettings.playerCount}
                  </div>
                ) : null}
                {gameData.gameSettings.time == 0 ? (
                  <>
                    {!showSpies ? (
                      <Button
                        mode="commerce"
                        size="m"
                        onClick={showSpiesFunc}
                        before={<Icon20ViewOutline />}
                      >
                        Показать шпионов
                      </Button>
                    ) : (
                      <div className="spiesList">
                        {gameData.gameSettings.spyPlayerId.length == 1
                          ? `Шпионом был игрок #${gameData.gameSettings.spyPlayerId[0]}`
                          : `Шпионами были игрок #${gameData.gameSettings.spyPlayerId[0]} и игрок #${gameData.gameSettings.spyPlayerId[1]}`}
                      </div>
                    )}
                  </>
                ) : null}
                <Button
                  size="m"
                  mode="destructive"
                  before={<Icon20DoorArrowRightOutline />}
                  onClick={gameExit}
                >
                  Покинуть комнату
                </Button>
              </div>
            </div>
          ) : null}

          {gameData.gameOwner == vkData.id ? (
            <div className="actionsWrapper">
              <div className="actions">
                {!gameData.gameSettings.inGame ? (
                  <div className="spiesList" style={{ marginBottom: 5 }}>
                    зашло {gameData.playersId.length}/
                    {gameData.gameSettings.playerCount}
                  </div>
                ) : null}
                {gameData.gameSettings.time == 0 ? (
                  <>
                    {!showSpies ? (
                      <Button
                        mode="commerce"
                        size="m"
                        onClick={showSpiesFunc}
                        before={<Icon20ViewOutline />}
                      >
                        Показать шпионов
                      </Button>
                    ) : (
                      <div className="spiesList">
                        {gameData.gameSettings.spyPlayerId.length == 1
                          ? `Шпионом был игрок #${gameData.gameSettings.spyPlayerId[0]}`
                          : `Шпионами были игрок #${gameData.gameSettings.spyPlayerId[0]} и игрок #${gameData.gameSettings.spyPlayerId[1]}`}
                      </div>
                    )}
                  </>
                ) : null}
                {!gameData.gameSettings.inGame ? (
                  <>
                    <Input
                      value={"https://vk.com/app8147048#" + gameData.gameHash}
                      readOnly
                    />
                    <Button
                      size="m"
                      mode="commerce"
                      before={<Icon16Done width={20} height={20} />}
                      onClick={startGame}
                      disabled={
                        gameData.playersId.length <
                        gameData.gameSettings.playerCount
                      }
                    >
                      Начать игру
                    </Button>
                  </>
                ) : null}
                <Button
                  size="m"
                  mode="destructive"
                  before={<Icon20RemoveCircleOutline />}
                  onClick={endGame}
                >
                  Удалить комнату
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </Panel>
  );
};
