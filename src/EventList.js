import React, { Component } from 'react';
import Event from './Event';
import { Container, Row, Col } from "react-bootstrap";
import { WarningAlert } from './Alert';

class EventList extends Component {
  state = {
    warningText: '',
  }

  componentDidMount() {
    if (!navigator.onLine) {
      this.setState({
        warningText: 'You are offline! The displayed event list is loaded from the cache.'
      })
    }
    else {
      this.setState({
        warningText: ''
      })
    }
  }

  render() {
    const { events } = this.props;
    return (
      <Container className="eventlist-container">
        <br /><br /><br />
        <WarningAlert text={this.state.warningText} />
        <Row className="d-flex justify-content-center eventlist">
          {events.map((event) => (
            <Col sm={12} md={6} lg={4} key={event.id}>
              <Event event={event} />
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

export default EventList;