import { SAVE_USER } from "../constants/users.constant";

const initialState = {};
export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SAVE_USER:
      return { ...state, google: payload };
    default:
      return state;
  }
};
