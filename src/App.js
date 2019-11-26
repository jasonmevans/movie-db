import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';

function App() {
  return (
    <Router>
      <h1>The Movie Database</h1>
      <div>
        <Switch>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
