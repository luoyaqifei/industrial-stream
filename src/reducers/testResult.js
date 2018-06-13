import * as types from "../constants/ActionTypes";
import {combineReducers} from "redux";

const data = (state={}, action) => {
  switch (action.type) {
    case types.RECEIVE_TEST_RESULT_SUCCESS:
    console.log("result", action.testResult)
      return {
        ...state,
        [action.problemId]: action.testResult
      };
    default:
      return state;
  }
};

export const isFetching = (state = false, action) => {
  switch (action.type) {
    case types.REQUEST_TEST_RESULT:
    console.log("fetching")
    
      return true;
    case types.RECEIVE_TEST_RESULT_SUCCESS:
    console.log("not fetching")
      return false;
    default:
      return state;
  }
};

const testResult = combineReducers({
  isFetching,
  data
});

export default testResult;

export const getIsFetching = state => state.isFetching;
