import React, { useState, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import ColorPicker from '../colorPicker/colorPicker';
import Filter from '../filter/filter';
import { reducer, initialState } from '../../business/reducer';
import { ADD, CLEAR, UNDO } from '../../business/actionTypes';

const Highlighter = (props) => {
  const [colorToHighlight, setColorToHighlight] = useState('');
  const [colorToFilter, setColorToFilter] = useState('');
  const [state, dispatch] = useReducer(reducer, initialState);
  const [text, setText] = useState(props.textToHighlight);

  useEffect(() => {
    const applyHighlight = (char, index) => {
      const phrase = state.highlights.find(highlight => (index >= highlight.from && index <= highlight.to));
      return phrase ? <span style={{ background: phrase.colorToHighlight }}>{char}</span> : char;
    };
    const formattedText = props.textToHighlight.split('').map(applyHighlight);
    setText(formattedText);
  }, [state.highlights]);

  const highlightText = (ev) => {
    ev.stopPropagation();

    const highlight = window && window.getSelection().toString();
    const from = props.textToHighlight.indexOf(highlight);
    const to = from + (highlight.length - 1);
    if (!highlight.length || !colorToHighlight) return;
    dispatch({ type: ADD, payload: { highlight, colorToHighlight, from, to } });
  };

  const undo = () => {
    dispatch({ type: UNDO });
  };

  const clear = () => {
    dispatch({ type: CLEAR });
  };

  return (
    <section className="highlighter">
      <ColorPicker onSetColor={setColorToHighlight} />
      <button onClick={undo}>Undo</button>
      <button onClick={clear}>Clear</button>
      <p onMouseUp={highlightText}>{text}</p>
      <Filter
        highlights={state.highlights}
        filterByColor={colorToFilter}
        onSetFilterColor={setColorToFilter}
      />
    </section>
  );
};

Highlighter.propTypes = {
  textToHighlight: PropTypes.string.isRequired,
};

export default Highlighter;
