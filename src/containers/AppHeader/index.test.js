import React from 'react';
import configureStore from 'redux-mock-store';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import AppHeader from './index';

describe('AppHeader container', () => {
  const initialState = {
    yelp: {
      placeSuggestion: null,
      placeSuggestionError: null
    }
  };
  const mockStore = configureStore();
  let store;
  let container;

  beforeEach(() => {
    store = mockStore(initialState);
    container = shallow(
      <AppHeader
        store={store}
        searchPlace={sinon.stub().resolves(true)}
        getPlaceSuggestion={sinon.stub().resolves(true)}
      />
    ).dive();
  });

  it('function: updateDataSource should update state correctly', () => {
    const FAKE_DATA = {
      terms: [{
        text: 'term_1'
      }],
      categories: [{
        title: 'term_2'
      }],
      businesses: []
    };
    expect(container.state('placeDatasource')).toEqual([]);
    container.instance().updateDataSource(FAKE_DATA);
    expect(container.state('placeDatasource')).toEqual(['term_1', 'term_2']);
  });

  it('function: generateSearchParams should return correct params', () => {
    const EXPECTED_RESULT = {
      term: 'Tacos',
      latitude: 0.1,
      longitude: 0.2,
      address: 'New York'
    };
    container.setState({
      searchTerm: 'Tacos',
      searchLatLng: {
        lat: 0.1,
        lng: 0.2,
        address: 'New York'
      }
    });
    expect(container.instance().generateSearchParams()).toEqual(EXPECTED_RESULT);
  });
});
