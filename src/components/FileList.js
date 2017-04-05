import React from 'react';
import File from './File';
import Folder from './Folder';

const FileList = ({ list=[] }) => (
  <ul className='file-list list-group'>
    {list.map((item, index) => 
      item.type == 'dir' ?
        <Folder key={index} item={item}/> :
        <File key={index} item={item}/>
    )}
  </ul>
);

FileList.propTypes = {
  list: React.PropTypes.array,
};

export default FileList;