import { ANSWER_CALL, CALL_USER, LEAVE_CALL } from "../constants/socket.constant";

export const answerCall = () => {
  return {
    type: ANSWER_CALL,
  };
};
export const callUser = () => {
  return {
    type: CALL_USER,
  };
};
export const leaveCall = () => {
  return {
    type: LEAVE_CALL,
  };
};
