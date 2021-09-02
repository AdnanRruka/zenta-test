import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MainView from './components/MainView';
import Store from './global/Store';

const App = () => {
  return (
    <Store>
      <Router>
        <Switch>
          <Route path="/" component={MainView} />
        </Switch>
      </Router>
    </Store>
  );
};

export default App;
