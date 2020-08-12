import hbsTemplate from './filmDetails.hbs';

const markup = hbsTemplate();

const filmDetails = document.querySelector('#main');

filmDetails.insertAdjacentHTML('afterbegin', markup);
