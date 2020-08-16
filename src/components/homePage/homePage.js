import hbsTemplate from './homePage.hbs';
import * as api from '../api/fetchApi';

const home = document.querySelector('#main');

const fetchFilmsList = async () => {
  const list = await api.getMostPopularFilms();

  const { results } = list.data;

  const newList = results.map(
    ({ poster_path, title, vote_average, id, release_date }) => {
      const year = release_date.split('-').slice(0, 1).toString();

      return { poster_path, title, vote_average, id, year };
    },
  );

  return newList;
};

const renderMarkup = async () => {
  const list = await fetchFilmsList();

  const markup = hbsTemplate(list);

  home.insertAdjacentHTML('afterbegin', markup);

  document.querySelectorAll('.card-film__item').forEach(card =>
    card.addEventListener('click', e => {
      e.preventDefault();
      const { value } = e.currentTarget;
      window['router'].navigate(`/film/${value}`);
    }),
  );

  // console.log(filmsListRef);

  // filmsListRef.addEventListener('click', e => {
  //   e.preventDefault();
  //   console.dir(e.currentTarget);
  // });
};

renderMarkup();

export default renderMarkup;

// fetchFilmsList();
