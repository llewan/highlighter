import React from 'react';
import PropTypes from 'prop-types';

const ColorPicker = props => (
  <div className="colorPicker">
    <button className="colorPicker__btn colorPicker__btn--red" onClick={() => props.onSetColor('red')} />
    <button className="colorPicker__btn colorPicker__btn--yellow" onClick={() => props.onSetColor('yellow')} />
    <button className="colorPicker__btn colorPicker__btn--green" onClick={() => props.onSetColor('green')} />
  </div>
);

ColorPicker.propTypes = {
  onSetColor: PropTypes.func.isRequired,
};

export default ColorPicker;
