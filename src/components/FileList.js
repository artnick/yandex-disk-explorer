import React from 'react';
import File from './File';
import Folder from './Folder';

const FileList = ({ list=[] }) => (
  <div className=''>
    {list.map((item, index) => 
      item.type == 'dir' ?
        <Folder key={index} item={item}/> :
        <File key={index} item={item}/>
    )}
  </div>
);

FileList.propTypes = {
  list: React.PropTypes.array,
};

export default FileList;