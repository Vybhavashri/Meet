import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: '32',
  }

  handleInputChange = (event) => {
    const value = event.target.value;
    this.setState({
      numberOfEvents: value,
    });

  }

  render() {
    return (
      <div className="NumberOfEvents">
        <input
          type="number"
          className="numberOfEvents"
          value={this.state.numberOfEvents}
          onChange={this.handleInputChange}
        />
      </div>
    )
  }
};
export default NumberOfEvents;