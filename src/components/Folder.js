import React from 'react';
import { Link } from 'react-router-dom';

const Folder = ({ item }) => (
  <Link className='folder list-group-item' to={`${item.path.slice(5)}`}>
    <i className="fa fa-folder-o" aria-hidden="true"></i>
    {item.name}
  </Link>
);

Folder.propTypes = {
  item: React.PropTypes.object,
};

export default Folder;