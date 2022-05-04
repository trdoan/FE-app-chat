import { fabClasses } from "@mui/material";
import Swal from "sweetalert2";
import { roomServices } from "../../services/room/room.service";
import {
  CHECK_PRIVATE_ROOM,
  CREATE_ROOM,
  FIND_ALL_ROOM,
  FIND_DETAIL_ROOM,
} from "../constants/room.constant";

export const findAllRoom = () => {
  return async (dispatch) => {
    const roomList = await roomServices.findAll();
    dispatch({
      type: FIND_ALL_ROOM,
      payload: roomList,
    });
  };
};
export const findOneRoomAction = (id) => {
  return async (dispatch) => {
    const roomInfo = await roomServices.findOne(id);
    dispatch({
      type: FIND_DETAIL_ROOM,
      payload: roomInfo,
    });
    if (roomInfo.type === "PUBLIC")
      dispatch({ type: CHECK_PRIVATE_ROOM, payload: true });
  };
};
export const checkPasswordRoom = (id, password) => {
  return async (dispatch) => {
    try {
      await roomServices.checkPassword(id, password);
      dispatch({ type: CHECK_PRIVATE_ROOM, payload: true });
    } catch (error) {
      Swal.fire("Lỗi xác thực", "Sai mật khẩu", "error");
      dispatch({ type: CHECK_PRIVATE_ROOM, payload: false });
    }
  };
};
export const createRoom = (data) => {
  return async (dispatch) => {
    const newRoom = await roomServices.create(data);
  };
};
export const deleteRoom = (id) => {
  return async (dispatch) => {
    await roomServices.delete(id);
  };
};
