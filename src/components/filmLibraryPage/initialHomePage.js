'use strict';
import {
  getFilmGenres,
  getMostPopularFilms,
  getFilmsByUsersQuery,
} from '../../api/fetchApi';
import libraryPage from './libraryPage.hbs';
import paginationEventListener from './pagination.js';

let renderFilms = [];
let genres = [];
let pageNumber = 1;

const pageCounter = () => (pageNumber += 1);
const totalNumberOfPages = () => renderFilms.length % 6;
// console.log('totalNumberOfPages', renderFilms.length % 6);

const createCardFunc = async (query = null) => {
  if (query === null) {
    const filmsReqResult = await getMostPopularFilms();
    renderFilms = [...filmsReqResult.data.results];
    console.log('renderMostPopularFilms', filmsReqResult.data.results);
    console.log('renderFilms', renderFilms);
    const genresReqResult = await getFilmGenres();
    genres = [...genresReqResult.data.genres];
    console.log('genresReqResult', genresReqResult.data.genres);
    console.log('genres', genres);
  }
  if (query !== null) {
    renderFilms = await getFilmsByUsersQuery(query, pageNumber);
    console.log('renderFilmsByUsersQuery', renderFilms);
    genres = await getFilmGenres();
    console.log('genres', genres);
    pageCounter();
  }

  const filmsItemsMarkup = renderFilms
    .map(
      ({
        name,
        original_name,
        title,
        original_title,
        vote_average,
        backdrop_path,
      }) => {
        let film_title = name || original_name || title || original_title;
        // console.log('film_title', film_title);
        const markup = libraryPage({
          vote_average,
          backdrop_path,
          film_title,
        });
        // console.log('markup', markup);
        return markup;
      },
    )
    .join('\n');
  // console.log('filmsItemsMarkup', filmsItemsMarkup);

  const main = document.querySelector('#main');

  main.insertAdjacentHTML(
    'afterbegin',
    `<ul class ="film-card__list">${filmsItemsMarkup}</ul>
    <section class="homepage__pagination">
    <button id="prev" class="homepage__pagination-controller">Prev</button>
    <button class="homepage__pagination-page_indicator">1</button>
    <button id="next" class="homepage__pagination-controller">Next</button>
    </section>`,
  );
};

export default createCardFunc;
