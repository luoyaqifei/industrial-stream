import {combineReducers} from "redux";
import * as types from '../constants/ActionTypes';

export const isFetching = (state = false, action) => {
  switch (action.type) {
    case types.REQUEST_PROBLEM:
      return true;
    case types.RECEIVE_PROBLEM_SUCCESS:
      return false;
    default:
      return state;
  }
};

export const id = (state = [], action) => {
  switch (action.type) {
    case types.RECEIVE_PROBLEM_SUCCESS:
      return action.response.result;
    // case types.ADD_PROBLEM:
    //   return [...state, action.id];
    default:
      return state;
  }
};

const problem = combineReducers({
  isFetching,
  id
});

export const getId = (state) => {
  return state.id;
};

export const getIsFetching = (state) => state.isFetching;

export default problem;

