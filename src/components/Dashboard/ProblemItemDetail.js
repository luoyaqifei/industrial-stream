import React from 'react';
import WrappedInput from '../WrappedInput';
import WrappedDropdown from '../WrappedDropdown';
import * as _ from "lodash";
import { StationsHeader } from './StationsHeader';
import { StationItem } from './StationItem';

export const ProblemItemDetail = ({problem, onProblemChange, stations, onStationChange, onAddStationClicked, onRemoveStationClicked}) => {
    let stationCount = stations.length;

    return (<div><label>
        way: <WrappedDropdown className="form-control-static"
            property={problem.way}
            options={["push"]}
            id={problem.id}
            name="way"
            type="string"
            onChange={onProblemChange} />
        <br />
        number of units to produce: <WrappedInput className="form-control-static"
            property={problem["number-of-units"]}
            id={problem.id}
            name="number-of-units"
            type="number"
            onChange={onProblemChange} />
    </label>
        <table className="table table-striped">
            <StationsHeader />
            <tbody>
                {console.log('why',stations)}
                {stations.map(s => <StationItem
                    key={s.id}
                    id={s.id}
                    order={s.order}
                    secondsPerUnit={s["seconds-per-unit"]}
                    limit={s.limit}
                    isLast={s.order == stationCount}
                    onChange={onStationChange}
                    onAddStationClicked={onAddStationClicked} 
                    onRemoveStationClicked={onRemoveStationClicked}
                    problemId={problem.id} />)}
            </tbody>
        </table></div>);
}