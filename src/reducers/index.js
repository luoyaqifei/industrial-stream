import {routerReducer} from 'react-router-redux';
import {combineReducers} from 'redux';
import problem, * as fromProblem from "./problemReducer";
import byId, * as fromById from "./byId";
import testResult from './testResult';

const rootReducer = combineReducers({
  byId,
  problem,
  testResult,
  routing: routerReducer
});

export default rootReducer;

export const getProblem = (state) => {
  const id = fromProblem.getId(state.problem);
  return fromById.getProblem(state.byId.byCaseId, id);
};

export const getIsProblemCasesFetching = (state) => {
  return fromList.getIsFetching(state.problemCaseList);
};


