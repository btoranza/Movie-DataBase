// main URLs for FETCH

let apiKey = '24da6765990bd746993a94b165592b4f';
let urlPopular = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
let urlTopRated = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`
let urlUpcoming = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`
let urlNowPlaying = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`


// TO ADD EVENTS FUNCTION FOR MODAL

const agregarOnclick = () => {

    const clickedMovie = document.querySelectorAll('.movies-item');
    const modal = document.querySelector('#movie-modal');

    clickedMovie.forEach(movie => {
        movie.onclick = e => {

            const movieId = e.currentTarget.id;

            fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
            .then(res => res.json())
            .then(data => {
                
                //imagen header modal
                const movieHeader = document.querySelector('#movie-modal-header');
                movieHeader.style.background = `url('http://image.tmdb.org/t/p/original${data.backdrop_path}')`;
                movieHeader.style.backgroundSize = 'cover';
                movieHeader.style.opacity = '0.3';

                //tagline
                document.querySelector('#movie-modal-title').innerHTML = `<h1>${data.title}</h1><span>${data.tagline}</span>`;

                //poster
                document.querySelector('#movie-modal-poster').style.background = `url('http://image.tmdb.org/t/p/original${data.poster_path}') no-repeat center center`

                //overview
                document.querySelector('#movie-modal-description').innerHTML = `<span>${data.overview}</span>`;

                //genres
                let genres = data.genres.map(genre => 
                    genre.name)
                    .join(', ')

                document.querySelector('#genres').innerHTML = `<h1>GENRES</h1><span>${genres}</span>`;

                //release date
                let releaseDate = new Date(data.release_date);
                releaseDate = new Date(releaseDate.setDate(releaseDate.getDate()+1));
                releaseDate = releaseDate.toDateString();
                releaseDate = releaseDate.slice(3, releaseDate.length);

                document.querySelector('#release-date').innerHTML = `<h1>RELEASE DATE</h1><span>${releaseDate}</span>`

                //open modal
                modal.style.display = 'block'
            })
        }
    })
}



// Fetch for HOME

const bringMoviesHome = (url, i) =>

    fetch(url)
    .then(res => res.json())
    .then(data => {

        const movies = data.results;
        const fiveMovies = movies.splice(0,5);
        const categories = document.querySelectorAll('#main-section .movies-list');
        const ul = categories[i];
        
        let lis = fiveMovies.map(movie =>
            
        `<li id='${movie.id}' class="movies-item">
            <div class="movie-img-cont" style="background: url('http://image.tmdb.org/t/p/original${movie.poster_path}') no-repeat center center">
            </div>
            <p>${movie.title}</p>
        </li>`

        ).join('');

        ul.innerHTML = lis;       
        
        agregarOnclick();
})

bringMoviesHome(urlPopular, 0);
bringMoviesHome(urlTopRated, 1);
bringMoviesHome(urlUpcoming, 2);
bringMoviesHome(urlNowPlaying, 3);


// FETCH for each category

const catList = document.querySelector('#main-category .movies-list');

const bringMoviesCat = (url) =>

    fetch(url)
    .then(res => res.json())
    .then(data => {

        const movies = data.results;
        const movieAmount = document.querySelector('#main-category .movies-header span');
        
        let lis = movies.map(movie =>
            
        `<li id='${movie.id}' class="movies-item">
            <div class="movie-img-cont" style="background: url('http://image.tmdb.org/t/p/original${movie.poster_path}') no-repeat center center">
            </div>
            <p>${movie.title}</p>
        </li>`
        ).join('');

        catList.innerHTML = lis;
        movieAmount.textContent = `${data.total_results} results`

        agregarOnclick();    
        
})

// Hiding/showing DIVs for website function

const homeParent = document.querySelector(".home-parent");
const principal = document.querySelector('.principal');
const navitem = document.querySelectorAll(".nav-item");
let actual = 0;

principal.addEventListener('click', () => {
    if(actual != 1){
        document.querySelector('#main-category').style.display = "none";
        homeParent.style.display = "block";
    } 
    actual = 1;
});

const catMenu = document.querySelector('#left-nav');

navitem.forEach(a => {
    a.addEventListener('click', function (e) {
        let numero = parseInt(a.getAttribute("numero"));
        actual = numero;
        homeParent.style.display = "none";
        document.querySelector('#main-category').style.display = "block";
        let pageAdd= '&page=1';

        if(catMenu.classList.contains('show')){
            catMenu.classList.remove('show');
        }

        fav();

        if(actual==2) {
            categoryName.textContent = 'Popular Movies';
            bringMoviesCat(urlPopular+pageAdd);
        }else if (actual==3) {
            categoryName.textContent = 'Top Rated Movies';
            bringMoviesCat(urlTopRated+pageAdd);
        }else if (actual==4) {
            categoryName.textContent = 'Upcoming Movies';
            bringMoviesCat(urlUpcoming+pageAdd);
        }else if (actual==5) {
            categoryName.textContent = 'Now Playing Movies';
            bringMoviesCat(urlNowPlaying+pageAdd);}    
    })
});

// Menu mobile

const hambMenu = document.querySelector('#hamb-menu');

function fav() {
    const icon = document.getElementById("icon");
      if (icon.classList.contains("fa-bars")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
    } else {
       icon.classList.remove("fa-times");
       icon.classList.add("fa-bars");
    }
 }

hambMenu.addEventListener('click', function(e){
    catMenu.classList.toggle('show');
    fav();

})


// Search page

const categoryName = document.querySelector('#main-category .movies-header h1');
let paginaActual = 1;

const searchInput = document.querySelector('#search-nav form');
const input = document.querySelector('#search-nav input');
let movieSearched = input.value;

searchInput.addEventListener('submit', function(e) {

    e.preventDefault();
    actual = 6;
    movieSearched = input.value;
    if(movieSearched) {
        homeParent.style.display = "none";
        document.querySelector('#main-category').style.display = "block";
        categoryName.textContent = 'Search Results';
        let urlSearch = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movieSearched}&page=${paginaActual}`;
        bringMoviesCat(urlSearch);
        agregarOnclick();
    }

    if(catMenu.classList.contains('show')){
        catMenu.classList.remove('show');
    }

})

