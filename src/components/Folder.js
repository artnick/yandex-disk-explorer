import React from 'react';
import { Link } from 'react-router-dom';

const Folder = ({ item }) => (
  <div className='folder'>
    <Link to={`${item.path.slice(5)}`}>
        {item.name}
    </Link>
  </div>
);

Folder.propTypes = {
  item: React.PropTypes.object,
};

export default Folder;