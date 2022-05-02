import { roomServices } from "../../services/room/room.service";
import { CREATE_ROOM, FIND_ALL_ROOM } from "../constants/room.constant";

export const findAllRoom = () => {
  return async (dispatch) => {
    const roomList = await roomServices.findAll();

    dispatch({
      type: FIND_ALL_ROOM,
      payload: roomList,
    });
  };
};

export const createRoom = (data) => {
  return async (dispatch) => {
    const newRoom = await roomServices.create(data);
  };
};
