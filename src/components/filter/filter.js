import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import Highlight from '../highlight/highlight';
import ColorPicker from '../colorPicker/colorPicker';

const Filter = (props) => {
  const { highlights, filterByColor } = props;
  const filteredHighlights = highlights
    .filter(hl => hl.colorToHighlight === filterByColor)
    .sort((x, y) => ((x.from > y.from) ? 1 : -1));

  return (
    <section className="filter">
      <ColorPicker
        onSetColor={props.onSetFilterColor}
      />
      <ul className="filter__words">
        {filteredHighlights.map(line => (
          <li key={shortid.generate()} className="filter__words__row">
            <Highlight color={line.colorToHighlight} text={line.highlight} />
          </li>))}
      </ul>
    </section>
  );
};

Filter.propTypes = {
  highlights: PropTypes.array.isRequired,
  filterByColor: PropTypes.string.isRequired,
  onSetFilterColor: PropTypes.func.isRequired,
};

export default Filter;
