'use strict';
import {
  getFilmGenres,
  getMostPopularFilms,
  getFilmsByUsersQuery,
} from '../../api/fetchApi';
import libraryPage from './libraryPage.hbs';
// import { paginationEventListener } from './pagination.js';

let renderFilms = [];
let genres = [];
let pageNumber = 1;

// const pageCounter = () => (pageNumber += 1);
const totalNumberOfPages = () => renderFilms.length % 6;
// console.log('totalNumberOfPages', renderFilms.length % 6);

const createCardFunc = async (query = null) => {
  if (query === null) {
    const filmsReqResult = await getMostPopularFilms();
    renderFilms = [...filmsReqResult.data.results];
    // console.log('renderMostPopularFilms', filmsReqResult.data.results);
    console.log('renderFilms', renderFilms);
    const genresReqResult = await getFilmGenres();
    genres = [...genresReqResult.data.genres];
    // console.log('genresReqResult', genresReqResult.data.genres);
    // console.log('genres', genres);
    // pageNumber++;
  }
  console.log('pageNumber', pageNumber);
  if (query !== null) {
    renderFilms = await getFilmsByUsersQuery(query, pageNumber);
    // console.log('renderFilmsByUsersQuery', renderFilms);
    genres = await getFilmGenres();
    // console.log('genres', genres);
    pageNumber++;
    // pageCounter();
  }

  console.log('renderFilms222', renderFilms);
  let newArr = [];
  const startIdx = () => {
    if (pageNumber === 1) {
      console.log('startIdx1', 'work');

      return 0;
    }
    if (pageNumber !== 1) {
      console.log('pageNumber - 1 * 6', (pageNumber - 1) * 6);
      console.log('startIdx2', 'work');
      return (pageNumber - 1) * 6;
    }
  };

  const endIdx = () => {
    if (pageNumber === 1) {
      console.log('endIdx1', 'work');

      return 6;
    }
    if (pageNumber !== 1) {
      console.log('endIdx2', 'work');
      return pageNumber * 6;
    }
  };
  // if (pageNumber === 1) {
  //   newArr = renderFilms.slice(startIdx(), endIdx());
  //   console.log('pageNumber', pageNumber);
  // }
  // // console.log('newArr1', newArr);
  // if (pageNumber > 1) {
  //   newArr = renderFilms.slice(startIdx(), endIdx());
  //   console.log('pageNumber', pageNumber);
  // }
  console.log('newArr2', newArr);

  const filmsItemsMarkup = () => {
    if (pageNumber === 1) {
      newArr = renderFilms.slice(startIdx(), endIdx());
      console.log('pageNumber', pageNumber);
      console.log('newArr1', newArr);
    }
    // console.log('newArr1', newArr);
    if (pageNumber > 1) {
      newArr = renderFilms.slice(startIdx(), endIdx());
      console.log('pageNumber', pageNumber);
      console.log('newArr2', newArr);
    }
    return newArr
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
  };
  console.log('filmsItemsMarkup3333333', filmsItemsMarkup);

  const main = document.querySelector('#main');

  main.innerHTML = `<ul class ="film-card__list">${filmsItemsMarkup()}</ul>
    <section class="homepage__pagination">
    <button id="prev" class="homepage__pagination-controller">Prev</button>
    <button class="homepage__pagination-page_indicator">${pageNumber}</button>
    <button id="next" class="homepage__pagination-controller">Next</button>
    </section>`;

  const handlePaginationClick = e => {
    const refs = {
      pagination: document.querySelector('.homepage__pagination'),
      prev: document.querySelector('#prev'),
      next: document.querySelector('#next'),
    };
    console.log('renderFilms', renderFilms);
    console.log('pageNumber', pageNumber);
    //   const innetPagination = 1;
    console.log('e.target', e.target);
    console.log('refs.pagination', refs.pagination);
    console.log('refs.prev', refs.prev);
    console.log('refs.next', refs.next);
    console.log(e.target === refs.prev);
    console.log(e.target === refs.next);
    // const newArr = [];

    if (e.target === refs.prev && pageNumber !== 1) {
      pageNumber--;
      // newArr = renderFilms.slice(startIdx(), endIdx());
      console.log('pageNumber', pageNumber);
      // filmsItemsMarkup();
      console.log(filmsItemsMarkup());
      main.innerHTML = `<ul class ="film-card__list">${filmsItemsMarkup()}</ul>
      <section class="homepage__pagination">
      <button id="prev" class="homepage__pagination-controller">Prev</button>
      <button class="homepage__pagination-page_indicator">${pageNumber}</button>
      <button id="next" class="homepage__pagination-controller">Next</button>
      </section>`;
      paginationEventListener();
    }
    let maxPageCounter;
    const checkpageCount = () => {
      if (renderFilms.length % 6 !== 0) {
        maxPageCounter = Math.round(renderFilms.length / 6) + 1;
        return maxPageCounter;
      }
      if (renderFilms.length % 6 === 0) {
        maxPageCounter = renderFilms.length / 6;
        return maxPageCounter;
      }
    };
    checkpageCount();

    if (e.target === refs.next && !(pageNumber >= maxPageCounter)) {
      pageNumber++;
      console.log('pageNumber', pageNumber);
      // filmsItemsMarkup();
      console.log(filmsItemsMarkup());
      main.innerHTML = `<ul class ="film-card__list">${filmsItemsMarkup()}</ul>
      <section class="homepage__pagination">
      <button id="prev" class="homepage__pagination-controller">Prev</button>
      <button class="homepage__pagination-page_indicator">${pageNumber}</button>
      <button id="next" class="homepage__pagination-controller">Next</button>
      </section>`;
      paginationEventListener();
    }
  };

  // const main = document.querySelector('#main');

  // main.insertAdjacentHTML(
  //   'afterbegin',
  //   ' <section class="homepage__pagination"><button id="prev" class="homepage__pagination-controller">Prev</button> <button class="homepage__pagination-page_indicator">1</button> <button id="next" class="homepage__pagination-controller">Next</button>  </section>',
  // );
  const paginationEventListener = () => {
    document
      .querySelector('.homepage__pagination')
      .addEventListener('click', handlePaginationClick);
  };
  paginationEventListener();
};

export default createCardFunc;
