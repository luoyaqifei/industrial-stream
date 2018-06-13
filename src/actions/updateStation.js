import * as types from '../constants/ActionTypes';

export const updateStation = (id, property, value, isNumber) => {
    return {
        type: types.UPDATE_STATION,
        id: id,
        property: property,
        value: isNumber ? parseFloat(value) : value
    };
};

export const onStationChange = (id, e, isNumber) => (dispatch)=> {
    dispatch(updateStation(id, e.target.name, e.target.value,  isNumber));
};
