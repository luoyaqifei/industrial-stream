import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';

class WrappedTextarea extends Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, {value: props.property, prevValue: props.property});
  }

  render() {
    const {name, placeholder, id, onChange} = this.props;

    return (
      <textarea
        className="form-control"
        placeholder={placeholder}
        name={name}
        value={this.state.value}
        onChange={(e) => {
          this.setState({prevValue: this.state.value, value: e.target.value});
        }}
        onBlur={(e) => {
          !_.isEqual(this.state.value, this.state.prevValue) ? onChange(id, e) : null;
        }}
      />);
  }
}

WrappedTextarea.propTypes = {
  property: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  parentId: PropTypes.string,
  onChange: PropTypes.func
};

export default WrappedTextarea;
