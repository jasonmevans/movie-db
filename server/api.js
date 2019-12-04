const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3001;

const { THEMOVIEDB_V4: API_KEY } = require('./keys.json');

const headers = {
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json;charset=utf-8'
};

app.use((req, res, next) => {
  console.log("Incoming request for", req.url);
  res.set('Access-Control-Allow-Origin', '*');
  next();
})

app.get('/api/configuration', (req, res) => {
  fetch(`https://api.themoviedb.org/3/configuration`, { headers })
    .then(async (response) => res.json(await response.json()));
});

app.get('/api/movie/:movieId', (req, res) => {
  const { movieId } = req.params;

  fetch(`https://api.themoviedb.org/3/movie/${movieId}`, { headers })
    .then(async (response) => res.json(await response.json()));
});

app.get('/api/movie/poster/:movieId', (req, res) => {
  const { movieId } = req.params;

  fetch(`https://api.themoviedb.org/3/movie/${movieId}`, { headers })
    .then(async (response) => res.json(await response.json()));
});

app.get('/api/search', (req, res) => {
  let url = 'https://api.themoviedb.org/3/search/movie';

  if (Object.keys(req.query).length > 0) {
    url = `${url}?${buildQueryParams(req.query)}`
  }

  fetch(url, { headers })
    .then(async (response) => res.json(await response.json()));
});

app.get('/api/popular', (req, res) => {
  let url = 'https://api.themoviedb.org/3/movie/popular';

  if (Object.keys(req.query).length > 0) {
    url = `${url}?${buildQueryParams(req.query)}`
  }

  fetch(url, { headers })
    .then(async (response) => res.json(await response.json()));
});

app.get('/api/images', (req, res) => {
  const { imagePath } = req.query;

  fetch(imagePath).then(response => {
    res.writeHead(response.status, response.headers);
    response.body.pipe(res).on('end', () => res.end());
  });
});

function buildQueryParams(params) {
  return Object.entries(params).map(([key, val]) => {
    return `${key}=${encodeURIComponent(val)}`
  }).join('&');
}

app.listen(port, () => console.log(`Listening on ${port}`));
