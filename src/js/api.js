import { createTopMovie } from './markup';


import { getRefs } from './refs';
const refs = getRefs();

refs.getSearchForm.addEventListener('submit', getSearch);

let page = 1;

const API_KEY = '137ae7e6367e772dd156f1aad841f871';
const BASE_URL = 'https://api.themoviedb.org/3';
const SEARCH_URL = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&page=${page}&include_adult=false&query=`;
const TRENDING_URL = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=${page}`;
const GENRES_URL = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US}`


async function getSearch(e) {
    e.preventDefault();
    refs.getSpinner.classList.remove('visually-hidden');
    const searchWord = e.currentTarget.search.value;
    try {
        const searchMovie = await fetch(`${SEARCH_URL}${searchWord}`).then(response => response.json());
        refs.getTopMovie.innerHTML = createTopMovie(searchMovie.results);
        refs.getSpinner.classList.add('visually-hidden');

    } catch (error) {
        console.log(error);
    }
}
    
  
getTrendingMovie();

async function getTrendingMovie() {

    try {
        const topMovieInfo = await fetch(TRENDING_URL).then(response => response.json());
        const genresMovie = await fetch(GENRES_URL).then(response => response.json());
        refs.getTopMovie.innerHTML = createTopMovie(topMovieInfo.results);

    } catch (error) {
        console.log(error);
    }
    
}