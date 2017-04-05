import React from 'react';
import { connect } from 'react-redux';
//import Spinner from '../components/Spinner';
import { fetchList, setToken } from '../actions';
import FileList from '../components/FileList';
import Toolbar from '../components/Toolbar';
import Login from '../components/Login';
import { saveTokenToStorage, getTokenFromStorage } from '../localStorage';

class ExplorerPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if(!this.props.token) {
      if(this.props.location.hash) {
        const token = /access_token=([^&]+)/.exec(this.props.location.hash)[1];
        saveTokenToStorage(token);
        this.props.dispatch(setToken(token));
      } else {
        this.props.dispatch(setToken(getTokenFromStorage()));
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.location.pathname != nextProps.location.pathname || nextProps.token != this.props.token) {
      this.props.dispatch(fetchList('disk:'+ nextProps.location.pathname));
    }
  }

  render() {
    if(this.props.token)
      return (
        <div className='explorer panel panel-default'>
          <Toolbar path={this.props.currentPath} isLoading={this.props.isLoading}/>
          <FileList list={this.props.list}/>
        </div>
      );
    else
      return <Login />;
  }
}

ExplorerPage.propTypes = {
  match: React.PropTypes.object,
  location: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  isLoading: React.PropTypes.bool,
  list: React.PropTypes.array,
  token: React.PropTypes.string,
  currentPath: React.PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    list: state.list,
    currentPath: state.currentPath,
    token: state.token,
    isLoading: state.isLoading,
  };
};


export default connect(mapStateToProps)(ExplorerPage);
