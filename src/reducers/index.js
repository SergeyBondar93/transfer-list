import { createStore, combineReducers } from 'redux';
import { setIn } from 'utilitify'


import { GET_CATEGORIES, 
  GET_CATEGORIES_SUCCESS, 
  GET_CATEGORIES_ERROR, 
  GET_CATEROGY_LISTS,
  GET_CATEROGY_LISTS_SUCCESS,
  GET_CATEROGY_LISTS_ERROR,
  REMOVE_CATEROGY,
  REMOVE_CATEROGY_SUCCESS,
  REMOVE_CATEROGY_ERROR,
  UPDATE_CATEGORY_ITEM,
  UPDATE_CATEGORY_ITEM_SUCCESS,
  UPDATE_CATEGORY_ITEM_ERROR,
  ADD_CATEGORY_ITEM,
  ADD_CATEGORY_ITEM_SUCCESS,
  ADD_CATEGORY_ITEM_ERROR,
  REMOVE_CATEGORY_ITEM,
  REMOVE_CATEGORY_ITEM_SUCCESS,
  REMOVE_CATEGORY_ITEM_ERROR,
} from '../consts/actions';


const initialState = {
  categories: {
    list: [],
    loading: false,
    error: null 
  },
  caterogy: {
    lists: [],
    loading: false,
    error: null
  }
}

const categories = (state = initialState.categories, action) => {
  switch (action.type) {
    case GET_CATEGORIES: {
      return setIn(state, true, ['loading'])
    }
    case GET_CATEGORIES_SUCCESS: {
      let newState = setIn(state, false, ['loading']);
      newState = setIn(newState, action.payload, ['list'])
      return newState
    }
    case GET_CATEGORIES_ERROR: {
      let newState = setIn(state, false, ['loading']);
      newState = setIn(state, action.payload, ['error']);
      return newState
    }
    default:
      return state;
  }
};


// REMOVE_CATEROGY
// REMOVE_CATEROGY_SUCCESS
// REMOVE_CATEROGY_ERROR
// UPDATE_CATEGORY_ITEM
// UPDATE_CATEGORY_ITEM_SUCCESS
// UPDATE_CATEGORY_ITEM_ERROR
// ADD_CATEGORY_ITEM
// ADD_CATEGORY_ITEM_SUCCESS
// ADD_CATEGORY_ITEM_ERROR
// REMOVE_CATEGORY_ITEM
// REMOVE_CATEGORY_ITEM_SUCCESS
// REMOVE_CATEGORY_ITEM_ERROR

const category = (state = initialState.caterogy, action) => {
  switch (action.type) {
    case GET_CATEROGY_LISTS: {
      return setIn(state, true, ['loading'])
    }
    case GET_CATEROGY_LISTS_SUCCESS: {
      let newState = setIn(state, false, ['loading']);
      newState = setIn(newState, action.payload, ['list'])
      return newState
    }
    case GET_CATEROGY_LISTS_ERROR: {
      let newState = setIn(state, false, ['loading']);
      newState = setIn(state, action.payload, ['error']);
      return newState
    }
    default:
      return state;
  }
}


export const store = createStore(
  combineReducers({
    categories,
    category
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)