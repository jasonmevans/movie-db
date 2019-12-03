import React, { useState, useEffect } from 'react';
import Properties from './properties';

import appConfig from '../../config'

import './details.css';

function Details(props = {}) {
  const {
    match: {
      params: { movieId = '' }
    }
  } = props;

  const [movieDetails, setMovieDetails] = useState({});

  useEffect(() => {
    window.fetch(`${appConfig.API_BASE}/movie/${movieId}`)
      .then(async (response) => setMovieDetails(await response.json()));
  }, [movieId]);

  return (
    <div className="movie-details">
      <img
        src={movieDetails.poster_path}
        className="movie-details--poster"
        alt={`Movie poster for ${movieDetails.title}`}
      />
      <div className="movie-details--content">
        <h1>{movieDetails.title}</h1>
        <h2>{movieDetails.tagline}</h2>
        <p>{movieDetails.overview}</p>
      </div>
      <Properties
        data={movieDetails}
        fields={[
          ['release_date', 'Release date'],
          ['homepage', 'Web site'],
          ['budget', 'Budget'],
          ['popularity', 'Popularity'],
          ['status', 'Status'],
          ['runtime', 'Run time'],
          ['revenue', 'Revenue']
        ]}
      />
    </div>
  );
}

export default Details;
