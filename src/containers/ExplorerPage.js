import React from 'react';
import { connect } from 'react-redux';
//import Spinner from '../components/Spinner';
import { fetchList } from '../actions';
import FileList from '../components/FileList';
import Toolbar from '../components/Toolbar';

class ExplorerPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(fetchList('disk:' + this.props.location.pathname));
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.location.pathname != nextProps.location.pathname) {
      this.props.dispatch(fetchList('disk:'+ nextProps.location.pathname));
    }
  }

  render() {
    return (
      <div className='explorer panel panel-default'>
        <Toolbar path={this.props.currentPath}/>
        <FileList list={this.props.list}/>
      </div>
    );
  }
}

ExplorerPage.propTypes = {
  match: React.PropTypes.object,
  location: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  isLoading: React.PropTypes.bool,
  list: React.PropTypes.array,
  currentPath: React.PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    list: state.list,
    currentPath: state.currentPath,
  };
};


export default connect(mapStateToProps)(ExplorerPage);
