import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {IndexLink} from "react-router";
import ConnectedHomePage from "./HomePage";

export default class App extends Component {
  render() {
    return (
      <div className="container">
        {/* {/* <IndexLink to="/"> */}
          <span className="text-primary"> Dashboard </span>
          {/* <span className="glyphicon glyphicon-home"/> */}
        {/* </IndexLink> */} 
        <ConnectedHomePage/>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};
