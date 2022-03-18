import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import { Container, Row, Col } from "react-bootstrap";
import WelcomeScreen from './WelcomeScreen';
import { OfflineAlert } from './Alert';

class App extends Component {

  state = {
    events: [],
    locations: [],
    currentLocation: 'all',
    numberOfEvents: 32,
    showWelcomeScreen: undefined,
    OfflineAlertText: '',
  }

  async componentDidMount() {
    const { numberOfEvents } = this.state.numberOfEvents;
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false :
      true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });

    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({
            events: events.slice(0, numberOfEvents),
            locations: extractLocations(events)
          });
        }
      });
    }
    if (!navigator.onLine) {
      this.setState({
        OfflineAlertText: 'You are currently offline, events may not be updated.'
      })
    } else {
      this.setState({
        OfflineAlertText: ''
      })
    }
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
    if (this.state.showWelcomeScreen === undefined) return <div
      className="App" />
    const { OfflineAlertText } = this.state.OfflineAlertText;
    return (
      <Container>
        <br />
        <div className="App">
          <OfflineAlert text={OfflineAlertText} />
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
          <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen}
            getAccessToken={() => { getAccessToken() }} />
        </div>
      </Container>
    );
  }
}

export default App;
