const init = {
  activeView: "loadingView",
};

export const uiReducer = (state = init, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ui/setView":
      return { ...state, activeView: payload };
    default:
      return state;
  }
};
