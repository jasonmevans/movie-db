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

  const [movieDetails, setMovieDetails] = useState({});

  useEffect(() => {
    window.fetch(`${API_BASE}/movie/${movieId}`)
      .then(async (response) => setMovieDetails(await response.json()));
  }, [movieId]);

  const imageSize = poster_sizes.includes('w500') ? 'w500' : 'original';
  const imagePath = `${base_url}${imageSize}`;

  return (
    <div className="movie-details">
      {(movieDetails.poster_path && base_url && <img
        src={`${API_BASE}/images?imagePath=${imagePath}${movieDetails.poster_path}`}
        className="movie-details--poster"
        alt={`Movie poster for ${movieDetails.title}`}
      />)}
      <div className="movie-details--content">
        <h1>{movieDetails.title}</h1>
        <h2>{movieDetails.tagline}</h2>
        <p>{movieDetails.overview}</p>
      </div>
      <Properties
        data={movieDetails}
        fields={[
          ['homepage', 'Web site'],
          ['status', 'Status'],
          ['release_date', 'Release date', (date) => moment(date, 'YYYY-MM-DD').format('LL')],
          ['runtime', 'Run time', (runtime) => `${runtime} minutes`],
          ['popularity', 'Popularity'],
          ['budget', 'Budget', formatMoney],
          ['revenue', 'Revenue', formatMoney]
        ]}
      />
    </div>
  );
}

function formatMoney(v) {
  return `$${v.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
}

export default Details;
