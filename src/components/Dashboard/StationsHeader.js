import React from 'react';
import v4 from 'uuid/v4';

export const StationsHeader = ({onAddStationClicked}) => {
    return (<thead>
        <tr>
            <th className="text-center"> station </th>
            <th className="text-center"> seconds per unit </th>
            <th className="text-center"> limit between</th>
            <th>
                <button title="add a station below" type="button" className="btn btn-default btn-lg" onClick={() => onAddStationClicked(v4(), id, order, problemId)}>
                    <span className="glyphicon glyphicon-plus" />
                </button>
            </th>
        </tr>
    </thead>);
}
