import React from 'react';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';

const pathToParent = (path) => {
  return path.replace(RegExp('/[^/]+/*$'), '').slice(5);
};

const Toolbar = ({ path, isLoading }) => (
  <div className='panel-heading'>
    <Link className="levelup-btn btn btn-default" to={pathToParent(path)}>
      <i className="fa fa-level-up" aria-hidden="true"></i>
    </Link>
    <Spinner visible={isLoading}/>
  </div>
);

Toolbar.propTypes = {
  path: React.PropTypes.string,
  isLoading: React.PropTypes.string,
};

export default Toolbar;