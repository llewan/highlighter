import React from 'react';
import { shallow } from 'enzyme';
import Highlighter from './highlighter';

describe('<Highlighter />', () => {
  const wrapper = shallow(<Highlighter />);
  it('should render highlighter section', () => {
    expect(wrapper.find('.highlighter').length).toEqual(1);
  });
  it('should render edition and highlighter section', () => {
    expect(wrapper.find('.highlighter__text').length).toEqual(1);
  });
  it('should render a filter section', () => {
    expect(wrapper.find('.highlighter__filter').length).toEqual(1);
  });
  it('should render three button actions', () => {
    expect(wrapper.find('.highlighter__action').length).toEqual(3);
  });
  it('should render a ColorPicker component', () => {
    expect(wrapper.find('ColorPicker').length).toEqual(1);
  });
  it('should render a Filter component', () => {
    expect(wrapper.find('Filter').length).toEqual(1);
  });
});
