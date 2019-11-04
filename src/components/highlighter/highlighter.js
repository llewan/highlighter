import React, { useState, useEffect, useReducer } from 'react';
import shortid from 'shortid';
import ColorPicker from '../colorPicker/colorPicker';
import Filter from '../filter/filter';
import Highlight from '../highlight/highlight';
import Panel from '../panel/panel';
import { reducer, initialState } from '../../business/reducer';
import { ADD, CLEAR, UNDO, RESET, ADD_TEXT_TO_HIGHLIGHT } from '../../business/actionTypes';

const Highlighter = () => {
  const [colorToHighlight, setColorToHighlight] = useState('');
  const [colorToFilter, setColorToFilter] = useState('');
  const [state, dispatch] = useReducer(reducer, initialState);
  const [text, setText] = useState([]);

  useEffect(() => {
    const applyHighlight = (char, index) => {
      const shouldBeHighlighted = state.highlights.find(highlight => (index >= highlight.from && index <= highlight.to));
      return shouldBeHighlighted ? <Highlight key={shortid.generate()} color={shouldBeHighlighted.colorToHighlight} text={char} /> : char;
    };
    const formattedText = state.textToHighlight.split('').map(applyHighlight);
    setText(formattedText);
  }, [state.highlights, state.textToHighlight]);

  const addHighlight = (aHighlight) => {
    if (!aHighlight) return;
    dispatch({ type: ADD, payload: aHighlight });
  };

  const undo = () => {
    dispatch({ type: UNDO });
  };

  const clear = () => {
    dispatch({ type: CLEAR });
  };

  const reset = () => {
    dispatch({ type: RESET });
  };

  const selectText = (aTextToHighlight) => {
    dispatch({ type: ADD_TEXT_TO_HIGHLIGHT, payload: aTextToHighlight });
  };

  return (
    <section className="highlighter">
      <ColorPicker onSetColor={setColorToHighlight} />

      <button className="highlighter__action" onClick={undo}>Undo</button>
      <button className="highlighter__action" onClick={clear}>Clear</button>
      <button className="highlighter__action" onClick={reset}>Reset</button>

      <Panel
        onHighlight={addHighlight}
        onSelectTextToHighlight={selectText}
        colorToHighlight={colorToHighlight}
        text={text}
        textToHighlight={state.textToHighlight}
      />

      <Filter
        highlights={state.highlights}
        filterByColor={colorToFilter}
        onSetFilterColor={setColorToFilter}
      />
    </section>
  );
};

export default Highlighter;
