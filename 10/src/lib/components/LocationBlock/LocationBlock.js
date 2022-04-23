import "./index.scss";

export const LocationBlock = ({ name, cssName = "" }) => {
  return (
    <div className={`LocationBlock ${cssName}`}>
      <div className="description">
        <span className="description__In">{name}</span>
      </div>
    </div>
  );
};
