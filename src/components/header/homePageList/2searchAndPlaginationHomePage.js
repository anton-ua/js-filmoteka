import { getFilmsByUsersQuery } from '../../services';
import template from './homePageList.hbs';

const refs = {
  filmList: document.querySelector('.film-card__list'),
  form: document.querySelector('.searchForm'),
  input: document.querySelector('.searchInput'),
};

const searchFilms = async e => {
  e.preventDefault();
  let inputCurrentValue = e.target.elements[0].value;

  const films = await getFilmsByUsersQuery(inputCurrentValue, 1);
  
    // .then(data => {
    //   const renderToHtml = data.data.results
    //     .map(elem => {
    //       return template(elem);
    //     })
    //     .join('\n');
    //   refs.filmList.innerHTML = renderToHtml;
    // })
    // .catch(error => console.error(error));
};

refs.form.addEventListener('submit', searchFilms);
