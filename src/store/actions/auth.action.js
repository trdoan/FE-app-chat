import { toast } from "react-toastify";
import { authService } from "../../services/auth/auth.service";
import { ERROR_RESPONSE, LOGIN, SIGN_UP } from "../constants/auth.constant";

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
