import React from 'react';
import { shallow } from 'enzyme';
import Filter from './filter';

const highlights = [
  { from: 10, to: 14, highlight: 'you', colorToHighlight: 'blue' },
  { from: 4, to: 5, highlight: 'Hello', colorToHighlight: 'blue' },
  { from: 5, to: 7, highlight: 'who', colorToHighlight: 'green' },
];

const onSetFilterColorSpy = jest.fn();

describe('<Filter />', () => {
  const wrapper = shallow(<Filter
    highlights={highlights}
    filterByColor={'blue'}
    onSetFilterColor={onSetFilterColorSpy}
  />);

  it('should render two blue highlights', () => {
    expect(wrapper.find('.filter__words__row').length).toEqual(2);
  });

  it('should render highlights on ASC order', () => {
    const first = wrapper.find('.filter__words__row').first().children().props().text;
    const last = wrapper.find('.filter__words__row').last().children().props().text;;
    expect(first).toEqual('Hello');
    expect(last).toEqual('you');
  });

  it('should render two blue highlights', () => {
    wrapper.setProps({ highlights, filterByColor: 'green', onSetFilterColor: () => {}});
    expect(wrapper.find('.filter__words__row').length).toEqual(1);
  });
});
