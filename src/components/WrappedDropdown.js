import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as _ from "lodash";

class WrappedDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, {value: props.property, prevValue: props.property});
  }

  render() {
    const {name, id, onChange, options} = this.props;

    return (
      <select
        className="form-control"
        name={name}
        value={this.state.value}
        onChange={(e) => {
          this.setState({prevValue: this.state.value, value: e.target.value});
        }}
        onBlur={(e) => {
          !_.isEqual(this.state.value, this.state.prevValue) ? onChange(id, e) : null;
        }}>
        {
          options.map(option =>
            <option key={id.concat(option)}>{option}</option>
          )
        }
      </select>);
  }
}

WrappedDropdown.propTypes = {
  property: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // type: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array
};

export default WrappedDropdown;
