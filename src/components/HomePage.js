import React, { Component } from 'react';
import ConnectedProblemItem from "./Dashboard/ProblemItem";
// import Header from "./Header/Header";
import { connect } from "react-redux";
import * as actions from '../actions';
import PropTypes from 'prop-types';

export class HomePage extends Component {
  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const { fetchProblem } = this.props;
    fetchProblem();
  }

  render() {
    return (
      <div>

        {/* <Header page="HomePage" /> */}
        <ConnectedProblemItem />

      </div>
    );
  }
}

export default connect(null, actions)(HomePage);
