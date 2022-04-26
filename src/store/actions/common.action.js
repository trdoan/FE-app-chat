import { FETCH_DATA_OFF, FETCH_DATA_ON } from "../constants/common.constant";

export const fetchDataOnAction = () => {
  return {
    type: FETCH_DATA_ON,
  };
};
export const fetchDataOffAction = () => {
  return {
    type: FETCH_DATA_OFF,
  };
};
