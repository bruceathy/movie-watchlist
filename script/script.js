const apiKey = "2880ab2f&";
const search = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");
let watchList = [];

function fetchMovies(e) {
  document.getElementById("empty-search").style.display = "none";
  let movieEl = "";

  fetch(`http://www.omdbapi.com/?apikey=${apiKey}s=${search.value}`)
    .then((res) => {
      if (!res.ok) {
        throw Error("Weather data not available");
      }
      return res.json();
    })
    .then((data) => {
      for (let movie of data.Search) {
        fetch(`http://www.omdbapi.com/?apikey=${apiKey}i=${movie.imdbID}`)
          .then((res) => res.json())
          .then((imdb) => {
            movieEl += `
            <div class="movie">
              <div class="poster" style="background-image: url('${imdb.Poster}'); background-repeat: no-repeat; background-size: cover; background-size: 100% 100%;">
                <div class="movie-plot">
                  <p>${imdb.Plot}</p>
              </div>
              </div>
              <div class="movie-info">
                <h3>${imdb.Title}</h3>
                <p><strong>Year: </strong>${imdb.Year}</p>
                <p><strong>Type: </strong>${imdb.Type}</p>
                <p><strong>Rating: </strong>${imdb.Rated}</p>
                <p class="watchlist-btn" id="watchlist-btn" onclick="addToWatchlist('${movie.imdbID}')"><a>Add to watchlist</a></p>
              </div>
            </div>
              `;
            document.getElementById("explore").innerHTML = movieEl;
          });
      }
    })
    .catch((err) => console.log(err));
  e.preventDefault();
  search.value = "";
}

function addToWatchlist(movie) {
  watchList.push(movie);
  localStorage.setItem("watchlist-item", JSON.stringify(watchList));
  console.log(localStorage.getItem("watchlist-item"));
  renderWatchlist(watchList);
}

// PUT EVERY WATCHLIST MOVIE IN AN ARRAY THEN USE MAP TO CREATE AN HTML ELEMENT FOR
// EACH ITEM AND APPEND IT TO THE WATCHLIST CONTAINER
function renderWatchlist(list) {
  let watchlistEl = "";
  // document.getElementById("watchlist").style.display = "none";

  for (let i = 0; i < list.length; i++) {
    fetch(`http://www.omdbapi.com/?apikey=${apiKey}i=${list[i]}`)
      .then((res) => res.json())
      .then((data) => {
        watchlistEl += `
            <div class="movie">
              <div class="poster" style="background-image: url('${data.Poster}'); background-repeat: no-repeat; background-size: cover; background-size: 100% 100%;">
                <div class="movie-plot">
                  <p>${data.Plot}</p>
              </div>
              </div>
              <div class="movie-info">
                <h3>${data.Title}</h3>
                <p><strong>Year: </strong>${data.Year}</p>
                <p><strong>Type: </strong>${data.Type}</p>
                <p><strong>Rating: </strong>${data.Rated}</p>
                <p class="watchlist-btn" id="remove-btn" onclick="removeFromWatchlist('${list[i]}')"><a>Remove</a></p>
              </div>
            </div>
              `;
        document.getElementById("saved").innerHTML = watchlistEl;
      });
  }
}

searchBtn.addEventListener("click", fetchMovies);
