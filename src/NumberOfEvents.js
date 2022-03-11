import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32,
  }

  handleInputChange = (event) => {
    const value = event.target.value;
    if (value < 33 || value > 0) {
      this.setState({
        numberOfEvents: '',
      })
    } else {
      this.setState({
        numberOfEvents: value,
      });
    }
    this.props.updateNumberOfEvents(event.target.value);
  };

  render() {
    return (
      <div className="NumberOfEvents">
        <input
          type="number"
          className="numberOfEvents"
          value={this.props.numberOfEvents}
          onChange={(e) => this.props.updateNumberOfEvents(e)}
        />
      </div>
    )
  }
};
export default NumberOfEvents;