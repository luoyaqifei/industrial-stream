import React, {Component} from 'react';
import * as _ from 'lodash';

class WrappedInput extends Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, {value: props.property, prevValue: props.property});
  }

  render() {
    const {name, type, id, onChange, className} = this.props;

    return (
      <input
        className={className?className:"form-control"}
        placeholder={name}
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

export default WrappedInput;
