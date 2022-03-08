import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mockData';

describe('<EventList /> component', () => {
  let EventWrapper;

  beforeAll(() => {
    EventWrapper = shallow(<Event event={mockData[1]} />);
  });

  test('render an event', () => {
    expect(EventWrapper.find('.event')).toHaveLength(1);
  })

  test('render the location', () => {
    expect(EventWrapper.find('.location')).toHaveLength(1);
  })

  test('render the summary', () => {
    expect(EventWrapper.find('.summary')).toHaveLength(1);
  })

  test("Date and timezone are displayed", () => {
    expect(EventWrapper.find(".start-date")).toHaveLength(1);
  });

  test('render the show details button', () => {
    expect(EventWrapper.find('.show-details')).toHaveLength(1);
  });

  test("event element is collapsed by default", () => {
    expect(EventWrapper.state("collapsed")).toBe(true);
  });

  test('open details when the button is clicked', () => {
    EventWrapper.setState({
      collapsed: true
    });
    EventWrapper.find('.show-details').simulate('click');
    expect(EventWrapper.state('collapsed')).toBe(false);
  });

  test('hide details when the button is clicked', () => {
    EventWrapper.setState({
      collapsed: false
    });
    EventWrapper.find('.hide-details').simulate('click');
    expect(EventWrapper.state('collapsed')).toBe(true);
  });

});