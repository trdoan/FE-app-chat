import { SAVE_USER } from "../constants/users.constant";

export const saveUserAction = (user) => {
  return {
    type: SAVE_USER,
    payload: user,
  };
};
