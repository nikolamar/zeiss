import machinesApi from "../apis/machines-api";
import * as actionTypes from "./action-types";

export const machineSetList = () => async (dispatch) => {
  const response = await machinesApi.get("/machines");

  dispatch({
    type: actionTypes.MACHINE_SET_LIST,
    payload: response.data.data,
  });
};

export const machineUpdateStatus = (payload) => {
  return {
    type: actionTypes.MACHINE_UPDATE_STATUS,
    payload,
  };
};

export const machineUpdateIndex = (payload) => {
  return {
    type: actionTypes.MACHINE_UPDATE_INDEX,
    payload,
  };
};

export const socketError = (payload) => ({
  type: actionTypes.SOCKET_ERROR,
  payload,
});

export const socketStatus = (payload) => ({
  type: actionTypes.SOCKET_STATUS,
  payload,
});

export const searchOn = () => ({
  type: actionTypes.SEARCH_ON,
  payload: true,
});

export const searchOff = () => ({
  type: actionTypes.SEARCH_OFF,
  payload: false,
});

export const searchSetList = (payload) => ({
  type: actionTypes.SEARCH_SET_LIST,
  payload,
});
