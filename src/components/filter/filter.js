import React from 'react';
import PropTypes from 'prop-types';
import ColorPicker from '../colorPicker/colorPicker';

const Filter = (props) => {
  const { highlights, filterByColor } = props;
  const chunks = highlights.filter(hl => hl.colorToHighlight === filterByColor);
  return (
    <section className="filter">
      <ColorPicker
        onSetColor={props.onSetFilterColor}
      />
      <div className="filter__words">
        {chunks.map(chunk => (<span
          style={{ background: chunk.colorToHighlight }}
        >{chunk.highlight}</span>))}
      </div>
    </section>
  );
};

Filter.propTypes = {
  highlights: PropTypes.array.isRequired,
  filterByColor: PropTypes.string.isRequired,
  onSetFilterColor: PropTypes.func.isRequired,
};

export default Filter;
