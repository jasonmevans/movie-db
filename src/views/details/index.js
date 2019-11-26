import React, { useState, useEffect } from 'react';
import Properties from './properties';

function Details(props = {}) {
  const { movieId } = props.match.params;

  const [movieDetails, setMovieDetails] = useState({});

  useEffect(() => {
    window.fetch(`http://localhost:3001/api/movie/${movieId}`)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        setMovieDetails(json)
      });
  }, [movieId]);

  return (
    <div>
      <img src={movieDetails.poster_path} alt={`Movie poster for ${movieDetails.title}`} />
      <h1>{movieDetails.title}</h1>
      <h2>{movieDetails.tagline}</h2>
      <p>{movieDetails.overview}</p>
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
