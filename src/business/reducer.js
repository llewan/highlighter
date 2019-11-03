import { ADD, CLEAR, UNDO } from './actionTypes';

const initialState = { highlights: [] };

function reducer(state, action) {
  switch (action.type) {
    case ADD:
      return { ...state, highlights: [...state.highlights, action.payload] };
    case UNDO:
      return { ...state, highlights: [...state.highlights.slice(0, state.highlights.length - 1)] };
    case CLEAR:
      return { ...state, highlights: [] };
    default:
      return initialState;
  }
}

export {
  reducer,
  initialState,
};
