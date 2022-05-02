import { combineReducers } from "redux";
import { authReducer } from "./auth.reducer";
import commonReducer from "./common.reducer";
import roomReducer from "./room.reducer";
import { socketReducer } from "./socket.reducer";
import { userReducer } from "./user.reducer";
export const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  socket: socketReducer,
  common: commonReducer,
  room: roomReducer,
});
