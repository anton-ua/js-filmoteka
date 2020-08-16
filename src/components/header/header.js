
import hbsTemplateHeader from './header.hbs';


const markup = hbsTemplateHeader();

const header = document.querySelector('#header');

header.insertAdjacentHTML('afterBegin', markup);
