import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSearchParam } from 'react-use';

import useInput from '../../hooks/use-input';
import useDebounce from '../../hooks/use-debounce';

import { API_BASE, PAGE_SIZE } from '../../config';

import './search.css';

function Search({ history, location }) {
  const page = useSearchParam('page');
  const query = useSearchParam('query');

  const currentPage = parseInt(page) || 1;

  const [searchString, searchInput] = useInput(query || '', {
    id: 'search-field',
    placeholder: 'Enter a movie title to search',
    className: 'input'
  });
  const debouncedSearch = useDebounce(searchString, 500);
  const [searchResults, setSearchResults] = useState({
    results: [],
    page: 0,
    total_pages: 0,
    total_results: 0
  });
  const { total_results, total_pages } = searchResults;

  useEffect(() => {
    let params = new URLSearchParams(location.search);

    if (debouncedSearch) {
      params.set('query', debouncedSearch);
      params.delete('page');
    } else {
      params.delete('query');
    }

    if (params.get('query') !== query) {
      params.sort();
      history.push(`?${params.toString()}`);
    }
  }, [debouncedSearch]); // eslint-disable-line

  useEffect(() => {
    let params = new URLSearchParams(location.search);
    const requestUrl = !query
      ? `${API_BASE}/popular`
      : `${API_BASE}/search`;

    window.fetch(`${requestUrl}?${params.toString()}`)
      .then(async (response) => {
        setSearchResults(await response.json());
      });
  }, [location.search]); // eslint-disable-line

  function handlePrevPage() {
    if (currentPage - 1 <= 0) {
      return;
    }

    let params = new URLSearchParams(location.search);

    if (currentPage - 1 > 1) {
      params.set('page', currentPage - 1);
    } else {
      params.delete('page');
    }

    params.sort();
    history.push(`?${params.toString()}`);
    window.scrollTo(0, 0);
  }

  function handleNextPage() {
    if (currentPage + 1 > searchResults.total_pages) {
      return;
    }

    let params = new URLSearchParams(location.search);

    if (currentPage + 1 > 1) {
      params.set('page', currentPage + 1);
    } else {
      params.delete('page');
    }

    params.sort();
    history.push(`?${params.toString()}`);
    window.scrollTo(0, 0);
  }

  return (
    <div className="movie-search">
      <div className="box">
        <label htmlFor="search-field" className="label">Search by movie title</label>
        <div className="field">
          <div className="control is-expanded">
            { searchInput }
          </div>
        </div>
      </div>
      <h2 className="title is-2">{searchString === '' ? 'Top Movies' : 'Search Results'}</h2>
      <p>Showing {PAGE_SIZE * (currentPage - 1) + 1}-{total_results < PAGE_SIZE ? total_results : PAGE_SIZE * (currentPage)} of {total_results} results (Page {currentPage} of {total_pages}) for query "{searchString}"</p>
      <dl className="movie-search--results">
        {searchResults.errors
          ? 'No Results'
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
          <div className="buttons">
            <button
              className="button is-primary"
              onClick={handlePrevPage}
            >Prev</button>
            <button
              className="button is-primary"
              onClick={handleNextPage}
            >Next</button>
          </div>
        )
      }
    </div>
  );
}

export default Search;
