import React, { Component } from "react";
import { connect } from "react-redux";
import { getProblem } from "../../reducers";
import { Link } from "react-router";
import * as actions from '../../actions/index';
import * as _ from "lodash";
import { getIsFetching } from "../../reducers/problemReducer";
import { getStation } from "../../reducers/byId";
import ProblemHeader from "./ProblemHeader";
import TestProblemBtn from './TestProblemBtn';
import WrappedInput from '../WrappedInput';
import WrappedDropdown from '../WrappedDropdown';
import { TestResult } from './TestResult';
import { ProblemItemDetail } from "./ProblemItemDetail";

export class ProblemItem extends Component {
  render() {
    const { isFetching } = this.props;
    const { problem, stations } = this.props;
    if (isFetching || problem == null) {
      return (<div>Loading...</div>);
    }
    const { testResult, onStationChange, onProblemChange, onAddStationClicked, onRemoveStationClicked } = this.props;
    return (
      <div>
        <ProblemHeader />
        <ProblemItemDetail {...this.props}/>
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
  console.log('problem aaa', problem);
  console.log("stations aaa", problem == null ? null : problem.stations.map(s => getStation(state.byId.byStationId, s)))
  return {
    problem,
    isFetching: getIsFetching(state),
    stations: problem == null ? null : problem.stations.map(s => getStation(state.byId.byStationId, s)),
    testResult: state.testResult,
  };
};

export default connect(mapStateToProps, actions)(ProblemItem);
