import { userService } from "../../services/user/user.service";
import { USER_LOGIN } from "../constants/auth.constant";

export const userLoginAction = (userInfo) => {
  return async (dispatch) => {
    const data = await userService.login(userInfo);

    dispatch({ type: USER_LOGIN, payload: data });
  };
};
