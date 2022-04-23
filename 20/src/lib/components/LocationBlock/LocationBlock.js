import "./index.scss";
import { Icon28LocationMapOutline } from "@vkontakte/icons";
import { Icon20UserOutline } from "@vkontakte/icons";

export const LocationBlock = ({
  name,
  cssName = "",
  role,
  className = "",
  showDesc = true,
}) => {
  return (
    <div className={`LocationBlock ${showDesc ? cssName : ""} ${className}`}>
      {showDesc ? (
        <div className="description">
          <span className="description__In">{name}</span>
        </div>
      ) : null}
    </div>
  );
};
