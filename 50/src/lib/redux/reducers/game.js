const init = {
  settings: null,
  onlineSettings: null,
};

export const gameReducer = (state = init, action) => {
  const { type, payload } = action;
  switch (type) {
    case "game/setSettings":
      return { ...state, settings: payload };
    case "game/setOnlineSettings":
      return { ...state, onlineSettings: payload };
    default:
      return state;
  }
};
