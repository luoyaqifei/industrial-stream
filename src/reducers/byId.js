import {combineReducers} from 'redux';
import {byCaseId} from "./byCaseId";
import {byStationId} from "./byStationId";

const byId = combineReducers({
  byCaseId,
  byStationId
});

export default byId;

export const getProblem = (state, id) => state[id];

export const getStation = (state, id) => state[id];
