import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import {
  ERROR_RESPONSE,
  LOGIN,
  SET_LOGIN_FALSE,
  SET_LOGIN_TRUE,
} from "../constants/auth.constant";

const initialState = {
  isLogin: false,
};

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN:
      console.log({ payload });
      try {
        const user = jwt_decode(payload.token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", payload.token);
        return { isLogin: true, token: payload.token };
      } catch (error) {
        return state;
      }
    case ERROR_RESPONSE:
      return { error: payload };
    case "OPEN_MODAL":
      return {};
    case "SUCCESS":
      return { success: payload };
    case "LOGOUT":
      return { ...state, isLogin: payload };
    case SET_LOGIN_TRUE:
      return { ...state, isLogin: true };
    case SET_LOGIN_FALSE:
      return { ...state, isLogin: false };
    default:
      return state;
  }
};
