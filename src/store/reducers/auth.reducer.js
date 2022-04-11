import { USER_LOGIN } from "../constants/auth.constant";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";

const initialState = {
  isLogin: false,
};

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_LOGIN:
      const decode = jwt_decode(payload.token);
      console.log({ decode });
      localStorage.setItem("user", JSON.stringify(decode));
      localStorage.setItem("token", payload.token);
      return { ...state, isLogin: true, token: payload.token };
    default:
      return state;
  }
};
