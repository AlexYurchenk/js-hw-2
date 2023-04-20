import refs from './refs.js';

export const route = async (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, '', event.target.href);
    await handleLocation();
};

const routes = {
    404: '../pages/404.html',
    '/': '../pages/main.html',
    '/search': '../pages/search.html',
    '/index.html': '../pages/main.html',
};

const handleLocation = async () => {
    const path = window.location.pathname;

    const route = routes[path] || routes[404];
    const html = await fetch(route).then((data) => data.text());
    refs.main_page.innerHTML = html;
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();
