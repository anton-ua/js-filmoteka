import hbsTemplateHeader from './header.hbs';
import renderSearchBar from '../search/search';

const markup = hbsTemplateHeader();

const header = document.querySelector('#header');

header.insertAdjacentHTML('afterBegin', markup);

renderSearchBar();
