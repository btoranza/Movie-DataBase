// TRAIGO DATOS DE LA API

//Home

const categories = document.querySelectorAll('.movies-list');
let popular = categories[0];

let urlPopular = 'https://api.themoviedb.org/3/movie/popular?api_key=24da6765990bd746993a94b165592b4f';
let urlTopRated = 'https://api.themoviedb.org/3/movie/top_rated?api_key=24da6765990bd746993a94b165592b4f';
let urlUpcoming = 'https://api.themoviedb.org/3/movie/upcoming?api_key=24da6765990bd746993a94b165592b4f'
let urlNowPlaying = 'https://api.themoviedb.org/3/movie/now_playing?api_key=24da6765990bd746993a94b165592b4f';

const bringMoviesHome = (url, i) =>

    fetch(url)
    .then(res => res.json())
    .then(data => {

        const movies = data.results;
        const fiveMovies = movies.splice(0,5);
        const categories = document.querySelectorAll('#main-section .movies-list');
        const ul = categories[i];
        
        let lis = fiveMovies.map(movie =>
            
        `<li class="movies-item">
            <div class="movie-img-cont" style="background: url('http://image.tmdb.org/t/p/w185${movie.poster_path}') no-repeat center center">
            </div>
            <p>${movie.title}</p>
        </li>`
        ).join('');

        ul.innerHTML = lis;
        
})

bringMoviesHome(urlPopular, 0);
bringMoviesHome(urlTopRated, 1);
bringMoviesHome(urlUpcoming, 2);
bringMoviesHome(urlNowPlaying, 3);

const bringMoviesCat = (url) =>

    fetch(url)
    .then(res => res.json())
    .then(data => {

        const movies = data.results;
        const catList = document.querySelector('#main-category .movies-list');
        
        let lis = movies.map(movie =>
            
        `<li class="movies-item">
            <div class="movie-img-cont" style="background: url('http://image.tmdb.org/t/p/w185${movie.poster_path}') no-repeat center center">
            </div>
            <p>${movie.title}</p>
        </li>`
        ).join('');

        catList.innerHTML = lis;
        
})

// FUNCIONAMIENTO DEL SITIO

const homeParent = document.querySelector(".home-parent");
const principal = document.querySelector('.principal');
const navitem = document.querySelectorAll(".nav-item");
let actual = 0;

principal.addEventListener('click', function (e) {
    if(actual != 1){
        document.querySelector('#main-category').style.display = "none";
        homeParent.style.display = "block";
    } 
    actual = 1;
});

const categoryName = document.querySelector('#main-category .movies-header h1');
const movieAmount = document.querySelector('#main-category .movies-header span');
let pageAdd= '&page=1';

navitem.forEach(function(a){
    a.addEventListener('click', function (e) {
        let numero = parseInt(a.getAttribute("numero"));
        actual = numero;
        homeParent.style.display = "none";
        document.querySelector('#main-category').style.display = "block";
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
            bringMoviesCat(urlNowPlaying+pageAdd);
        }

    });
});






//Paginas por categorias



