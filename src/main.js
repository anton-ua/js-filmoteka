import Router from './components/router/router';
import activeDetailsPage from './components/filmDetails/filmDetails';
import libraryPath from './components/filmLibraryPage/libraryPage.hbs';

const libraryBtn = document.querySelector('.header-btn[data-action=Library]');
const homeBtn = document.querySelector('.header-btn[data-action=home]');

const router = new Router({
  mode: 'history',
  root: '/',
});

router.add(/library/, () => {
  alert('works!');
});

libraryBtn.addEventListener('click', e => {
  e.preventDefault();
  console.log('routing to library works!');
  router.navigate(/library/);
});

homeBtn.addEventListener('click', e => {
  e.preventDefault();
  console.log('routing to home works!');
  router.navigate('/');
});
