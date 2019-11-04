import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';

const Panel = (props) => {
  const [value, setValue] = useState('');

  const highlightText = (ev) => {
    ev.stopPropagation();

    const { colorToHighlight, onHighlight } = props;
    const highlight = window.getSelection().toString();
    const from = window.getSelection().getRangeAt(0).startOffset;
    const to = window.getSelection().getRangeAt(0).endOffset - 1;

    onHighlight({ highlight, colorToHighlight, from, to });
  };

  const handleChange = (ev) => {
    setValue(ev.target.value);
  };

  const handleSubmit = () => {
    props.onSelectTextToHighlight(value);
  };

  const renderEditionMode = () => (
    <Fragment>
      <textarea className="panel__textArea" placeholder={'Enter a text to highlight'} value={value} onChange={handleChange} />
      <button className="panel__submit" onClick={handleSubmit}>Submit</button>
    </Fragment>
  );

  const renderHighlightMode = () => (
    <Fragment>
      <p className="panel__highlightMode panel__highlightMode--front" onMouseUp={highlightText}>{props.textToHighlight}
      </p>
      <p className="panel__highlightMode panel__highlightMode--back">{props.text}
      </p>
    </Fragment>
  );

  return (
    <section className="panel">
      { props.textToHighlight ? renderHighlightMode() : renderEditionMode() }
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
