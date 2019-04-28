import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import "antd/dist/antd.css";
import { LandingPage } from '../containers/LandingPage';
import { NotFound } from '../components/NotFound';

import * as ROUTES from '../constants/routes';

class App extends Component {
  

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path={ROUTES.LANDING} exact component={LandingPage}></Route>
            <Route component={NotFound}></Route>
          </Switch>
        </Router>
      </div>
    );
  }
  
}

export default App;
