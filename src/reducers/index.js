import { createStore, combineReducers } from "redux";
import { setIn } from "utilitify";

import {
  GET_ALL_LISTS,
  GET_LIST,
  GET_USER,
  LIST_CREATED_SUCCESS,
  LOGOUT,
  REGISTRY_UPDATE,
  APP_INIT,
  APP_ERROR,
} from "../actions/consts";

const initialState = {
  allLists: [],
  list: {},
  registry: {},
  errors: {},
  user: {},
  app: {},
};

const allLists = (state = initialState.allLists, action) => {
  switch (action.type) {
    case GET_ALL_LISTS: {
      return action.payload;
    }
    case LIST_CREATED_SUCCESS: {
      return [...state, action.payload];
    }

    case LOGOUT: {
      return [];
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

    case LOGOUT: {
      return {};
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
    case LOGOUT: {
      return {};
    }
    default:
      return state;
  }
};

const registry = (state = initialState.registry, action) => {
  const { registry, value } = action.payload || {};
  switch (action.type) {
    case REGISTRY_UPDATE:
      return { ...state, [registry]: value };
    default:
      return state;
  }
};

const app = (state = initialState.app, action) => {
  switch (action.type) {
    case APP_INIT:
      return {
        isInit: true,
        error: false,
      };
    case APP_ERROR:
      return {
        isInit: true,
        error: true,
      };

    default:
      return state;
  }
};

export const store = createStore(
  combineReducers({
    allLists,
    list,
    user,
    registry,
    app,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
