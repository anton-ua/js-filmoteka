import Router from './components/router/router';
import activeDetailsPage from './components/filmDetails/filmDetails';
// import renderMarkup from './components/homePage/homePage';
import initialHomePage from './components/filmLibraryPage/initialHomePage';
// import libraryPath from './components/filmLibraryPage/libraryPage.hbs';
import libraryPage from './components/filmLibraryPage/libraryPage';

const libraryBtn = document.querySelector('.header-btn[data-action=Library]');
const homeBtn = document.querySelector('.header-btn[data-action=home]');

const isLibraryFilm = false;

window['router'] = new Router({
  root: '/',

  routes: [
    {
      path: /library\/watched/,
      callback: () => {
        libraryPage('filmsWatched');
      },
    },
    {
      path: /library\/queue/,
      callback: () => {
        libraryPage('filmsQueue');
      },
    },
    {
      path: /film\/(.*)/,
      callback: id => {
        activeDetailsPage(id, isLibraryFilm);
      },
    },
    {
      path: '',
      callback: () => {
        initialHomePage();
      },
    },
  ],
});

libraryBtn.addEventListener('click', e => {
  e.preventDefault();
  window['router'].navigate('/library/watched');
});

homeBtn.addEventListener('click', e => {
  e.preventDefault();
  window['router'].navigate('/');
});
