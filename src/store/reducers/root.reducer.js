import { combineReducers } from "redux";
import { authReducer } from "./auth.reducer";
import { userReducer } from "./user.reducer";
export const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
});
