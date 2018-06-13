import * as types from '../constants/ActionTypes';

export const updateProblem = (id, property, value, isNumber) => {
    return {
        type: types.UPDATE_PROBLEM,
        id: id,
        property: property,
        value: isNumber ? parseFloat(value) : value
    };
};

export const onProblemChange = (id, e, isNumber) => (dispatch)=> {
    dispatch(updateProblem(id, e.target.name, e.target.value,  isNumber));
};
