import * as schema from "../schemas/index";
import {normalize} from 'normalizr';
import config from '../../config';
import axios from 'axios';
import * as types from '../constants/ActionTypes';

const requestProblem = () => {
  return {
    type: types.REQUEST_PROBLEM,
  };
};

const receiveProblem = (body) => {
  return {
    type: types.RECEIVE_PROBLEM_SUCCESS,
    response: normalize(body, schema.problem)
  };
};

const receiveProblemFailure = (error) => {
  return {
    type: types.RECEIVE_PROBLEM_FAILURE,
    message: error
  };
};

export const fetchProblem = () => (dispatch) => {
  dispatch(requestProblem());

  return axios.get(`http://${config.hostname}:${config.jsonServerPort}/problem`)
    .then(response => {
      console.log("hahha");
      dispatch(receiveProblem(response.data));
    })
    .catch(error => {
      dispatch(receiveProblemFailure(error));
    });
};



