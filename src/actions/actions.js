import {
  GET_ALL_LISTS,
  GET_LIST,
  REGISTRY_UPDATE,
  GET_ERROR,
  CHANGE_SELECTED_LIST,
  GET_USER,
  LIST_CREATED_SUCCESS,
} from "./consts";

export const getAllListsSuccess = (payload) => {
  return {
    type: GET_ALL_LISTS,
    payload,
  };
};
export const getListSuccess = (payload) => {
  return {
    type: GET_LIST,
    payload,
  };
};
export const listCreatedSuccess = (payload) => {
  return {
    type: LIST_CREATED_SUCCESS,
    payload,
  };
};
export const changeSelectedList = (payload) => {
  return {
    type: CHANGE_SELECTED_LIST,
    payload,
  };
};
export const registryUpdate = (registry, value) => {
  return {
    type: REGISTRY_UPDATE,
    payload: {
      registry,
      value,
    },
  };
};
export const getError = (payload) => {
  return {
    type: GET_ERROR,
    payload,
  };
};

export const setUser = (user) => {
  return {
    type: GET_USER,
    payload: user,
  };
};
