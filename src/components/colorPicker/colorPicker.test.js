import React from 'react';
import { shallow } from 'enzyme';
import ColorPicker from './colorPicker';

describe('<ColorPicker />', () => {
  it('should render three buttons', () => {
    const wrapper = shallow(<ColorPicker onSetColor={() => {}} />);
    expect(wrapper.find('.colorPicker__btn').length).toEqual(3);
  });

  it('should call onSetColor callback', () => {
    const onSetColorSpy = jest.fn();
    const wrapper = shallow(<ColorPicker onSetColor={onSetColorSpy} />);
    const btn = wrapper.find('.colorPicker__btn--green');
    btn.simulate('click');
    expect(onSetColorSpy).toBeCalledWith('green');
  });
});
