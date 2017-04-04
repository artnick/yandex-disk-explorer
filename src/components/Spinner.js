import React from 'react';

const Spinner = ({ size = 'small' }) => (
  <div className={`spinner spinner_${size}`}></div>
);

Spinner.propTypes = {
  size: React.PropTypes.string,
};

export default Spinner;