import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import EventGenre from './EventGenre';
import { OfflineAlert } from './Alert';
import { getEvents, extractLocations } from './api';
import { Container, Row, Col } from "react-bootstrap";
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

class App extends Component {

  state = {
    events: [],
    locations: [],
    currentLocation: 'all',
    numberOfEvents: 32,
    offlineText: '',
  }

  async componentDidMount() {
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
    if (!navigator.onLine) {
      this.setState({
        offlineText: 'You are currently offline, events may not be updated.'
      })
    } else {
      this.setState({
        offlineText: ''
      })
    }
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
    });
  }

  updateNumberOfEvents = (eventCount) => {
    const { currentLocation } = this.state;
    this.setState({
      numberOfEvents: eventCount,
    });
    this.updateEvents(currentLocation, eventCount);
  };

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length
      const city = location.split(', ').shift()
      return { city, number };
    })
    return data;
  };

  render() {
    return (
      <Container className='App' fluid>
        <OfflineAlert text={this.state.offlineText} />
        <p>{this.state.offlineText}</p>
        <h1>Meet App</h1>
        <h4>Choose your nearest city</h4>
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        /><p className='citySearchAlert'></p>
        <h4>Choose number of events</h4>
        <NumberOfEvents
          numberOfEvents={this.state.numberOfEvents}
          updateNumberOfEvents={this.updateNumberOfEvents}
        /><br /><hr />
        <h4>Events in each city</h4>
        <div className='data-vis-wrapper'>

          <EventGenre events={this.state.events} />

          <ResponsiveContainer height={400} >
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20, }}>
              <CartesianGrid />
              <XAxis type="category" dataKey="city" name="city" />
              <YAxis type="number" dataKey="number" name="Number of Events" allowDecimals={false} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={this.getData()} fill="#8a2a0a" />
            </ScatterChart>
          </ResponsiveContainer>

        </div>
        <br /><hr />
        <EventList
          events={this.state.events} />
      </Container>
    );
  }
}

export default App;
