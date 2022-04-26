import { FETCH_DATA_OFF, FETCH_DATA_ON } from "../constants/common.constant";

const initialState = {
  isFetch: false,
};

const commonReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_DATA_ON:
      return { isFetch: true };
    case FETCH_DATA_OFF:
      return { isFetch: false };

    default:
      return state;
  }
};
export default commonReducer;
