import React from 'react';

const Spinner = ({ size = 'small', visible }) => (
  <div className={`spinner spinner_${size} ${visible ? '' : 'hidden'}`}></div>
);

Spinner.propTypes = {
  size: React.PropTypes.string,
  visible: React.PropTypes.bool,
};

export default Spinner;