import React, {Component} from 'react';

class TestProblemBtn extends Component {
  render() {
    const {testProblem, problem} = this.props;
    return (
      <button type="button" className="btn btn-primary btn-sm"
              onClick={() => testProblem(problem.id)}>
        Simulate
      </button>
    );
  }
}

export default TestProblemBtn;
