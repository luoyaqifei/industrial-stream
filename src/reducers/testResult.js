import * as types from "../constants/ActionTypes";

const testResult = (state={}, action) => {
  switch (action.type) {
    case types.RECEIVE_TEST_RESULT_SUCCESS:
      return {
        ...state,
        [action.problemId]: action.testResult
      };
    default:
      return state;
  }
};

export default testResult;

export const getIsFetching = state => state.isFetching;
