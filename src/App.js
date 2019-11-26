import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Search from './views/search/index';
import Details from './views/details/index';

import './App.css';

function App() {
  return (
    <Router>
      <h1>The Movie Database</h1>
      <div>
        <Switch>
          <Route exact path="/" component={Search} />
          <Route path="/movie/:movieId" component={Details} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
