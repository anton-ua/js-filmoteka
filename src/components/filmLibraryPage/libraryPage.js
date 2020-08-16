import films from './libraryPage.hbs';

const ref = document.querySelector('#main');
const markup = films();

ref.insertAdjacentHTML('beforeend', markup);
