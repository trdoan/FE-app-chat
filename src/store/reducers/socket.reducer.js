import { io } from "socket.io-client";
const initialState = {
  socket: io("https://app-chat-realtime-vn.herokuapp.com/", {
    origin: "*",
  }),
  // socket: io("http://localhost:5001", {
  //   origin: "*",
  // }),
};

export const socketReducer = (state = initialState, { type, payload }) => {
  return state;
};
