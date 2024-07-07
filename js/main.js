import getMovie from "./getData.js";
import createCards from "./createData.js";
import { headerDrawing } from "./createData.js";
import { createSeries } from "./createData.js";
import { createSearch } from "./createData.js";

const searchIcon = document.getElementById("searchIcon");
const form = document.forms[0];
const watchList = document.getElementById("watchList");
const search = document.getElementById("search");
const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");
const searchResult = document.getElementById("searchResult");
const favorites = document.getElementById("favorites");
const add_to_watchlist = document.getElementById("add_to_watchlist");
const favmovies_ul = document.getElementById("favmovies_ul");

add_to_watchlist.addEventListener("click", (e) => {
    e.preventDefault();
    favmovies_ul.append(createSearch(e));
});

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjFhMTg5ZDBiMTlhYTJhM2JlOGY5ZTFjMDNhMThlNiIsInN1YiI6IjY2MGVkN2JhMzNhMzc2MDE3ZDg0NWVhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.N6_4xI6ZDdZIJ4bwSBp4lBTjpPt0ebPsLl8V9b01wmg",
    },
};

const movieUrl =
    "https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=true&language=en-US&page=1&sort_by=popularity.desc";

let movies = await getMovie(movieUrl, options);

// *************************************************************** nav search bar

search.addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();
    form.style.display = "block";
    setTimeout(() => {
        form.style.scale = "1";
    }, 300);
    searchIcon.style.display = "none";
});
window.addEventListener("click", () => {
    form.style.display = "none";
    setTimeout(() => {
        form.style.scale = "0";
    }, 300);
    searchIcon.style.display = "block";
    if (searchIcon.style.display === "block") {
        searchResult.style.display = "none";
    } else if (form.style.display === "none") {
        searchResult.style.display = "none";
    }
});

const creatingSearch = async (e) => {
    e.preventDefault();
    const searchData = await getMovie(
        `https://api.themoviedb.org/3/search/movie?query=${e.target.value}&include_adult=false&language=en-US&page=1`,
        options
    );

    if (searchData) {
        searchResult.style.display = "block";
        searchData.forEach((elm) => {
            searchResult.append(createSearch(elm));
        });
    }
};

form.addEventListener("input", creatingSearch);

// *************************************************************** movies drawing

function drawing_Each_Card(arr) {
    arr.forEach((movie) => {
        watchList.append(createCards(movie));
    });
}

drawing_Each_Card(movies);

// *************************************************************** slider

const moiveCards = document.querySelectorAll("#watchList div");
let counter = 0;

const slideMovie = () => {
    moiveCards.forEach((movie) => {
        movie.style.transform = `translateX(-${counter * 100}%)`;
        movie.style.transition = ".4s";
    });
};
const nextMovie = () => {
    counter++;
    if (counter === moiveCards.length - 5 || counter === moiveCards.length) {
        counter = 0;
    }
    slideMovie();
};

const prevMovie = () => {
    if (counter === 0) {
        counter = moiveCards.length - 1;
        slideMovie();
    } else {
        counter--;
        slideMovie();
    }
};

rightArrow.addEventListener("click", nextMovie);
leftArrow.addEventListener("click", prevMovie);

// ? *************************************************************** header section

movies.forEach((elm) => {
    headerDrawing(elm);
});

moiveCards.forEach((movie) => {
    movie.addEventListener("click", (e) => {
        let obj = movies.find((elm) => elm.id == e.target.dataset.id);
        headerDrawing(obj);
    });
});

// *************************************************************** series

const getUrl =
    "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc";

let series = await getMovie(getUrl, options);

function drawing_Each_Series(series) {
    series.forEach((seria) => {
        series_div_main_parent.append(createSeries(seria));
    });
}

drawing_Each_Series(series);

const watchVideo = document.getElementById("watchVideo");
const movieIfame = document.querySelector("#video__wrapper iframe");
const video__wrapper = document.getElementById("video__wrapper");

watchVideo.addEventListener("click", async (e) => {
    e.preventDefault();
    let id = e.target.dataset.id;
    const trailerList = await getMovie(
        `https://api.themoviedb.org/3/movie/${id}/videos`,
        options
    );

    let youtubeKey = trailerList.find((elm) =>
        elm.name.includes("Official Trailer")
    )?.key;
    if (!youtubeKey) {
        movieIfame.style.display = "none";
    } else {
        video__wrapper.style.transform = "translateX(0)";
        movieIfame.src = `https://www.youtube.com/embed/${youtubeKey}`;
    }
});
