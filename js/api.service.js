import { PermissionDeniedError, NotFoundError } from './errors.js';
const API_KEY = '44d74a10460e9a32f8546bed31d47780';
class MoviesAPI {
    #moviesList = [];

    async getTrends() {
        const GET_TRENDS_BASE_URL =
            'https://api.themoviedb.org/3/trending/all/day?api_key=';

        return fetch(GET_TRENDS_BASE_URL + API_KEY).then((r) => {
            if (r.status === 401) {
                throw new PermissionDeniedError();
            }
            if (r.status === 404) {
                throw new NotFoundError();
            }
            return r.json();
        });
    }
    async getMoviesByRequest(req) {
        const GET_MOVIES_BY_REQUEST_BASE_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${req}&page=1&include_adult=false`;
        return fetch(GET_MOVIES_BY_REQUEST_BASE_URL).then((r) => {
            if (r.status === 401) {
                throw new PermissionDeniedError();
            }
            if (r.status === 404) {
                throw new NotFoundError();
            }
            return r.json();
        });
    }

    async getMoviesById(id) {
        const GET_MOVIES_BY_REQUEST_BASE_URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`;
        return fetch(GET_MOVIES_BY_REQUEST_BASE_URL).then((r) => {
            if (r.status === 401) {
                throw new PermissionDeniedError();
            }
            if (r.status === 404) {
                throw new NotFoundError();
            }
            return r.json();
        });
    }
    setMovies(list) {
        this.#moviesList = list;
    }
    getMovies() {
        return [...this.#moviesList];
    }
}
export default MoviesAPI;
