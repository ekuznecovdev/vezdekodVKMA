const init = {
  vkData: null,
  timerRest: 0,
};

export const userReducer = (state = init, action) => {
  const { type, payload } = action;
  switch (type) {
    case "user/setVkData":
      return { ...state, vkData: payload };
    case "user/setTimerRest":
      return { ...state, timerRest: payload };
    default:
      return state;
  }
};
