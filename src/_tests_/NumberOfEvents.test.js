
import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';


describe('<NumberOfEvents /> component', () => {

  let NumberOfEventsWrapper;

  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />)
  });

  test('render text input', () => {
    expect(NumberOfEventsWrapper.find('.numberOfEvents')).toHaveLength(1);
  });

  test('default number of events rendered', () => {
    expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(32);
  })

  test("number of events is changed in input", () => {
    NumberOfEventsWrapper.find(".numberOfEvents").simulate("change", {
      target: { value: 16 },
    });
    expect(NumberOfEventsWrapper.state("numberOfEvents")).toBe(16);
  });

});