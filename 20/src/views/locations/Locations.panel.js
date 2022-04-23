import { Icon28MasksOutline } from "@vkontakte/icons";
import {
  Button,
  Headline,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  PanelHeaderContent,
} from "@vkontakte/vkui";
import { useDispatch } from "react-redux";
import { LocationBlock } from "../../lib/components/LocationBlock/LocationBlock";
import { Icon20ArrowLeftOutline } from "@vkontakte/icons";

export const LoactionsPanel = ({ id }) => {
  const dispatch = useDispatch();
  const backToCreate = () => {
    dispatch({
      type: "ui/setView",
      payload: "homeView",
    });
    return;
  };
  return (
    <Panel id={id}>
      <PanelHeader separator={false}>
        <PanelHeaderContent before={<Icon28MasksOutline />} status="Локации">
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
      <div className="locationList">
        <LocationBlock cssName="island" name="Остров" />
        <LocationBlock cssName="jungle" name="Джунгли" />
        <LocationBlock cssName="mine" name="Шахта" />
        <LocationBlock cssName="park" name="Парк" />
        <LocationBlock cssName="sahara" name="Пустыня" />
        <LocationBlock cssName="underground" name="Подвал" />
      </div>
    </Panel>
  );
};
