import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ColorPicker from '../colorPicker/colorPicker';
import Filter from '../filter/filter';

class Highlighter extends Component {
  constructor(props) {
    super(props);
    this.highlightText = this.highlightText.bind(this);
    this.setColorToHighlight = this.setColorToHighlight.bind(this);
    this.setText = this.setText.bind(this);
    this.setColorToFilter = this.setColorToFilter.bind(this);
    this.formatText = this.formatText.bind(this);

    this.undo = this.undo.bind(this);
    this.clear = this.clear.bind(this);
    this.highlights = [];

    this.state = {
      text: props.textToHighlight,
      colorToHighlight: '',
      colorToFilter: '',
    };
  }
  highlightText(ev) {
    ev.stopPropagation();

    const { colorToHighlight } = this.state;
    const textToHighlight = this.props.textToHighlight;
    const highlight = window && window.getSelection().toString();
    const from = textToHighlight.indexOf(highlight);
    const to = from + (highlight.length - 1);
    if (!highlight.length || !colorToHighlight) return;

    this.highlights.push({ highlight, colorToHighlight, from, to });
    const textFormatted = this.formatText(this.highlights);
    this.setText(textFormatted);
  }
  setText(aText) {
    this.setState({
      text: aText,
    });
  }
  setColorToHighlight(aColor) {
    this.setState({
      colorToHighlight: aColor,
    });
  }
  setColorToFilter(aColor) {
    this.setState({
      colorToFilter: aColor,
    });
  }
  formatText(highlights = []) {
    const applyHighlight = (char, index) => {
      const phrase = highlights.find(highlight => (index >= highlight.from && index <= highlight.to));
      return phrase ? <span style={{ background: phrase.colorToHighlight }}>{char}</span> : char;
    };
    return this.props.textToHighlight.split('').map(applyHighlight);
  }
  undo() {
    this.highlights.pop();
    const textFormatted = this.formatText(this.highlights);
    this.setText(textFormatted);
  }
  clear() {
    this.highlights = [];
    const textFormatted = this.formatText();
    this.setText(textFormatted);
  }
  render() {
    return (
      <section className="highlighter">
        <ColorPicker onSetColor={this.setColorToHighlight} />
        <button onClick={this.undo}>Undo</button>
        <button onClick={this.clear}>Clear</button>
        <p onMouseUp={this.highlightText}>{this.state.text}</p>
        <Filter
          highlights={this.highlights}
          filterByColor={this.state.colorToFilter}
          onSetFilterColor={this.setColorToFilter}
        />
      </section>
    );
  }
}


Highlighter.propTypes = {
  highlights: PropTypes.array.isRequired,
};

export default Highlighter;
