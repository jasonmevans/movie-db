import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import appConfig from './config'

import Search from './views/search/index';
import Details from './views/details/index';

import './App.css';

function App() {
  const [config, setConfig] = useState(undefined);

  useEffect(() => {
    window.fetch(`${appConfig.API_BASE}/configuration`)
    .then(async (response) => setConfig(await response.json()));
  }, [])

  return (
    <Router>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="container">
          <h1 className="title is-2 has-text-weight-light">The Movie Database</h1>
        </div>
      </nav>
      <div className="container is-fluid">
        <div className="container">
          <Switch>
            <Route exact path="/" component={Search} />
            <Route path="/movies/:movieId" component={Details} />
            <Route
              path="/movie/:movieId"
              render={(props) => <Details {...props} config={config} />}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
