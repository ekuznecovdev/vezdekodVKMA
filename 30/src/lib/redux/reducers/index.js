import { combineReducers } from "redux";
import { gameReducer } from "./game";
import { uiReducer } from "./ui";
import { userReducer } from "./user";

export const rootReducer = combineReducers({
  user: userReducer,
  ui: uiReducer,
  game: gameReducer,
});
