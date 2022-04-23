const init = {
  settings: null,
};

export const gameReducer = (state = init, action) => {
  const { type, payload } = action;
  switch (type) {
    case "game/setSettings":
      return { ...state, settings: payload };
    default:
      return state;
  }
};
