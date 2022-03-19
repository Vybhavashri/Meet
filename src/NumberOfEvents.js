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
        <Row>
          <Col>
            <p>Number of events:</p>
            <input
              type="number"
              className="numberOfEvents"
              value={this.state.numberOfEvents}
              onChange={this.handleInputChange}
            />
          </Col>
          <Col>
            <ErrorAlert text={this.state.infoText} />
          </Col>
        </Row>
      </Container>
    )
  }
};

export default NumberOfEvents;