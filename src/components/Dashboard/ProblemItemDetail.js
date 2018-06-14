import React from 'react';
import WrappedInput from '../WrappedInput';
import WrappedDropdown from '../WrappedDropdown';
import * as _ from "lodash";
import { StationsHeader } from './StationsHeader';
import { StationItem } from './StationItem';

export const ProblemItemDetail = ({ problem, onProblemChange, stations, onStationChange, onAddStationClicked, onRemoveStationClicked }) => {
    let stationCount = stations.length;
    return (<div>
        <label>Way: </label>
        <WrappedDropdown
            property={problem.way}
            options={["push"]}
            id={problem.id}
            name="way"
            type="string"
            onChange={onProblemChange} />
        <br />
        {/* <div class="input-group mb-3">
            <div class="input-group-prepend">
                <button class="btn btn-outline-secondary" type="button">Button</button>
            </div>
            <input type="text" class="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1">
        </div> */}
        <label>
            Number of Units to Produce:
        </label>
        <WrappedInput
            // className="form-control-static"
            property={problem["number-of-units"]}
            id={problem.id}
            name="number-of-units"
            type="number"
            onChange={onProblemChange} />
        <br />

        {/* <div className="input-group mb-3"> */}
        <label>
            Snapshot after Time of:  (seconds)
            </label>
        <WrappedInput
            // className="form-control-static"
            property={problem["time-interval"]}
            id={problem.id}
            name="time-interval"
            type="number"
            onChange={onProblemChange} />
        {/* <div className="input-group-append">
                <span className="input-group-text" id="basic-addon2">s</span>
            </div> */}
        {/* </div> */}
        <br />
        <label>
            Cost per Unit: ($)
        </label>
        <WrappedInput
            // className="form-control-static"
            property={problem["cost-per-unit"]}
            id={problem.id}
            name="cost-per-unit"
            type="number"
            onChange={onProblemChange} />
        <br />
        <label>
            Revenue per Unit: ($)
        </label>
        <WrappedInput
            // className="form-control-static"
            property={problem["revenue-per-unit"]}
            id={problem.id}
            name="revenue-per-unit"
            type="number"
            onChange={onProblemChange} />
        <br />


        <table className="table table-striped">
            <StationsHeader onAddStationClicked={onAddStationClicked}
                order={0}
                id={undefined}
                problemId={problem.id}
            />
            <tbody>
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