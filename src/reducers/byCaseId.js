import * as types from '../constants/ActionTypes';

export const byCaseId = (state = {}, action) => {
  if (action.type == types.RECEIVE_PROBLEM_SUCCESS && action.response) {
    return {
      ...state,
      ...action.response.entities.problem
    };
  }
  else if (action.type === types.ADD_PROBLEM) {
    return {
      ...state,
      [action.id]: {
        id: action.id,
        sections: [],
        name: ''
      }
    };
  }
  else if (action.type === types.UPDATE_PROBLEM) {
    return {
      ...state,
      [action.id]: {
        ...state[action.id],
        [action.property]: action.value
      }
    };
  }
  else if (action.type === types.ADD_STATION) {
    return {
      ...state,
      [action.problemId]: {
        ...state[action.problemId],
        stations: [
          ..._.takeWhile(state[action.problemId].stations, i => i != action.previousSliblingId),
          action.previousSliblingId,
          action.id,
          ..._.takeRightWhile(state[action.problemId].stations, i => i != action.previousSliblingId)
        ]
      }
    };
  }
  else if (action.type === types.REMOVE_STATION) {
    return {
      ...state,
      [action.problemId]: {
        ...state[action.problemId],
        stations: [
          ..._.takeWhile(state[action.problemId].stations, i => i != action.id),
          ..._.takeRightWhile(state[action.problemId].stations, i => i != action.id)
        ]
      }
    }
  }
  return state;
};
