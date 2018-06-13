import React, { Component } from "react";
import WrappedInput from '../WrappedInput';

export const StationItem = ({ id, order, secondsPerUnit, limit, isLast, onChange }) => {
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
    </tr>;
}