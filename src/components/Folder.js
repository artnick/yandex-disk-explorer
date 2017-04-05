import React from 'react';
import { Link } from 'react-router-dom';

const Folder = ({ item }) => (
  <Link className='folder list-group-item' to={`${item.path.slice(5)}`}>
    <span className="glyphicon glyphicon-folder-close"></span>
    {item.name}
  </Link>
);

Folder.propTypes = {
  item: React.PropTypes.object,
};

export default Folder;