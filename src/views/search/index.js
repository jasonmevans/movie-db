import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import useDebounce from '../../hooks/use-debounce';
import buildQueryParams from '../../utils/build-query-params';

import { API_BASE, PAGE_SIZE } from '../../config';

import './search.css';

function Search(props = {}) {
  const [searchString, setSearchString] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearch = useDebounce(searchString, 500);
  const [searchResults, setSearchResults] = useState({
    results: [],
    page: 1,
    total_pages: 1,
    total_results: 0
  });


  useEffect(() => {
    let requestUrl = '';
    let params = {};

    if (debouncedSearch === '') {
      requestUrl = `${API_BASE}/popular`;
    } else {
      requestUrl = `${API_BASE}/search`;
      Object.assign(params, { query: debouncedSearch });
    }

    if (currentPage > 1) {
      Object.assign(params, { page: currentPage });
    }

    window.fetch(`${requestUrl}?${buildQueryParams(params)}`)
      .then(async (response) => setSearchResults(await response.json()));
  }, [currentPage, debouncedSearch]);

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
              value={searchString}
              onChange={({ target: { value = '' } }) => {
                setCurrentPage(1);
                updateSearch(value);
              }}
            />
          </div>
        </div>
      </div>
      <h2 className="title is-2">{searchString === '' ? "Popular Movies" : "Search Results"}</h2>
      <p>Found {searchResults.total_results} results. (Page {currentPage} of {searchResults.total_pages})</p>
      <dl className="movie-search--results">
        {searchResults.errors
          ? "No Results"
          : searchResults.results.map((result, i) => (
            <div key={result.id} data-index={`${(PAGE_SIZE * (currentPage - 1)) + (i + 1)}.`}>
              <dt>
                <Link to={`/movie/${result.id}`}>{result.title}</Link>
              </dt>
              <dd>{result.overview}</dd>
            </div>
          ))}
      </dl>
      {
        (searchResults.total_results > PAGE_SIZE &&
          <div class="buttons">
            <button
              class="button is-primary"
              onClick={() => {
                const prevPage = currentPage - 1 > 0
                  ? currentPage - 1
                  : currentPage;
                setCurrentPage(prevPage);
                window.scrollTo(0, 0);
              }}
            >Prev</button>
            <button
              class="button is-primary"
              onClick={() => {
                const nextPage = currentPage + 1 <= searchResults.total_pages
                  ? currentPage + 1
                  : currentPage;
                setCurrentPage(nextPage);
                window.scrollTo(0, 0);
              }}
            >Next</button>
          </div>
        )
      }
    </div>
  );
}

export default Search;
