import Swal from "sweetalert2";
import { userService } from "../../services/user/user.service";
import { ERROR_RESPONSE } from "../constants/auth.constant";
import { SAVE_USER, SET_USER, UPDATE_USER } from "../constants/users.constant";
import { checkTokenAction } from "./auth.action";

export const saveUserAction = (user) => {
  return {
    type: SAVE_USER,
    payload: user,
  };
};
export const updateUserAction = (user) => {
  return async (dispatch) => {
    try {
      await userService.update(user);
      // dispatch({ type: UPDATE_USER, payload: "" });
      await dispatch({ type: SET_USER, payload: user.displayName });
      Swal.fire("THÔNG BÁO", "CẬP NHẬT HỒ SƠ THÀNH CÔNG", "success");
      dispatch(checkTokenAction(localStorage.getItem("token")));
    } catch (error) {
      dispatch({ type: ERROR_RESPONSE, payload: error });
    }
  };
};
