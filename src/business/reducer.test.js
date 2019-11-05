import { reducer, initialState } from './reducer';
import { ADD, UNDO, CLEAR, ADD_TEXT_TO_HIGHLIGHT, ADD_COLOR_TO_FILTER, RESET } from './actionTypes';

test('should ADD a highlight to state', () => {
  const highlight = { from: 1, to: 2, highlight: 'h', colorToHighlight: 'green' };
  const actual = reducer(initialState, { type: ADD, payload: highlight });
  expect(actual.highlights).toStrictEqual([highlight]);
});

test('should not ADD a highlight to state when highlight is empty', () => {
  const highlight = { from: 1, to: 2, highlight: '', colorToHighlight: 'green' };
  const actual = reducer(initialState, { type: ADD, payload: highlight });
  expect(actual.highlights).toStrictEqual([]);
});

test('should UNDO last highlight', () => {
  const highlight = { from: 1, to: 2, highlight: 'h', colorToHighlight: 'green' };
  const state = reducer(initialState, { type: ADD, payload: highlight });
  const actual = reducer(state, { type: UNDO });
  expect(actual.highlights).toStrictEqual([]);
});

test('should CLEAR all highlights', () => {
  const highlight = { from: 1, to: 2, highlight: 'h', colorToHighlight: 'green' };
  const state = reducer(initialState, { type: ADD, payload: highlight });
  const actual = reducer(state, { type: CLEAR });
  expect(actual.highlights).toStrictEqual([]);
});

test('should ADD_TEXT_TO_HIGHLIGHT', () => {
  const aText = 'hola';
  const actual = reducer(initialState, { type: ADD_TEXT_TO_HIGHLIGHT, payload: aText });
  expect(actual.textToHighlight).toStrictEqual(aText);
});

test('should ADD_COLOR_TO_FILTER', () => {
  const aText = 'green';
  const actual = reducer(initialState, { type: ADD_COLOR_TO_FILTER, payload: aText });
  expect(actual.colorToFilter).toStrictEqual(aText);
});

test('should RESET state', () => {
  const aText = 'green';
  const newState = reducer(initialState, { type: ADD_COLOR_TO_FILTER, payload: aText });
  const actual = reducer(newState, { type: RESET });
  expect(actual).toStrictEqual(initialState);
});



