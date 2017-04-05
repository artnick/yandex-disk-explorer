import React from 'react';
import FileList from '../components/FileList';
import Toolbar from '../components/Toolbar';

const Explorer = ({ list, currentPath, isLoading }) => (
  <div className='explorer panel panel-default'>
    <Toolbar path={currentPath} isLoading={isLoading}/>
    <FileList list={list}/>
  </div>
);

Explorer.propTypes = {
  list: React.PropTypes.array,
  currentPath: React.PropTypes.string,
  isLoading: React.PropTypes.bool,
};

export default Explorer;