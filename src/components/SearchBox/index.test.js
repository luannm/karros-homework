import React from 'react';
import { mount } from 'enzyme';
import SearchBox from './index';
import PlaceAutocomplete from '../PlaceAutocomplete';

describe('SearchBox component', () => {
  it('should render successfully', () => {
    const wrapper = mount(<SearchBox />);
    expect(wrapper.render().find('.searchBox__input').length).toBe(2);
    expect(wrapper.render().find('.searchBox__button').length).toBe(1);
    expect(wrapper.find(PlaceAutocomplete).length).toBe(1);
  });
});
