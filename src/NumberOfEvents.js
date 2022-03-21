import React, { Component } from 'react';
import { ErrorAlert } from './Alert';
import { Container, Row, Col } from "react-bootstrap";

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32,
    infoText: '',
  }

  handleInputChange = (event) => {
    const value = event.target.value;
    if (value > 32 || value < 1) {
      this.setState({
        infoText: 'Select numbers from 1 to 32'
      });
    } else {
      this.setState({
        numberOfEvents: value,
        infoText: '',
      });
    }
    this.props.updateNumberOfEvents(event.target.value);
  };

  render() {
    return (
      <Container className="NumberOfEvents">
        <input
          type="number"
          className="numberOfEvents"
          value={this.state.numberOfEvents}
          onChange={this.handleInputChange}
        /><br />
        <ErrorAlert className="Alert" text={this.state.infoText} />

      </Container>
    )
  }
};
export default NumberOfEvents;