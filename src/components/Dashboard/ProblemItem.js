import React, { Component } from "react";
import { connect } from "react-redux";
import { getProblem } from "../../reducers";
import { Link } from "react-router";
import * as actions from '../../actions/index';
import * as _ from "lodash";
import { StationItem } from './StationItem';
import { getIsFetching } from "../../reducers/problemReducer";
import { getStation } from "../../reducers/byId";
import ProblemHeader from "./ProblemHeader";
import TestProblemBtn from './TestProblemBtn';
import { StationsHeader } from './StationsHeader';
import { RECEIVE_PROBLEM_SUCCESS } from "../../constants/ActionTypes";
import WrappedInput from '../WrappedInput';
import WrappedDropdown from '../WrappedDropdown';
import { TestResult } from './TestResult';

export class ProblemItem extends Component {
  render() {
    const { isFetching } = this.props;
    const { problem, stations } = this.props;
    if (isFetching || problem == null) {
      return (<div>Loading...</div>);
    }
    let stationCount = stations.length;
    const { testResult, onStationChange, onProblemChange } = this.props;
    return (
      <div>
        <ProblemHeader />
        <h2>
          way: <WrappedDropdown className="form-control-static"
            property={problem.way}
            options={["push", "pull"]}
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
        </h2>
        <table className="table table-striped">
          <StationsHeader />
          <tbody>
            {stations.map(s => <StationItem
              key={s.id}
              id={s.id}
              order={s.order}
              secondsPerUnit={s["seconds-per-unit"]}
              limit={s.limit}
              isLast={s.order == stationCount}
              onChange={onStationChange} />)}
          </tbody>
        </table>
        <h2>
          <TestProblemBtn {...this.props} />
        </h2>
        {_.isEmpty(testResult.data)
          ? null
          : <TestResult
            isFetching={testResult.isFetching}
            data={testResult.data[problem.id]} />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const problem = getProblem(state);
  console.log("stations", problem == null ? null : problem.stations.map(s => getStation(state.byId.byStationId, s)))
  return {
    problem,
    isFetching: getIsFetching(state),
    stations: problem == null ? null : problem.stations.map(s => getStation(state.byId.byStationId, s)),
    testResult: state.testResult,
  };
};

export default connect(mapStateToProps, actions)(ProblemItem);
