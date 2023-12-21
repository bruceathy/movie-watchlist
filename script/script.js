const apiKey = "2880ab2f&";
const search = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");
const watchlistBtn = document.getElementById("watchlist-btn");
let movieEl;

// FIND WAY TO CLEAR PAGE WHEN YOU CLICK SEARCH AGAIN
function fetchMovies(e) {
  document.getElementById("empty-search").style.display = "none";

  fetch(`http://www.omdbapi.com/?apikey=${apiKey}s=${search.value}`)
    .then((res) => res.json())
    .then((data) => {
      const moviesArr = data.Search;
      for (let movie of moviesArr) {
        fetch(`http://www.omdbapi.com/?apikey=${apiKey}i=${movie.imdbID}`)
          .then((res) => res.json())
          .then((imdb) => {
            console.log(imdb);
            movieEl += `
              <div class="movie">
                <img src="${imdb.Poster}" class="poster">
                  <div class="movie-info">
                    <h3>${imdb.Title}</h3>
                    <p><strong>Year: </strong>${imdb.Year}</p>
                    <p><strong>Type: </strong>${imdb.Type}</p>
                    <p><strong>Rating: </strong>${imdb.Rated}</p>
                    <p><strong>Plot: </strong>${imdb.Plot}</p>
                    <p class="watchlist-btn" id="watchlist-btn"><a>Add to watchlist</a></p>
                  </div>
              </div>
              `;
            document.getElementById("explore").innerHTML = movieEl;
          });
      }
    });

  e.preventDefault();
}

function addToWatchlist() {
  // SAVE THE IMDBID TO LOCALSTORAGE
}

searchBtn.addEventListener("click", fetchMovies);
watchlistBtn.addEventListener("click", addToWatchlist);
