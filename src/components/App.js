import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ExplorerPage from '../containers/ExplorerPage';

const App = () => (
  <Router>
    <div className='app container'>
      <Route component={ExplorerPage}/>
    </div>
  </Router>
);

export default App;
