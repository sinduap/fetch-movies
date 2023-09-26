/* 
🌟 APP: Make Netflix

Here we have the Netflix app but it's up to you to make it work by pulling all the movies using an API!

Create a fetchMovies() function that will make a dynamic API call to what you need 👇
========================================

- fetchMovies()

** fetchMovies takes in an URL, a div id or class from the HTML, and a path (poster or backdrop)



These are the 3 main functions and their URL'S you must create  👇
========================================

- getOriginals()
  * URL : 'https://api.themoviedb.org/3/discover/tv?api_key=19f84e11932abbc79e6d83f82d6d1045&with_networks=213'

- getTrendingNow()
  * URL : 'https://api.themoviedb.org/3/trending/movie/week?api_key=19f84e11932abbc79e6d83f82d6d1045'

- getTopRated()
  * URL : 'https://api.themoviedb.org/3/movie/top_rated?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US&page=1'


** These functions will provide the URL you need to fetch() movies of that genre **

These are all the DIV ID's you're gonna need access to 👇
========================================================
#1 CLASS 👉 'original__movies' = Div that holds Netflix Originals
#2 ID 👉 'trending' = Div that holds trending Movies
#3 ID 👉 'top_rated' = Div that holds top rated Movies
*/

const modal = document.querySelector('.modal');
const iframe = document.querySelector('#movieTrailer');
const movieNotFound = document.querySelector('.movieNotFound');

// Call the main functions the page is loaded
window.addEventListener('load', function () {
  getFeatured();
  getOriginals();
  getTrendingNow();
  getTopRated();
});

// ** Helper function that makes dynamic API calls **
async function fetchMovies(url, elSelector, pathType) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayMovies(data.results, elSelector, pathType);
  } catch (err) {
    console.log(err);
  }
  // Use Fetch with the url passed down
  // Within Fetch get the response and call showMovies() with the data , Element Selector, and path type
}

const IMG_URL = 'https://image.tmdb.org/t/p/w500';

async function displayFeaturedMovie() {
  try {
    const res = await fetch(
      'https://api.themoviedb.org/3/trending/all/day?api_key=19f84e11932abbc79e6d83f82d6d1045'
    );
    const data = await res.json();
    console.log(data);

    const movie = data.results.at(0);

    const featured = document.querySelector('.featured');
    const title = document.querySelector('.featured__title');
    const description = document.querySelector('.featured__description');

    featured.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`;
    title.textContent = movie.title;
    description.textContent = movie.overview;
  } catch (err) {
    console.log(err);
  }
}

//  ** Function that displays the movies to the DOM **
function displayMovies(movies, elSelector, pathType) {
  // Create a variable that grabs id or class
  const parentEl = document.querySelector(elSelector);

  movies.forEach(movie => {
    const img = document.createElement('img');
    img.src = `${IMG_URL}${movie[pathType]}`;
    img.alt = movie.name;
    img.addEventListener('click', function () {
      getMovieTrailer(movie.id);
    });
    parentEl.prepend(img);
  });
  // Loop through object
  // Within loop create an img element
  // Set attribute
  // Set source
  // Add event listener to handleMovieSelection() onClick
  // Append the imageElement to the elSelector selected
}

function getFeatured() {
  displayFeaturedMovie();
}

// ** Function that fetches Netflix Originals **
function getOriginals() {
  fetchMovies(
    'https://api.themoviedb.org/3/discover/tv?api_key=19f84e11932abbc79e6d83f82d6d1045&with_networks=213',
    '.original__movies',
    'poster_path'
  );
}
// ** Function that fetches Trending Movies **
function getTrendingNow() {
  fetchMovies(
    'https://api.themoviedb.org/3/trending/movie/week?api_key=19f84e11932abbc79e6d83f82d6d1045',
    '#trending',
    'backdrop_path'
  );
}
// ** Function that fetches Top Rated Movies **
function getTopRated() {
  fetchMovies(
    'https://api.themoviedb.org/3/movie/top_rated?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US&page=1',
    '#top_rated',
    'backdrop_path'
  );
}

// ** BONUS **

// ** Fetches URL provided and returns response.json()
async function getMovieTrailer(id) {
  //URL: `https://api.themoviedb.org/3/movie/${id}/videos?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US`
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US`
    );
    const data = await res.json();
    displayTrailer(data.results);
  } catch (err) {
    console.log(err);
  }
}

// ** Function that adds movie data to the DOM
function displayTrailer(trailers) {
  modal.classList.add('show');
  modal.style.display = 'block';

  // Set up iframe variable to hold id of the movieTrailer Element
  // Set up variable to select .movieNotFound element

  // If there is a trailer add the src for it
  if (trailers.length > 0) {
    // add d-none class to movieNotFound and remove it from iframe
    movieNotFound.classList.add('d-none');
    // add youtube link with trailers key to iframe.src
    iframe.src = `https://www.youtube.com/embed/${trailers.at(0).key}`;
  } else {
    // Else remove d-none class to movieNotfound and ADD it to iframe
    movieNotFound.classList.remove('d-none');
    iframe.append(movieNotFound);
  }
}

document.querySelector('.close').addEventListener('click', function () {
  modal.classList.remove('show');
  modal.style.display = 'hidden';
});
