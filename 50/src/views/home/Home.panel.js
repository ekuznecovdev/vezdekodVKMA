import {
  Button,
  Headline,
  Panel,
  PanelHeader,
  PanelHeaderContent,
  Placeholder,
  Slider,
} from "@vkontakte/vkui";
import { Icon28MasksOutline } from "@vkontakte/icons";
import { useEffect, useState } from "react";
import { Icon20GameOutline } from "@vkontakte/icons";
import { Icon28AddSquareOutline } from "@vkontakte/icons";
import { Icon20Users3Outline } from "@vkontakte/icons";
import { Icon28PictureStackOutline } from "@vkontakte/icons";
import { Icon20AddSquareOutline } from "@vkontakte/icons";
import { Icon20ClockOutline } from "@vkontakte/icons";
import { useDispatch, useSelector } from "react-redux";
import { getRandNum } from "../../lib/modules/util";
import axios from "axios";
import bridge from "@vkontakte/vk-bridge";

export const HomePanel = ({ id, setActiveView }) => {
  const dispatch = useDispatch();
  const [players, setPlayers] = useState(2);
  const vkData = useSelector((s) => s.user.vkData);
  const createGame = () => {
    const spyCount = 1;
    const spyPlayerId = getRandNum(1, players);
    const secondSpyPlayerId = getRandNum(1, players, spyPlayerId);
    let spyArr = [spyPlayerId];
    console.log(spyArr);
    if (players >= 9) {
      spyArr.push(secondSpyPlayerId);
    }
    dispatch({
      type: "game/setSettings",
      payload: {
        playerCount: players,
        spyCount: spyCount,
        spyPlayerId: spyArr,
        time: 0,
      },
    });
    setActiveView("gameView");
    return;
  };
  const createOnlineGame = async () => {
    const res = await axios
      .post("https://82.148.17.229:3000/api.php", {
        authData: {
          vkSign: window.location.search,
          vkId: vkData.id,
          timestamp: Date.now(),
        },
        method: "createGame",
        payload: {
          playerCount: players,
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
      // here error
    }
  };
  const openLocations = () => {
    setActiveView("locationsView");
    return;
  };
  const openTimer = () => {
    setActiveView("timerView");
    return;
  };

  useEffect(() => {
    const checkHash = async () => {
      if (window.location.hash) {
        const roomId = window.location.hash.split("#")[1];
        if (roomId && roomId.length > 0) {
          const res = await axios
            .post("https://82.148.17.229:3000/api.php", {
              authData: {
                vkSign: window.location.search,
                vkId: vkData.id,
                timestamp: Date.now(),
              },
              method: "joinGame",
              payload: {
                hash: roomId,
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
            // here error
          }
          window.location.hash = null
          return bridge.send("VKWebAppSetLocation", { location: "" });
        }
      }
    };
    checkHash();
  }, []);

  return (
    <Panel id={id}>
      <PanelHeader separator={false}>
        <PanelHeaderContent before={<Icon28MasksOutline />} status="Меню">
          SPYFALL
        </PanelHeaderContent>
      </PanelHeader>
      <Placeholder
        className="createGame"
        stretched
        icon={<Icon28AddSquareOutline width={56} height={56} fill="#aeb7c2" />}
        header="Создание игры"
      >
        <div className="gameSettings">
          <Slider
            step={1}
            min={2}
            max={12}
            value={players}
            onChange={(v) => setPlayers(v)}
          />
          <span className="players">Количество игроков: {players}</span>
          <div className="actions">
            <Button
              mode="commerce"
              size="m"
              stretched
              before={<Icon20GameOutline />}
              onClick={createGame}
            >
              Играть
            </Button>
            <Button
              mode="commerce"
              size="m"
              stretched
              before={<Icon20AddSquareOutline />}
              onClick={createOnlineGame}
            >
              Создать комнату
            </Button>
            <Button
              mode="secondary"
              hasHover={false}
              size="m"
              stretched
              before={<Icon28PictureStackOutline width={20} height={20} />}
              onClick={openLocations}
            >
              Локации
            </Button>
            <Button
              mode="secondary"
              hasHover={false}
              size="m"
              stretched
              before={<Icon20ClockOutline />}
              onClick={openTimer}
            >
              Таймер
            </Button>
          </div>
        </div>
      </Placeholder>
    </Panel>
  );
};
