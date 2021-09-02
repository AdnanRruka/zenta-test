import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// import TransactionList from './components/TransactionList';
import SideBar from './components/SideBar';
import Store from './global/Store';
import './App.css';
// import TransactionList from './components/TransactionList';

const App = () => {
  return (
    <Store>
      <Router>
        <div className="container mt-3">
          <Switch>
            <Route path="/" component={SideBar} />
            {/* <Route exact path="/" component={TransactionList} /> */}
          </Switch>
        </div>
      </Router>
    </Store>
  );
};

export default App;
