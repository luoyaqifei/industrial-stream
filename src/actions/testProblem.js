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
  if (problem["time-interval"] === null
    || problem["time-interval"] === undefined
    || problem["time-interval"] === ''
    || problem['time-interval'] === NaN) {
    return testProblemRequestTotal(problem);
  }
  else {
    return testProblemRequestWithTimeInterval(problem);
  }
}

const testProblemRequestTotal = (problem) => {
  return axios(`${config.protocol}://${config.hostname}:${config.serverPort}/value-stream`, {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(problem)
  });
};

const testProblemRequestWithTimeInterval = (problem) => {
  const problemMock = {
    "way": "push",
    "stations": [
      {
        "id": "2afcd031-0d3e-4f79-8a58-9202b2577a6f",
        "seconds-per-unit": 60,
        "limit": null,
        "order": 1
      },
      {
        "id": "ddfaa7ed-faec-4e82-8056-613fc7010103",
        "seconds-per-unit": 90,
        "limit": null,
        "order": 2
      }
    ],
    "number-of-units": 120,
    "time-interval": 800
  }
  // return axios(`${config.protocol}://${config.hostname}:${config.serverPort}/value-stream-status`, {
  return axios(`${config.protocol}://${config.hostname}:${config.jsonServerPort}/value-stream-status`, {
    method: 'get',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    // data: JSON.stringify(problemMock)
  });
};

export const testProblem = (id) => (dispatch, getState) => {
  dispatch(requestTestProblem());

  const denormalizedProblem = wrappedDenormalizeProblem(id, getState());
  return testProblemRequest(denormalizedProblem)
    .then(response => {
      console.log(response)
      dispatch(receiveTestResultSuccess(response, id));
    })
    .catch(error => {
      dispatch(receiveTestResultFailure(error, id));
    });
};
