import { createStore, combineReducers } from "redux";
import { setIn } from "utilitify";

import {
  GET_ALL_LISTS,
  GET_LIST,
  GET_USER,
  LIST_CREATED_SUCCESS,
} from "../actions/consts";

const initialState = {
  allLists: [],
  list: {},
  registry: {},
  errors: {},
  user: {},
};

const allLists = (state = initialState.allLists, action) => {
  switch (action.type) {
    case GET_ALL_LISTS: {
      return action.payload;
    }
    case LIST_CREATED_SUCCESS: {
      return [...state, action.payload];
    }
    default:
      return state;
  }
};

const list = (state = initialState.list, action) => {
  switch (action.type) {
    case GET_LIST: {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
};

const user = (state = initialState.user, action) => {
  switch (action.type) {
    case GET_USER: {
      return action.payload;
    }
    default:
      return state;
  }
};

export const store = createStore(
  combineReducers({
    allLists,
    list,
    user,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
