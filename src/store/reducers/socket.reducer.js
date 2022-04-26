import { io } from "socket.io-client";
const initialState = {
  socket: io("http://localhost:5001", {
    origin: "*",
  }),
};

export const socketReducer = (state = initialState, { type, payload }) => {
  return state;
};
