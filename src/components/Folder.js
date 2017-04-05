import React from 'react';
import { Link } from 'react-router-dom';

const Folder = ({ item }) => (
  <li className='folder list-group-item'>
    <Link to={`${item.path.slice(5)}`}>
      <i className="fa fa-folder-o" aria-hidden="true"></i>
      {item.name}
    </Link>
  </li>
);

Folder.propTypes = {
  item: React.PropTypes.object,
};

export default Folder;