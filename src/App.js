import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
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
      <nav>
        <h1>The Movie Database</h1>
      </nav>
      <div className="movie-database--main">
        <Switch>
          <Route exact path="/" component={Search} />
          <Route path="/movies/:movieId" component={Details} />
          <Route
            path="/movie/:movieId"
            render={(props) => <Details {...props} config={config} />}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
