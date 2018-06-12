import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';

class WrappedInput extends Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, {value: props.property, prevValue: props.property});
  }

  render() {
    const {name, type, id, onChange} = this.props;

    return (
      <input
        className="form-control"
        // placeholder={name}
        name={name}
        value={this.state.value}
        type={type}
        onChange={(e) => {
          this.setState({prevValue: this.state.value, value: e.target.value});
        }}
        onBlur={(e) => {
          !_.isEqual(this.state.value, this.state.prevValue) ? onChange(id, e, type === 'number') : null;
        }}
      />);
  }
}

WrappedInput.propTypes = {
  property: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func
};

export default WrappedInput;
