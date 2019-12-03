import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import debounce from '../../utils/debounce';

import appConfig from '../../config';

function Search(props = {}) {
  const [searchString, setSearchString] = useState("");
  const [searchResults, setSearchResults] = useState({
    results: []
  });

  const updateSearch = debounce(value => setSearchString(value), 500);

  useEffect(() => {
    window.fetch(`${appConfig.API_BASE}/search?query=${searchString}`)
      .then(async (response) => setSearchResults(await response.json()));
  }, [searchString]);

  return (
    <div>
      <h2>Search</h2>
      <input
        type="text"
        value="Mad Max"
        placeholder="Search by movie title..."
        onChange={event => updateSearch(event.target.value)}
      />
      <dl>
        {searchResults.errors
          ? "No results"
          : searchResults.results.map(result => (
            <div key={result.id}>
              <dt>
                <Link to={`/movie/${result.id}`}>{result.title}</Link>
              </dt>
              <dd>{result.overview}</dd>
            </div>
          ))}
      </dl>
    </div>
  );
}

export default Search;
