import React from 'react';
import ReactDOM from 'react-dom';
import Highlighter from './components/highlighter/highlighter';
import './components/highlighter/highlighter.scss';

const text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.123";

ReactDOM.render(<Highlighter textToHighlight={text} />, document.getElementById('root'));
