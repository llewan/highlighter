import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';

const Panel = (props) => {
  const [value, setValue] = useState('');

  const highlightText = (ev) => {
    ev.stopPropagation();

    const { colorToHighlight, textToHighlight, onHighlight } = props;
    const highlight = window && window.getSelection().toString();
    const from = textToHighlight.indexOf(highlight);
    const to = from + (highlight.length - 1);
    const isValidHighlight = highlight.length && colorToHighlight;
    const obj = isValidHighlight ? { highlight, colorToHighlight, from, to } : null;

    onHighlight(obj);
  };

  const handleChange = (ev) => {
    setValue(ev.target.value);
  };

  const handleSubmit = () => {
    props.onSelectTextToHighlight(value);
  };

  const renderTextArea = () => (<Fragment>
    <textarea className="panel__textArea" placeholder={'Enter a text to highlight'} value={value} onChange={handleChange} />
    <button className="panel__submit" onClick={handleSubmit}>Submit</button>
  </Fragment>);

  return (
    <section className="panel">
      { props.textToHighlight ? <p className="panel__highlightMode"  onMouseUp={highlightText}>{props.text}</p> : renderTextArea() }
    </section>
  );
};

Panel.propTypes = {
  onHighlight: PropTypes.func.isRequired,
  onSelectTextToHighlight: PropTypes.func.isRequired,
  colorToHighlight: PropTypes.string.isRequired,
  text: PropTypes.array.isRequired,
  textToHighlight: PropTypes.string.isRequired,
};

export default Panel;
