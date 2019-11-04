import { ADD, CLEAR, UNDO, RESET, ADD_TEXT_TO_HIGHLIGHT, ADD_COLOR_TO_FILTER } from './actionTypes';

const initialState = { highlights: [], textToHighlight: '', colorToFilter: '' };

function reducer(state, action) {
  switch (action.type) {
    case ADD: {
      const { highlight, colorToHighlight } = action.payload;
      if (!highlight.length || !colorToHighlight) return state;
      return { ...state, highlights: [...state.highlights, action.payload] };
    }
    case UNDO:
      return { ...state, highlights: [...state.highlights.slice(0, state.highlights.length - 1)] };
    case CLEAR:
      return { ...state, highlights: [] };
    case RESET:
      return initialState;
    case ADD_TEXT_TO_HIGHLIGHT:
      return { ...state, textToHighlight: action.payload };
    case ADD_COLOR_TO_FILTER:
      return { ...state, colorToFilter: action.payload };
    default:
      return initialState;
  }
}

export {
  reducer,
  initialState,
};
