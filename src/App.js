import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';
import { Container, Row, Col } from "react-bootstrap";
import { WarningAlert } from "./Alert";

class App extends Component {

  state = {
    events: [],
    locations: [],
    currentLocation: 'all',
    numberOfEvents: 32,
    warningText: '',
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

  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ?
        events :
        events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents.slice(0, this.state.numberOfEvents),
        currentLocation: location,
      });
      if (!navigator.onLine) {
        this.setState({
          warningText: 'You are offline! The event list is loaded from the cache.'
        })
      }
      else {
        this.setState({
          warningText: ''
        })
      }
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
    const { warningText } = this.state;
    return (
      <Container className='App' fluid>
        <Row>
          <h1>Meet App</h1>
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
            {!navigator.onLine
              ? (<WarningAlert text={WarningAlertText} />)
              : (<WarningAlert text={WarningAlertText} />)}
            <EventList
              events={this.state.events} />
          </Col>
        </Row>
        <Row>
          <Col>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
