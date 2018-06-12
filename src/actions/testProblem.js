import config from '../../config';
import axios from 'axios';
import * as types from '../constants/ActionTypes';
import {wrappedDenormalizeProblem} from "../utilities/wrappedDenormalizeProblemCase";

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

const testProblemRequest = (probleme) => {
  return new Promise(resolve => "hahaha");
};

export const testProblem = (id) => (dispatch, getState) => {
  console.log("id",id);
  dispatch(requestTestProblem());

  const denormalizedProblem = wrappedDenormalizeProblem(id, getState());

  dispatch(receiveTestResultSuccess({data: "This is the mock test result!!!"}, id))
    // return testProblemRequest(denormalizedProblem)
    //   .then(response => {
    //     console.log(response)
    //     dispatch(receiveTestResultSuccess(response, id));
    //   })
    //   .catch(error => {
    //     dispatch(receiveTestResultFailure(error, id));
    //   });
};
