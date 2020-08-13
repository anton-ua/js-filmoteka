import hbsTemplate from './header.hbs';

const markup = hbsTemplate();

const header = document.querySelector('#header');

header.insertAdjacentHTML('afterbegin', markup);


