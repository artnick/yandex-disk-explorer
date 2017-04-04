import React from 'react';

const formatBytes = (bytes, decimals) => {
  if(bytes == 0) return '0 Bytes';
  const k = 1024,
    dm = decimals + 1 || 1,
    sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const File = ({ item }) => (
  <div className='file'>
    <i className="fa fa-file-o" aria-hidden="true"></i>
    <span>{item.name}</span>
    <span className='file__size'>{formatBytes(item.size)}</span>
  </div>
);

File.propTypes = {
  item: React.PropTypes.object,
};

export default File;