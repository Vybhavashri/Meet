import { loadFeature, defineFeature } from "jest-cucumber";
import React from 'react';
import { mount } from 'enzyme';

import App from '../App';

// loadFeature expects file path to start from project root
const feature = loadFeature('./src/features/SpecifyNumberOfEvents.feature');

defineFeature(feature, test => {
  test('The app should display 32 events by default', ({ given, when, then }) => {
    let AppWrapper;
    given('the user has not specified a number of events to show', () => {
      AppWrapper = mount(<App />);
    });

    when('the user loads the data', () => {
      AppWrapper.update();
    });

    then(/^(\d+) events should be displayed.$/, (arg0) => {
      expect(AppWrapper.find('.event')).toHaveLength(2);
    });

  });

  test('When the user types a number into the textbox, the number of events displayed should match the input number', ({ given, when, then }) => {
    let AppWrapper;
    given('the main page is open', () => {
      AppWrapper = mount(<App />);
    });

    when('the user types a number into the number of events textbox', () => {
      AppWrapper.update();
      AppWrapper.find('.numberOfEvents').simulate('change', { target: { value: '1' } });
    });
    then('the number of events displayed should match the number input by the user unless there are fewer events than the specified number.', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event')).toHaveLength(1);
    });
  });

});