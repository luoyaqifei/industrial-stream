import * as types from '../constants/ActionTypes';

export const byCaseId = (state = {}, action) => {
  if (action.type == types.RECEIVE_PROBLEM_SUCCESS && action.response) {
    return {
      ...state,
      ...action.response.entities.problem
    };
  }
  else if (action.type === types.ADD_PROBLEM_CASE) {
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
  else if (action.type === types.ADD_SECTION) {
    return {
      ...state,
      [action.caseId]: {
        ...state[action.caseId],
        sections: [
          ...state[action.caseId].sections,
          action.id
        ]
      }
    };
  }
  return state;
};
