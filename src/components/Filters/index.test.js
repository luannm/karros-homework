import React from 'react';
import { mount } from 'enzyme';
import Filters from './index';

describe('Filters component', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Filters />).render();
    expect(wrapper.find('.filters').length).toBe(1);
    expect(wrapper.find('.filters__filterController').length).toBe(6);
  });
});
