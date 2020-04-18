import {
  GET_CATEGORIES,
  GET_CATEROGY,
  REGISTRY_UPDATE,
  GET_ERROR,
  CHANGE_SELECTED_CATEGORY,
} from "./consts";

export const getCategoriesSuccess = (payload) => {
  return {
    type: GET_CATEGORIES,
    payload,
  };
};
export const getCategorySuccess = (payload) => {
  return {
    type: GET_CATEROGY,
    payload,
  };
};
export const changeSelectedCategory = (payload) => {
  return {
    type: CHANGE_SELECTED_CATEGORY,
    payload,
  };
};
export const registryUpdate = (registry, payload) => {
  return {
    type: REGISTRY_UPDATE,
    payload,
  };
};
export const getError = (payload) => {
  return {
    type: GET_ERROR,
    payload,
  };
};