const concatResults = (url) => {

    fetch(url) 
        .then(res => res.json())
        .then(data => { 
            
            const results = data.results;
            let lis = results.map(movie => 
                `<li id='${movie.id}' class="movies-item">
                <div class="movie-img-cont" style="background: url('http://image.tmdb.org/t/p/original${movie.poster_path}') no-repeat center center">
                </div>
                <p>${movie.title}</p>
            </li>`
            ).join('');

            catList.innerHTML += lis;
            agregarOnclick();

        })
}


// Load more button
const loadMoreButton = document.querySelector('#main-category .load-cont button');
let urlSearch = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movieSearched}&page=${paginaActual}`;

loadMoreButton.addEventListener('click', function(e){

    paginaActual += 1;
    pageAdd = `&page=${paginaActual}`;

    if(actual==2) {
        concatResults(urlPopular+pageAdd);
    }else if (actual==3) {
        concatResults(urlTopRated+pageAdd);
    }else if (actual==4) {
        concatResults(urlUpcoming+pageAdd);
    }else if (actual==5) {
        concatResults(urlNowPlaying+pageAdd);
    }else if(actual==6){
        let urlSearch = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query='${movieSearched}${pageAdd}`;
        concatResults(urlSearch+pageAdd);
    }
})

// MODAL CLOSE

let closeButton = document.querySelector('#modal-close-button');

closeButton.addEventListener('click', e => {
    const modal = document.querySelector('#movie-modal');

    modal.style.display = 'none';
})

window.addEventListener('click', clickOutsideModal)

function clickOutsideModal(e) {
    const modal = document.querySelector('#movie-modal');
    const modalBox = document.querySelector('#movie-modal-box');
    
    if (e.target === modal) {
        modal.style.display = 'none';
    }
}


