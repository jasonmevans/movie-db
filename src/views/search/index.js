import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import debounce from '../../utils/debounce';

import { API_BASE } from '../../config';

import './search.css';

function Search(props = {}) {
  const [searchString, setSearchString] = useState("");
  const [searchResults, setSearchResults] = useState({
    results: []
  });

  const updateSearch = debounce(value => setSearchString(value), 500);

  useEffect(() => {
    if (searchString !== '') {
      window.fetch(`${API_BASE}/search?query=${searchString}`)
        .then(async (response) => setSearchResults(await response.json()));
    }
  }, [searchString]);
  useEffect(() => {
    if (searchString === '') {
      window.fetch(`${API_BASE}/popular`)
        .then(async (response) => setSearchResults(await response.json()));
    }
  }, [searchString]);

  return (
    <div className="movie-search">
      <div className="box">
        <label htmlFor="search-field" className="label">Search by movie title</label>
        <div className="field has-addons">
          <div className="control is-expanded">
            <input
              id="search-field"
              type="text"
              placeholder="Enter a movie title to search"
              className="input"
              onChange={event => updateSearch(event.target.value)}
            />
          </div>
        </div>
      </div>
      <h2 className="title is-2">{searchString === '' ? "Popular Movies" : "Search Results"}</h2>
      <dl className="movie-search--results">
        {searchResults.errors
          ? "No Results"
          : searchResults.results.map((result, i) => (
            <div key={result.id} data-index={`${i + 1}.`}>
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
