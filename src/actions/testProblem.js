import config from '../../config';
import axios from 'axios';
import * as types from '../constants/ActionTypes';
import { wrappedDenormalizeProblem } from "../utilities/wrappedDenormalizeProblemCase";

const receiveTestResultSuccess = (response, id) => {
  return {
    type: types.RECEIVE_TEST_RESULT_SUCCESS,
    testResult: response.data,
    problemId: id
  };
};

const receiveTestResultFailure = (error, id) => {
  return {
    type: types.RECEIVE_TEST_RESULT_FAILURE,
    error,
    problemId: id
  };
};

const requestTestProblem = () => {
  return {
    type: types.REQUEST_TEST_RESULT,
  };
};

const testProblemRequest = (problem) => {
  return axios(`${config.protocol}://${config.hostname}:${config.serverPort}/value-stream`, {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(problem)
  });
};

export const testProblem = (id) => (dispatch, getState) => {
  dispatch(requestTestProblem());

  const denormalizedProblem = wrappedDenormalizeProblem(id, getState());
console.log(denormalizedProblem);
  // dispatch(receiveTestResultSuccess({ data: "This is the mock test result!!!" }, id))
  return testProblemRequest(denormalizedProblem)
    .then(response => {
      console.log(response)
      dispatch(receiveTestResultSuccess(response, id));
    })
    .catch(error => {
      dispatch(receiveTestResultFailure(error, id));
    });
};
