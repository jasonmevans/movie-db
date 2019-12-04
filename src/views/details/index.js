import React, { useState, useEffect } from 'react';
import moment from 'moment';

import Properties from './properties';
import formatMoney from '../../utils/format-money';

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
    <div className="movie-details columns">
      <div className="column is-4">
        <figure className="image is-2by3">
          {(movieDetails.poster_path && base_url && <img
            src={`${API_BASE}/images?imagePath=${imagePath}${movieDetails.poster_path}`}
            alt={`Movie poster for ${movieDetails.title}`}
            />)}
        </figure>
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
        <p>
          <a
            href={movieDetails.homepage}
            target="_blank"
            rel="noopener noreferrer"
            title={`Home page for ${movieDetails.title}`}
          >{movieDetails.homepage}</a>
        </p>
        <h1 className="title is-1">{movieDetails.title}</h1>
        <p className="subtitle is-4">{movieDetails.tagline}</p>
        <div className="box content">
          <h3 className="title is-5">Synopsis</h3>
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

export default Details;
