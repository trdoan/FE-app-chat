import { toast } from "react-toastify";
import { authService } from "../../services/auth/auth.service";
import {
  ERROR_RESPONSE,
  LOGIN,
  SET_LOGIN_FALSE,
  SET_LOGIN_TRUE,
  SIGN_UP,
} from "../constants/auth.constant";

export const loginAction = (userInfo) => {
  return async (dispatch) => {
    try {
      const data = await authService.signIn(userInfo);
      dispatch({ type: LOGIN, payload: data });
      toast.success("Đăng nhập thành công", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      dispatch({ type: ERROR_RESPONSE, payload: error });
    }
  };
};
export const checkTokenAction = (token) => {
  return async (dispatch) => {
    try {
      await authService.checkToken(token);
      dispatch({ type: SET_LOGIN_TRUE });
    } catch (error) {
      dispatch({ type: SET_LOGIN_FALSE });
    }
  };
};
export const signUpAction = (userInfo) => {
  return async (dispatch) => {
    try {
      const data = await authService.signUp(userInfo);
      dispatch({ type: "SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: ERROR_RESPONSE, payload: error });
    }
  };
};

export const logoutAction = () => {
  return {
    type: "LOGOUT",
    payload: false,
  };
};
