import { userService } from "../../services/user/user.service";
import { ERROR_RESPONSE } from "../constants/auth.constant";
import { SAVE_USER, UPDATE_USER } from "../constants/users.constant";

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
      dispatch({ type: UPDATE_USER, payload: "" });
      dispatch({
        type: "SUCCESS",
        payload: { status: "SUCCESS", message: "Cập nhật thành công" },
      });
    } catch (error) {
      dispatch({ type: ERROR_RESPONSE, payload: error });
    }
  };
};
