import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { ERROR_RESPONSE, LOGIN } from "../constants/auth.constant";

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
    default:
      return state;
  }
};
