import { FIND_ALL_ROOM } from "../constants/room.constant";

const initialState = {
  roomList: [],
};
const roomReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case FIND_ALL_ROOM:
      state.roomList = payload;
      return { ...state };
    default:
      return state;
  }
};

export default roomReducer;
