import { createStore, combineReducers } from "redux";
import { setIn } from "utilitify";

import {
  GET_CATEGORIES,
  GET_CATEROGY,
  CHANGE_SELECTED_CATEGORY,
} from "../actions/consts";

const initialState = {
  categories: {
    data: [],
    selectedCategory: null,
  },
  caterogy: {
    data: [],
  },
  registry: {},
  errors: {},
};

const categories = (state = initialState.categories, action) => {
  switch (action.type) {
    case GET_CATEGORIES: {
      return setIn(state, action.payload, ["data"]);
    }
    case CHANGE_SELECTED_CATEGORY: {
      return setIn(state, action.payload, ["selectedCategory"]);
    }
    default:
      return state;
  }
};

const category = (state = initialState.caterogy, action) => {
  switch (action.type) {
    case GET_CATEROGY: {
      return setIn(state, action.payload, ["data"]);
    }
    default:
      return state;
  }
};

export const store = createStore(
  combineReducers({
    categories,
    category,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
