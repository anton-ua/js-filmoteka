import { Router } from './components/router/router';
import activeDetailsPage from './components/filmDetails/filmDetails';

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
        console.log('work');
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
