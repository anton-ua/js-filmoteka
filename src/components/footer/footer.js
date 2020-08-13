import hbsTemplate from './footer.hbs';

const markup = hbsTemplate();

const footer = document.querySelector('#footer');

footer.insertAdjacentHTML('afterbegin', markup);
