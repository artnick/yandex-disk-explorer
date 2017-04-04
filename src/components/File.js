import React from 'react';

const File = ({ item }) => (
  <div className='file'>
    <span>{item.name}</span>
    <span>{item.size}</span>
  </div>
);

File.propTypes = {
  item: React.PropTypes.object,
};

export default File;