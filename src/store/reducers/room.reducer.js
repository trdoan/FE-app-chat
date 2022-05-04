import {
  CHECK_PRIVATE_ROOM,
  FIND_ALL_ROOM,
  FIND_DETAIL_ROOM,
} from "../constants/room.constant";

const initialState = {
  roomList: [],
  currentRoom: {
    isValid: false,
  },
};
const roomReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case FIND_ALL_ROOM:
      state.roomList = payload;
      return { ...state };
    case FIND_DETAIL_ROOM:
      return { ...state, currentRoom: { ...state.currentRoom, info: payload } };
    case CHECK_PRIVATE_ROOM:
      return {
        ...state,
        currentRoom: { ...state.currentRoom, isValid: payload },
      };
    default:
      return state;
  }
};

export default roomReducer;
