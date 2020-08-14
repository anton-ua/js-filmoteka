import {
  getFilmGenres,
  getMostPopularFilms,
  getFilmsByUsersQuery,
} from '../../api/fetchApi';
import libraryPage from './libraryPage.hbs';

const renderFilms = [];
const genres = [];
let pageNumber = 1;

const pageCounter = () => (pageNumber += 1);

const createCardFunc = (query = null) => {
  if (query === null) {
    renderFilms = getMostPopularFilms();
    console.log('renderMostPopularFilms', renderFilms);
  }
  if (query !== null) {
    renderFilms = getFilmsByUsersQuery(query, pageNumber);
    console.log('renderFilmsByUsersQuery', renderFilms);
    pageCounter();
  }

  const ul = document.createElement('ul');
  ul.classList.add('films-list');

  const filmsItemsMarkup = renderFilms.map(
    ({ name, original_name, title, original_title, vote_average }) => {
      let filmTitle = name || original_name || title || original_title;

      markup = libraryPage(filmTitle, vote_average);
      console.log('markup', markup);
      return markup;
    },
  );
  console.log('filmsItemsMarkup', filmsItemsMarkup);
  ul.appendChild(filmsItemsMarkup);

  const main = document.querySelector('#main');

  main.insertAdjacentHTML('afterbegin', ul);
};
