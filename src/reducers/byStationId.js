import * as types from '../constants/ActionTypes';

export const byStationId = (state = {}, action) => {
  if (action.response) {
    return {
      ...state,
      ...action.response.entities.stations
    };
  }
  return state;
};
