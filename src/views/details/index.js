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
    <div className="movie-details">
      {(movieDetails.poster_path && base_url && <img
        src={`${API_BASE}/images?imagePath=${imagePath}${movieDetails.poster_path}`}
        className="movie-details--poster"
        alt={`Movie poster for ${movieDetails.title}`}
      />)}
      <div className="movie-details--content">
        <h1 className="title is-1">{movieDetails.title}</h1>
        <p className="subtitle is-4 movie-details--tagline">{movieDetails.tagline}</p>

        <div className="">
          <p>{movieDetails.overview}</p>
          <h3>Genres</h3>
          <ul className="tags movie-details--content-genres">
            {
              movieDetails.genres.map(genre =>
                <li key={genre.id} className="tag">{genre.name}</li>
              )
            }
          </ul>
        </div>
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
          ['revenue', 'Revenue', formatMoney],
          ['spoken_languages', 'Languages', (languages) =>
            languages.map(lang => lang.name).join(', ')]
        ]}
      />
    </div>
  );
}

function formatMoney(v) {
  return `$${v.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
}

export default Details;
