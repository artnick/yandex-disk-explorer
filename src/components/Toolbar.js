import React from 'react';
import { Link } from 'react-router-dom';

const pathToParent = (path) => {
  return path.replace(RegExp('/[^/]+/*$'), '').slice(5);
};

const Toolbar = ({ path }) => (
  <div className='toolbar'>
    <Link to={pathToParent(path)}>Back</Link>
  </div>
);

Toolbar.propTypes = {
  path: React.PropTypes.string,
};

export default Toolbar;