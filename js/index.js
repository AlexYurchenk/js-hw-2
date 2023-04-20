import refs from './refs.js';
import { route } from './router.js';
import { updateGalleryMarkup, clearContainer, updateRefs } from './helpers.js';
import { ValidationError } from './errors.js';
const handleSearch = (e) => {
    e.preventDefault();
    const value = refs.searchField.value.trim();
    try {
        if (!value) {
            throw new ValidationError();
        }
        clearContainer();
        updateGalleryMarkup(value);
    } catch (error) {
        alert(error);
    }
};
const handleRouteChange = async () => {
    await route();
    updateRefs();
    if (window.location.href.includes('search')) {
        refs.form.addEventListener('submit', handleSearch);
    }
    updateGalleryMarkup();
};
const handleOverlayClick = (e) => {
    if (e.currentTarget !== e.target) {
        return;
    }
    if (!refs.overlay.classList.contains('is-hidden')) {
        refs.overlay.classList.add('is-hidden');
    }
};
refs.nav.forEach((l) => {
    l.addEventListener('click', handleRouteChange);
});
window.addEventListener('load', handleRouteChange);
refs.overlay.addEventListener('click', handleOverlayClick);
