import React from 'react';
import { mount } from 'enzyme';
import ResultCard from './index';

describe('ResultCard component', () => {
  it('should render correctly', () => {
    const DATA = {
      name: 'testName',
      url: 'http://abc.com/',
      image_url: 'abcdef',
      rating: 5,
      review_count: 20,
      price: '$$$',
      categories: [{
        title: 'cat_1'
      }, {
        title: 'cat_2'
      }],
      location: {
        display_address: ['a', 'b', 'c']
      },
      display_phone: '0123456789'
    };

    const wrapper = mount(
      <ResultCard
        number={1}
        data={DATA}
      />
    ).render();

    expect(wrapper.find('.resultCard__photo').prop('src')).toBe(DATA.image_url);
    expect(wrapper.find('.resultCard__title').text()).toBe('1. testName');
    expect(wrapper.find('.resultCard__titleUrl').prop('href')).toBe(DATA.url);
    expect(wrapper.find('.resultCard__rate__desc').text()).toBe(`${DATA.review_count} reviews`);
    expect(wrapper.find('.resultCard__phone').text()).toBe(DATA.display_phone);
    expect(wrapper.find('.resultCard__address').text()).toBe('a b c');
  });
});
