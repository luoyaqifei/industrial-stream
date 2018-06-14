import React, { Component } from "react";
import WrappedInput from '../WrappedInput';
import v4 from 'uuid/v4';

export const StationItem = ({ id, order, secondsPerUnit, limit, isLast, onChange, onAddStationClicked, onRemoveStationClicked, problemId}) => {
    return <tr>
        <td className="text-center">{order}</td>
        <td>
            <WrappedInput
                property={secondsPerUnit}
                id={id}
                name="seconds-per-unit"
                type="number"
                onChange={onChange} />
        </td>
        {/* (limit == null ? 0 : limit) */}

        <td>{isLast ? null : <WrappedInput
            property={limit}
            id={id}
            name="limit"
            type="number"
            onChange={onChange} />}</td>
        <td>
            <button title="add a station below" type="button" className="btn btn-default btn-lg" onClick={() => onAddStationClicked(v4(), id, order, problemId)}>
                <span className="glyphicon glyphicon-plus" />
            </button>
            <button title="remove the station" type="button" className="btn btn-default btn-lg" onClick={() => onRemoveStationClicked(id, order, problemId, isLast)}>
                <span
                     className="glyphicon glyphicon-minus" />
            </button>
        </td>
    </tr>;
}