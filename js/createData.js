// *************************************************************** movie images

function createCards(obj) {
    const div = document.createElement("div");
    const img = document.createElement("img");
    div.append(img);
    img.dataset.id = obj.id;
    img.setAttribute("src", `https://image.tmdb.org/t/p/w500/${obj.poster_path}`);
    return div;
}

// *************************************************************** header

const headerDrawing = (elm) => {
    infoTitle.textContent = elm.title;
    infoOverview.textContent = elm.overview;
    movieRate.textContent = `Rate : ${elm.vote_average.toFixed(1)} / 10`;
    movieYear.textContent = `Release Year : ${elm.release_date}`;
    setTimeout(() => {
        infoHeaderDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${elm.backdrop_path})`;
    }, 200);
    infoHeaderDiv.querySelector("#watchVideo").dataset.id = elm.id;
};

// *************************************************************** series

function createSeries(elm) {
    const div = document.createElement("div");
    const h2 = document.createElement("h2");
    const strong = document.createElement("strong");
    const p = document.createElement("p");
    const span = document.createElement("span");
    span.classList.add("seriesSpan");
    h2.textContent = elm.name;
    p.textContent = elm.overview;
    strong.textContent = `Language : ${elm.origin_country[0]}`;
    div.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${elm.backdrop_path})`;
    div.classList.add("seriesDivMain");
    div.append(h2, strong, p, span);
    
    return div;
}

function createSearch(film) {
    const div = document.createElement("div");
    const leftDiv = document.createElement("div");
    const rightDiv = document.createElement("div");
    const img = document.createElement("img");
    img.setAttribute("src", `https://image.tmdb.org/t/p/w500/${film.poster_path}`);
    const filmName = document.createElement("h2");
    const filmYear = document.createElement("p");
    filmName.textContent = film.title;
    filmYear.textContent = film.release_date;
    leftDiv.append(img);
    rightDiv.append(filmName, filmYear);
    div.append(leftDiv, rightDiv);
    div.classList.add('search_div')
    rightDiv.classList.add('search_right_div')
    leftDiv.classList.add('search_left_div')
    
    return div;
}

export { createSearch };
export { createSeries };
export { headerDrawing };
export default createCards;
