import { Icon28MasksOutline, Icon20ArrowLeftOutline } from "@vkontakte/icons";
import {
  Button,
  Panel,
  PanelHeader,
  PanelHeaderContent,
} from "@vkontakte/vkui";
import { LocationBlock } from "../../lib/components/LocationBlock/LocationBlock";

export const LoactionsPanel = ({ id, setActiveView }) => {
  const backToCreate = () => {
    setActiveView("homeView");
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
