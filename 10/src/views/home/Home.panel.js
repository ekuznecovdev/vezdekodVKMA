import {
  Headline,
  Panel,
  PanelHeader,
  PanelHeaderContent,
} from "@vkontakte/vkui";
import { Icon28MasksOutline } from "@vkontakte/icons";
import { LocationBlock } from "../../lib/components/LocationBlock/LocationBlock";

export const HomePanel = ({ id }) => {
  return (
    <Panel id={id}>
      <PanelHeader separator={false}>
        <PanelHeaderContent before={<Icon28MasksOutline />} status="Локации">
          SPYFALL
        </PanelHeaderContent>
      </PanelHeader>
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
