import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SideBar from './components/SideBar';
import Store from './global/Store';
import './App.css';

const App = () => {
  return (
    <Store>
      <Router>
        <Switch>
          <Route path="/" component={SideBar} />
        </Switch>
      </Router>
    </Store>
  );
};

export default App;
