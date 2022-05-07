import { io } from "socket.io-client";
const initialState = {
  socket: io("https://api-meet-cdtt.herokuapp.com", {
    origin: "*",
  }),
};

export const socketReducer = (state = initialState, { type, payload }) => {
  return state;
};
