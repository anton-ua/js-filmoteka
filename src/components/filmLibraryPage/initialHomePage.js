'use strict';
import {
  getFilmGenres,
  getMostPopularFilms,
  getFilmsByUsersQuery,
} from '../../api/fetchApi';
import libraryPage from './libraryPage.hbs';

const main = document.querySelector('#main');
let maxPageCounter;
let renderFilms = [];
let genres = [];
let pageNumber = 1;

const createCardFunc = async (query = null) => {
  if (query === null) {
    const filmsReqResult = await getMostPopularFilms();
    renderFilms = [...renderFilms, ...filmsReqResult.data.results];
    // console.log('renderFilms', renderFilms);
    const genresReqResult = await getFilmGenres();
    genres = [...genresReqResult.data.genres];
  }
  // console.log('pageNumber', pageNumber);

  const refs = {
    filmList: document.querySelector('.film-card__list'),
    form: document.querySelector('.searchForm'),
    input: document.querySelector('.searchInput'),
  };

  const searchFilmsHandler = async e => {
    e.preventDefault();
    query = e.target.elements[0].value;
    // console.log('query2', query);
    const films = await getFilmsByUsersQuery(query, pageNumber);
    renderFilms = [...films.data.results];
    // genres = await getFilmGenres();
    main.innerHTML = `<ul class ="film-card__list">${filmsItemsMarkup()}</ul>
    <section class="homepage__pagination">
    <button id="prev" class="homepage__pagination-controller">Prev</button>
    <button class="homepage__pagination-page_indicator">${pageNumber}</button>
    <button id="next" class="homepage__pagination-controller">Next</button>
    </section>`;
    paginationEventListener();
  };
  refs.form.addEventListener('submit', searchFilmsHandler);

  // console.log('renderFilms222', renderFilms);
  let newArr = [];
  const startIdx = () => {
    if (pageNumber === 1) {
      // console.log('startIdx1', 'work');

      return 0;
    }
    if (pageNumber !== 1) {
      // console.log('pageNumber - 1 * 6', (pageNumber - 1) * 6);
      // console.log('startIdx2', 'work');
      return (pageNumber - 1) * 6;
    }
  };

  const endIdx = () => {
    if (pageNumber === 1) {
      // console.log('endIdx1', 'work');

      return 6;
    }
    if (pageNumber !== 1) {
      // console.log('endIdx2', 'work');
      return pageNumber * 6;
    }
  };
  // console.log('newArr2', newArr);

  const filmsItemsMarkup = () => {
    if (pageNumber === 1) newArr = renderFilms.slice(startIdx(), endIdx());

    if (pageNumber > 1) newArr = renderFilms.slice(startIdx(), endIdx());

    console.log(newArr);

    return newArr
      .map(
        ({
          name,
          original_name,
          title,
          original_title,
          vote_average,
          backdrop_path,
          poster_path,
          id,
          release_date,
        }) => {
          let film_title = name || original_name || title || original_title;
          const year = release_date
            ? release_date.split('-').slice(0, 1).toString()
            : '';

          const markup = libraryPage({
            vote_average,
            backdrop_path,
            poster_path,
            film_title,
            id,
            year,
          });
          return markup;
        },
      )
      .join('\n');
  };

  const insertToDom = () => {
    const markup = filmsItemsMarkup();

    main.innerHTML = `<ul class ="film-card__list">${markup}</ul>
    <section class="homepage__pagination">
    <button id="prev" class="homepage__pagination-controller">Prev</button>
    <button class="homepage__pagination-page_indicator">${pageNumber}</button>
    <button id="next" class="homepage__pagination-controller">Next</button>
    </section>`;

    addEventLinstenerForFilm();
  };

  insertToDom();

  const handlePaginationClick = async e => {
    const refs = {
      pagination: document.querySelector('.homepage__pagination'),
      prev: document.querySelector('#prev'),
      next: document.querySelector('#next'),
    };

    if (e.target === refs.prev && pageNumber !== 1) {
      pageNumber--;
      insertToDom();
      paginationEventListener();
    }
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

      insertToDom();
      paginationEventListener();
    }
    if (e.target === refs.next && pageNumber % 3 === 0) {
      const filmsReqResult = await getFilmsByUsersQuery(query, pageNumber);
      renderFilms = [...renderFilms, ...filmsReqResult.data.results];
      console.log('renderFilms0000000000', renderFilms);
      paginationEventListener();
    }
  };

  const paginationEventListener = () => {
    document
      .querySelector('.homepage__pagination')
      .addEventListener('click', handlePaginationClick);
  };
  paginationEventListener();
};

const addEventLinstenerForFilm = () => {
  document.querySelectorAll('.film-card__item').forEach(card =>
    card.addEventListener('click', e => {
      e.preventDefault();
      console.log(e.currentTarget);
      const { value } = e.currentTarget;
      window['router'].navigate(`/film/${value}`);
    }),
  );
};

export default createCardFunc;
