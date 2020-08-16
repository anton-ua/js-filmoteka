import {getFilmsByUsersQuery} from '../../services';
import template from './homePageList.hbs';

const refs = {
  filmList: document.querySelector(".homePageList"),
  form: document.querySelector(".searchForm"),
  input: document.querySelector('.searchInput')
};


const searchFilms = e => {  
  e.preventDefault();
 let inputCurrentValue = (e.target.elements[0].value)

  getFilmsByUsersQuery(inputCurrentValue, 1)
    .then(data => {
      const renderToHtml = data.data.results
        .map(elem => {
          return template(elem);
        })
        .join("");
      refs.filmList.innerHTML = renderToHtml;

    })
    .catch(error => console.error(error));
};

refs.form.addEventListener("submit", searchFilms);