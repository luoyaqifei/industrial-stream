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

export class ProblemItem extends Component {
  render() {
    const { isFetching } = this.props;
    const { problem, stations } = this.props;
    if (isFetching || problem == null) {
      return (<div>Loading...</div>);
    }
    let stationCount = stations.length;
    return (
      <div>
        <ProblemHeader />
        <h2>
          way: {problem.way}<br />
          number of units to produce: {problem["number-of-units"]}

        </h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th className="text-center"> station </th>
              <th className="text-center"> second per unit </th>
              <th className="text-center"> limit </th>
            </tr>
          </thead>
          <tbody>
            {stations.map(s => <StationItem
              key={s.id} id={s.id} order={s.order} secondsPerUnit={s["seconds-per-unit"]} limit={s.limit} isLast={s.order == stationCount} />)}
          </tbody>
        </table>
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
    stations: problem == null ? null : problem.stations.map(s => getStation(state.byId.byStationId, s))
  };
};

export default connect(mapStateToProps, actions)(ProblemItem);
