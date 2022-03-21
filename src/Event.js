import React, { Component } from "react";
import { Button, Card, CardGroup } from 'react-bootstrap';
import moment from 'moment';

class Event extends Component {
  state = {
    event: {},
    collapsed: true,
  }

  handleClick = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const { event } = this.props;
    const { collapsed } = this.state;

    return (
      <div className='event'>
        <CardGroup>
          <Card>
            <Card.Body>
              <h3 className="summary">{event.summary} </h3>

              <Card.Text className="start-date">
                {moment(event.start.dateTime).format('lll')} - {moment(event.end.dateTime).format("h:mm a")}
              </Card.Text>

              <Card.Text className="location">
                {event.location}
              </Card.Text>

              <Button
                className={`${collapsed ? "show" : "hide"}-details`}
                onClick={this.handleClick}>
                {collapsed ? "Show Details" : "Hide Details"}
              </Button>

              {!collapsed &&
                <div className={`extra-details ${this.state.collapsed ? "hide" : "show"}`}>
                  <h4>About the event:</h4>
                  <p className="event-description">{event.description}</p>
                  <a href={event.htmlLink} rel="noreferrer" target="_blank">
                    See details on Google Calendar
                  </a>
                </div>
              }
            </Card.Body>
          </Card>
        </CardGroup>
      </div>
    )
  }
}

export default Event;