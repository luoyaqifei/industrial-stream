import React, { Component } from "react";

export const StationItem = ({id, order, secondsPerUnit, limit, isLast}) => {
    return <tr>
        <td className="text-center">{order}</td>
        <td className="text-center">{secondsPerUnit}</td>
        <td className="text-center">{isLast ? null: (limit == null ? 0 : limit)}</td>
    </tr>;
}