import * as types from '../constants/ActionTypes';

export const addStation = (id, previousSliblingId, previousSliblingOrder, problemId) => {
    return {
        type: types.ADD_STATION,
        id: id,
        previousSliblingId: previousSliblingId,
        previousSliblingOrder: previousSliblingOrder,
        problemId: problemId
    };
};

export const onAddStationClicked = (id, previousSliblingId, previousSliblingOrder, problemId) => (dispatch)=> {
    dispatch(addStation(id, previousSliblingId, previousSliblingOrder, problemId));
};