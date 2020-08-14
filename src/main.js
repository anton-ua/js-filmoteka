import { Router } from './components/router/router';
import filmDetails from './components/filmDetails/filmDetails';

window['router'] = new Router({
  root: '/',
  routes: [
    {
      path: /film\/(.*)/,
      callback: id => {
        filmDetails(id);
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
