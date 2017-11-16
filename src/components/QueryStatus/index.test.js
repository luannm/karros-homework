import React from 'react';
import { mount } from 'enzyme';
import QueryStatus from './index';

describe('QueryStatus component', () => {
  it('should render correctly without searchTerm and searchLocation', () => {
    const wrapper = mount(<QueryStatus />).render();
    expect(wrapper.find('h1').text()).toEqual('Browsing ');
  });

  it('should render correctly without searchTerm', () => {
    const wrapper = mount(<QueryStatus searchLocation="New York" />).render();
    expect(wrapper.find('h1').text()).toEqual('Browsing New York');
  });

  it('should render correctly with searchTerm and searchLocation', () => {
    const wrapper = mount(<QueryStatus searchTerm="Tacos" searchLocation="New York" />).render();
    expect(wrapper.find('h1').text()).toEqual('Best Tacos in New York');
  });

  it('should render correctly pagination status', () => {
    const wrapper = mount(
      <QueryStatus showDataFrom={1} showDataTo={10} searchTotal={20} />
    ).render();
    expect(wrapper.find('span').text()).toEqual('Showing 1-10 of 20');
  });
});
