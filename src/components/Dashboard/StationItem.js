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
            <button type="button" class="btn btn-default btn-lg" onClick={() => onAddStationClicked(v4(), id, order, problemId)}>
                <span title="add a station below" className="glyphicon glyphicon-plus" />
            </button>
            <button type="button" class="btn btn-default btn-lg" onClick={() => onRemoveStationClicked(id, order, problemId, isLast)}>
                <span
                    title="remove this station" className="glyphicon glyphicon-minus" />
            </button>
        </td>
    </tr>;
}