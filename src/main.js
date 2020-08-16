import Router from './components/router/router';
import activeDetailsPage from './components/filmDetails/filmDetails';
// import renderMarkup from './components/homePage/homePage';
import initialHomePage from './components/filmLibraryPage/initialHomePage';
import libraryPath from './components/filmLibraryPage/libraryPage.hbs';

const libraryBtn = document.querySelector('.header-btn[data-action=Library]');
const homeBtn = document.querySelector('.header-btn[data-action=home]');

const isLibraryFilm = false;

window['router'] = new Router({
  root: '/',

  routes: [
    {
      path: /library/,
      callback: id => {
        console.log('Library page');
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
  console.log('routing to library works!');
  window['router'].navigate('/library');
});

homeBtn.addEventListener('click', e => {
  e.preventDefault();
  console.log('routing to home works!');
  window['router'].navigate('/');
});
