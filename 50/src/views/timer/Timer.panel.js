import {
  Icon20ArrowLeftOutline,
  Icon20RemoveCircleOutline,
  Icon24DoneOutline,
  Icon56RecentOutline,
  Icon28MasksOutline,
} from "@vkontakte/icons";
import {
  Button,
  Panel,
  PanelHeader,
  PanelHeaderContent,
  Slider,
} from "@vkontakte/vkui";
import { useState } from "react";
import { useSelector } from "react-redux";
import { timerAPI } from "../../lib/modules/timer";
import { toHumanTime } from "../../lib/modules/util";

export const TimerPanel = ({ id, setActiveView }) => {
  const timeRest = useSelector((s) => s.user.timerRest);
  const [players, setPlayers] = useState(2);
  const backToCreate = () => {
    setActiveView("homeView");
    return;
  };
  const startTimer = () => {
    timerAPI.start(players * 60);
  };
  const resetTimer = () => {
    timerAPI.reset();
  };
  return (
    <Panel id={id}>
      <PanelHeader separator={false}>
        <PanelHeaderContent before={<Icon28MasksOutline />} status="Таймер">
          SPYFALL
        </PanelHeaderContent>
      </PanelHeader>
      <Button
        mode="tertiary"
        size="s"
        before={<Icon20ArrowLeftOutline />}
        hasActive={false}
        hasHover={false}
        onClick={backToCreate}
      >
        Назад
      </Button>
      {timeRest == 0 ? (
        <div className="timerCreate">
          <Icon56RecentOutline fill="#aeb7c2" />
          <span className="header">Установка таймера</span>
          <div className="timerSettings">
            <Slider
              step={1}
              min={2}
              max={12}
              value={players}
              onChange={(v) => setPlayers(v)}
            />
            <span className="desc timerTime">
              Продолжительность раунда: {players} мин
            </span>
          </div>
          <div className="actions">
            <Button
              size="m"
              mode="commerce"
              onClick={startTimer}
              before={<Icon24DoneOutline width={20} height={20} />}
            >
              Запустить
            </Button>
          </div>
        </div>
      ) : (
        <div className="timerSee">
          <span className="description">Осталось:</span>
          <span className="timeRest">{toHumanTime(timeRest)}</span>
          <div className="actions">
            <Button
              size="m"
              mode="destructive"
              onClick={resetTimer}
              before={<Icon20RemoveCircleOutline />}
            >
              Сбросить
            </Button>
          </div>
        </div>
      )}
    </Panel>
  );
};
