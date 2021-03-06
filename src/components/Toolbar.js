import React from 'react';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';

const pathToParent = (path) => {
  return path.replace(RegExp('/[^/]+/*$'), '').slice(5);
};

const Toolbar = ({ path, isLoading }) => (
  <div className='panel-heading'>
    <Link className="levelup-btn btn btn-default" to={pathToParent(path)}>
      <span className="glyphicon glyphicon-arrow-up"></span>
    </Link>
    <Spinner visible={isLoading}/>
  </div>
);

Toolbar.propTypes = {
  path: React.PropTypes.string,
  isLoading: React.PropTypes.bool,
};

export default Toolbar;