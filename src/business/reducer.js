import { ADD, CLEAR, UNDO, RESET, ADD_TEXT_TO_HIGHLIGHT } from './actionTypes';

const initialState = { highlights: [], textToHighlight: '' };

function reducer(state, action) {
  switch (action.type) {
    case ADD:
      return { ...state, highlights: [...state.highlights, action.payload] };
    case UNDO:
      return { ...state, highlights: [...state.highlights.slice(0, state.highlights.length - 1)] };
    case CLEAR:
      return { ...state, highlights: [] };
    case RESET:
      return initialState;
    case ADD_TEXT_TO_HIGHLIGHT:
      return { ...state, textToHighlight: action.payload };
    default:
      return initialState;
  }
}

export {
  reducer,
  initialState,
};
