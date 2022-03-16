import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';
import { Container, Row, Col } from "react-bootstrap";

class App extends Component {

  state = {
    events: [],
    locations: [],
    currentLocation: 'all',
    numberOfEvents: 32
  }

  componentDidMount() {
    const { numberOfEvents } = this.state.numberOfEvents;
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({
          events: events.slice(0, numberOfEvents),
          locations: extractLocations(events)
        });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location, numberOfEvents) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ?
        events :
        events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents.slice(0, this.state.numberOfEvents),
        currentLocation: location,
      });
    });
  }


  updateNumberOfEvents = (eventCount) => {
    const { currentLocation } = this.state;
    this.setState({
      numberOfEvents: eventCount,
    });
    this.updateEvents(currentLocation, eventCount);
  };

  render() {
    return (
      <Container>
        <br />
        <div className="App">
          <Row>
            <Col>
              <CitySearch
                locations={this.state.locations}
                updateEvents={this.updateEvents}
              />
            </Col>
            <Col>
              <NumberOfEvents
                numberOfEvents={this.state.numberOfEvents}
                updateNumberOfEvents={this.updateNumberOfEvents}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <EventList
                events={this.state.events} />
            </Col>
          </Row>
        </div>
      </Container>

    );
  }
}

export default App;
