import React from 'react';
import { shallow } from 'enzyme';
import Panel from './panel';

describe('<Panel />', () => {
  const onHighlightSpy = jest.fn();
  const onSelectTextToHighlightSpy = jest.fn();
  const baseProps = {
    onHighlight: onHighlightSpy,
    onSelectTextToHighlight: onSelectTextToHighlightSpy,
    colorToHighlight: 'green',
    text: [],
    textToHighlight: 'hola',
  };

  it('should render on highlight Mode', () => {
    const wrapper = shallow(<Panel {...baseProps} />);
    expect(wrapper.find('.panel__highlightMode').length).toEqual(2);
  });

  it('should test onHighlight when user drags on a text', () => {
    global.getSelection = jest.fn(() => ({
      toString: () => 'hola',
      getRangeAt: () => ({ startOffset: 1, endOffset: 4 }),
    }));

    const wrapper = shallow(<Panel {...baseProps} />);
    const p = wrapper.find('.panel__highlightMode--front');
    p.simulate('mouseUp', { stopPropagation: () => {} });
    const expected = { highlight: 'hola', colorToHighlight: 'green', from: 1, to: 3 };
    expect(onHighlightSpy).toHaveBeenCalledWith(expected);
  });

  it('should render on edition Mode', () => {
    const wrapper = shallow(<Panel {...baseProps} textToHighlight={''} />);
    expect(wrapper.find('.panel__textArea').length).toEqual(1);
    expect(wrapper.find('.panel__submit').length).toEqual(1);
  });

  it('should test onSelectTextToHighlight when user submit a text', () => {
    const wrapper = shallow(<Panel {...baseProps} textToHighlight={''} />);
    const submit = wrapper.find('.panel__submit');
    submit.simulate('click');
    expect(onSelectTextToHighlightSpy).toHaveBeenCalledWith('');
  });
});
