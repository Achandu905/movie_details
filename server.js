const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;
const apiKey = 'b8f8ec5a';

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Set EJS as templating engine
app.set('view engine', 'ejs');

// GET route to render the form
app.get('/', (req, res) => {
  res.render('index', { movie: null, error: null });
});

// POST route to fetch movie details
app.post('/', async (req, res) => {
  const movieName = req.body.movieName;
  const url = `http://www.omdbapi.com/?t=${movieName}&apikey=${apiKey}`;

  try {
    const response = await axios.get(url);
    const movie = response.data;

    if (movie.Response === 'False') {
      res.render('index', { movie: null, error: 'Movie not found!' });
    } else {
      res.render('index', { movie, error: null });
    }
  } catch (error) {
    res.render('index', { movie: null, error: 'Error fetching movie details!' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
