const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3001;

const { THEMOVIEDB_V4: apiKey } = require('./keys.json');

const headers = {
  'Authorization': `Bearer ${apiKey}`,
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
  const { query } = req.query;

  fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}`, { headers })
    .then(async (response) => res.json(await response.json()));
});

app.get('/api/images', (req, res) => {
  const { imagePath } = req.query;

  fetch(imagePath).then(response => {
    res.writeHead(response.status, response.headers);
    response.body.pipe(res).on('end', () => res.end());
  });
});

app.listen(port, () => console.log(`Listening on ${port}`));
