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
  next();
})

app.get('/movie/:movieId', (req, res) => {
  const { movieId } = req.params;

  fetch(`https://api.themoviedb.org/3/movie/${movieId}`, { headers })
    .then(async response => res.json(await response.json()));
});

app.get('/search', (req, res) => {
  const { title } = req.query;

  fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(title)}`, { headers })
    .then(async response => res.json(await response.json()));
});

app.listen(port, () => console.log(`Listening on ${port}`));
