import { SAVE_USER, SET_USER } from "../constants/users.constant";

const initialState = {
  info: JSON.parse(localStorage.getItem("user")),
};
export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USER:
      return { ...state, info: { ...state.info, displayName: payload } };
    case SAVE_USER:
      return { ...state, google: payload };
    default:
      return state;
  }
};
