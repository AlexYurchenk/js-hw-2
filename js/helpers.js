import refs from './refs.js';
import { IdNotFoundError } from './errors.js';
import MoviesAPI from './api.service.js';
const moviesAPI = new MoviesAPI();
export const getIdFromParentLi = (e) => {
    if (e.parentElement === window) {
        throw new IdNotFoundError();
    }
    return e.parentElement.nodeName === 'LI' && e.parentElement.id
        ? e.parentElement.id
        : getIdFromParentLi(e.parentElement);
};
export const handleCardClick = async (e) => {
    try {
        if (e.target.nodeName === 'UL') {
            return;
        }
        clearModal();
        const id = getIdFromParentLi(e.target);

        const movie = await getMoviesById(id);
        const markup = makeModalMarkup(movie);
        refs.modal.insertAdjacentHTML('beforeend', markup);
        refs.overlay.classList.toggle('is-hidden');
    } catch (e) {
        alert(e);
    }
};
export const updateRefs = () => {
    refs.form = document.querySelector('.form');
    refs.searchField = document.querySelector('.form__search-field');
    refs.gallery = document.querySelector('.gallery');
    refs.gallery.addEventListener('click', handleCardClick);
};
export const makeModalMarkup = ({
    poster_path,
    release_date,
    original_title,
    genres,
    title,
}) => {
    const genresMarkUp = makeGenreList(genres);
    return `<div class="movie_detailed">
    <picture>
    <img
        class="movie_detailed__img"
        srcset="
                    https://image.tmdb.org/t/p/w300/${
                        poster_path
                            ? poster_path
                            : '/3CxUndGhUcZdt1Zggjdb2HkLLQX.jpg'
                    }  370w,
                    https://image.tmdb.org/t/p/w780/${
                        poster_path
                            ? poster_path
                            : '/3CxUndGhUcZdt1Zggjdb2HkLLQX.jpg'
                    }  740w,
                    https://image.tmdb.org/t/p/w1280/${
                        poster_path
                            ? poster_path
                            : '/3CxUndGhUcZdt1Zggjdb2HkLLQX.jpg'
                    } 1110w
                "
        src="https://image.tmdb.org/t/p/w300"
        alt="${title ? title : original_name}"
        sizes="(min-width: 1200px) 50vw, 100vw"
    />
</picture>
    <h2 class="movie_detailed__title">${title ? title : original_title}</h2>
    <p class="movie_detailed__release">${release_date}</p>
    <ul class="movie_detailed__genre-list">${genresMarkUp}</ul>
</div>
`;
};
const makeGenreList = (genres) => {
    return genres
        .map((g) => `<li class="genre-list__item">${g.name}</li>`)
        .join('');
};
export const getMoviesById = async (id) => {
    try {
        return await moviesAPI.getMoviesById(id);
    } catch (e) {
        alert(e);
    }
};
export const getTrends = async () => {
    try {
        const { results } = await moviesAPI.getTrends();

        moviesAPI.setMovies(results);

        const movies = moviesAPI.getMovies();

        return movies;
    } catch (e) {
        alert(e);
    }
};
export const getMoviesByRequest = async (req) => {
    try {
        const { results } = await moviesAPI.getMoviesByRequest(req);

        moviesAPI.setMovies(results);

        const movies = moviesAPI.getMovies();

        return movies;
    } catch (e) {
        alert(e);
    }
};
export const updateGalleryMarkup = async (req) => {
    const url = window.location.href;
    let results = [];
    if (!String(url).includes('search')) {
        results = [...(await getTrends())];
    }
    if (String(url).includes('search') && req) {
        results = [...(await getMoviesByRequest(req))];
    }
    const markup = createGalleryMarkup(results);
    refs.gallery.insertAdjacentHTML('beforeend', markup);
};

export const createGalleryMarkup = (items) => {
    return items.map((c) => createCardMarkup(c)).join('');
};
export const createCardMarkup = ({
    backdrop_path,
    id,
    title,
    original_name,
}) => {
    return `<li id=${id} class="gallery__item">
    <div class="card">
        <picture>
            <img
                class="card__picture"
                srcset="
                    https://image.tmdb.org/t/p/w300/${
                        backdrop_path
                            ? backdrop_path
                            : '/3CxUndGhUcZdt1Zggjdb2HkLLQX.jpg'
                    }  370w,
                    https://image.tmdb.org/t/p/w780/${
                        backdrop_path
                            ? backdrop_path
                            : '/3CxUndGhUcZdt1Zggjdb2HkLLQX.jpg'
                    }  740w,
                    https://image.tmdb.org/t/p/w1280/${
                        backdrop_path
                            ? backdrop_path
                            : '/3CxUndGhUcZdt1Zggjdb2HkLLQX.jpg'
                    } 1110w
                "
                src="https://image.tmdb.org/t/p/w300"
                alt="${title ? title : original_name}"
                sizes="(min-width: 1200px) 33vw,(min-width: 768px) 50vw, 100vw"
            />
        </picture>
        <h2 class="card__title">${title ? title : original_name}</h2>
    </div>
</li>`;
};
export const clearContainer = () => {
    refs.gallery.innerHTML = '';
};
export const clearModal = () => {
    refs.modal.innerHTML = '';
};
