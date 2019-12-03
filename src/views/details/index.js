import React, { useState, useEffect } from 'react';
import moment from 'moment';

import Properties from './properties';

import { API_BASE } from '../../config';

import './details.css';

function Details(props = {}) {
  const {
    config: {
      images: {
        base_url = '',
        poster_sizes = []
      }
    } = { images: {} },
    match: {
      params: { movieId = '' }
    }
  } = props;

  const [movieDetails, setMovieDetails] = useState({
    genres: []
  });

  useEffect(() => {
    window.fetch(`${API_BASE}/movie/${movieId}`)
      .then(async (response) => setMovieDetails(await response.json()));
  }, [movieId]);

  const imageSize = poster_sizes.includes('w500') ? 'w500' : 'original';
  const imagePath = `${base_url}${imageSize}`;

  return (
    <div className="columns">
      <div class="column is-4">
        {(movieDetails.poster_path && base_url && <img
          src={`${API_BASE}/images?imagePath=${imagePath}${movieDetails.poster_path}`}
          className="movie-details--poster"
          alt={`Movie poster for ${movieDetails.title}`}
        />)}
        <Properties
          data={movieDetails}
          fields={[
            ['status', 'Status'],
            ['release_date', 'Release date', (date) => moment(date, 'YYYY-MM-DD').format('LL')],
            ['runtime', 'Run time', (runtime) => `${runtime} minutes`],
            ['popularity', 'Popularity'],
            ['budget', 'Budget', formatMoney],
            ['revenue', 'Revenue', formatMoney],
            ['spoken_languages', 'Languages', (languages) =>
              languages.map(lang => lang.name).join(', ')]
          ]}
        />
      </div>
      <div className="column is-8">
        <h1 className="title is-1">{movieDetails.title}</h1>
        <p className="subtitle is-4">{movieDetails.tagline}</p>
        <p>
          <a
            href={movieDetails.homepage}
            target="_blank"
            rel="noopener noreferrer"
          >{movieDetails.homepage}</a>
        </p>
        <div className="box content">
          <h3 className="title is-5">Overview</h3>
          <p>{movieDetails.overview}</p>
          <ul className="tags movie-details--content-genres">
            {
              movieDetails.genres.map(genre =>
                <li key={genre.id} className="tag">{genre.name}</li>
              )
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

function formatMoney(v) {
  return `$${v.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
}

export default Details;
