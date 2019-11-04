import React from 'react';
import PropTypes from 'prop-types';

const Highlight = props => (
  <span style={{ background: props.color }}>{props.text}</span>
);

Highlight.propTypes = {
  color: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Highlight;
