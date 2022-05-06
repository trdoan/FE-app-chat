import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { authService } from "../../services/auth/auth.service";
import {
  ERROR_RESPONSE,
  LOGIN,
  SET_LOGIN_FALSE,
  SET_LOGIN_TRUE,
  SIGN_UP,
} from "../constants/auth.constant";
import { SAVE_USER } from "../constants/users.constant";
import { fetchDataOffAction, fetchDataOnAction } from "./common.action";

export const loginAction = (userInfo) => {
  return async (dispatch) => {
    dispatch(fetchDataOnAction());
    try {
      const data = await authService.signIn(userInfo);
      await dispatch({ type: LOGIN, payload: data });
      await dispatch(checkTokenAction());
      dispatch(fetchDataOffAction());
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
      dispatch(fetchDataOffAction());
      Swal.fire({
        title: "LỖI XÁC THỰC",
        text: error.message,
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
  };
};
export const checkTokenAction = (url, navigate) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      // await dispatch(fetchDataOnAction());
      const user = await authService.checkToken(token);

      //console.log("user action", user.contentToken);
      localStorage.setItem("user", JSON.stringify(user.contentToken));
      dispatch({ type: SAVE_USER, payload: user.contentToken });
      await dispatch({ type: SET_LOGIN_TRUE, payload: user });
      // dispatch(fetchDataOffAction());
    } catch (error) {
      if (url !== "/home") {
        Swal.fire("LỖI XÁC THỰC", "VUI LÒNG ĐĂNG NHẬP LẠI", "error");
        navigate("/");
      }
      dispatch({ type: SET_LOGIN_FALSE });

      // await dispatch(fetchDataOffAction());
    }
  };
};
export const signUpAction = (userInfo) => {
  return async (dispatch) => {
    try {
      const data = await authService.signUp(userInfo);
      Swal.fire("THÔNG BÁO", "ĐĂNG KÝ TÀI KHOẢN THÀNH CÔNG", "success");
    } catch (error) {
      Swal.fire({
        title: "LỖI XÁC THỰC",
        text: error.message,
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
  };
};

export const logoutAction = () => {
  return {
    type: "LOGOUT",
    payload: false,
  };
};
