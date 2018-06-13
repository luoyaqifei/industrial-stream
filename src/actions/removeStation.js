import * as types from '../constants/ActionTypes';

export const removeStation = (id, order, problemId, isLast) => {
    return {
        type: types.REMOVE_STATION,
        id: id,
        order: order,
        problemId: problemId,
        isLast: isLast
    };
};

export const onRemoveStationClicked = (id, order, problemId, isLast) => (dispatch) => {
    dispatch(removeStation(id, order, problemId, isLast));
};