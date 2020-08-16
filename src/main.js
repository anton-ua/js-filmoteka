import { Router } from './components/router/router';
import activeDetailsPage from './components/filmDetails/filmDetails';
import renderMarkup from './components/homePage/homePage';

// export const selectFilm = null;
const isLibraryFilm = false;

window['router'] = new Router({
  root: '/',
  routes: [
    {
      path: /film\/(.*)/,
      callback: id => {
        activeDetailsPage(id, isLibraryFilm);
      },
    },
    {
      path: '',
      callback: () => {
        renderMarkup();
      },
    },
  ],
});

const film = document.querySelector('.film');

film.addEventListener('click', e => {
  e.preventDefault();
  const { value } = e.target;
  window['router'].navigate(`/film/${value}`);
});
