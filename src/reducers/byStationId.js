import * as types from '../constants/ActionTypes';
import * as _ from 'lodash';

export const byStationId = (state = {}, action) => {
  switch (action.type) {
    case types.RECEIVE_PROBLEM_SUCCESS:
      return {
        ...state,
        ...action.response.entities.stations
      };
    case types.UPDATE_STATION:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          [action.property]: action.value
        }
      };
    case types.ADD_STATION:
      const newStations = _.reduce(state, (newObj, s) => {
        if (s.order < action.previousSliblingOrder) {
          return { ...newObj, [s.id]: s };
        }
        else if (s.order == action.previousSliblingOrder) {
          return {
            ...newObj, [s.id]: s,
            [action.id]: {
              id: action.id,
              order: action.previousSliblingOrder + 1,
              "seconds-per-unit": null,
              limit: null,
            }
          };
        }
        else {
          return { ...newObj, [s.id]: { ...s, order: s.order + 1 } };
        }
      }, {});
      return newStations;
    case types.REMOVE_STATION:
      const newState = Object.assign({}, state);
      for (let station in newState) {
        if (newState[station].order > action.order) {
          newState[station].order = newState[station].order - 1;
        }
      }
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
}
