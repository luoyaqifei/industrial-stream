import * as types from '../constants/ActionTypes';

export const byStationId = (state = {}, action) => {
  if (action.type === types.RECEIVE_PROBLEM_SUCCESS && action.response) {
    return {
      ...state,
      ...action.response.entities.stations
    };
  }
  else if (action.type === types.UPDATE_STATION) {
    return {
      ...state,
      [action.id]: {
        ...state[action.id],
        [action.property]: action.value
      }
    };
  }
  return state;
};
