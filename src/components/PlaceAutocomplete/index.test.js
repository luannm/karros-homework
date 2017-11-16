/* global jest */
import React from 'react';
import { mount } from 'enzyme';
import PlaceAutocomplete from './index';

describe('PlaceAutocomplete component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <PlaceAutocomplete
        onLocationSearch={() => {}}
        onLocationSelect={() => {}}
      />
    );
  });

  it('function: getLatLng should return latitude and longitude', () => {
    const EXPECTED_RESULT = {
      lat: 0.1,
      lng: 0.2,
      address: 'test'
    };
    wrapper.instance().getLatLng(EXPECTED_RESULT.address).then((result) => {
      expect(result).toEqual(EXPECTED_RESULT);
    });
  });

  it('function: fetchPredictions should call Google API if have value', () => {
    const spy = jest.spyOn(wrapper.instance().autocompleteService, 'getPlacePredictions');
    wrapper.instance().fetchPredictions('test');
    expect(spy).toHaveBeenCalled();
  });

  it('function: autocompleteCallback should update dataSource state', () => {
    const PREDICTIONS = [{
      description: 'test_1'
    }, {
      description: 'test_2'
    }];
    const EXPECTED_RESULT = [{
      text: 'test_1',
      value: 'test_1'
    }, {
      text: 'test_2',
      value: 'test_2'
    }];
    expect(wrapper.state('dataSource')).toEqual([]);
    wrapper.instance().autocompleteCallback(PREDICTIONS, 'OK');
    expect(wrapper.state('dataSource')).toEqual(EXPECTED_RESULT);
  });
});
