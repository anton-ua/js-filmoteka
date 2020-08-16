import {getMostPopularFilms} from '../../services';
import template from './homePageList.hbs'

let inputVaue = '';

const refs = {
  filmList: document.querySelector(".homePageList"),
  form: document.querySelector("#form")
};

function fetchFilms() {
  getMostPopularFilms()
  .then(data => {
    const renderToHtml = data.data.results    
    .map(elem => {
      
        return template(elem);
      })
      .join("");

    refs.filmList.insertAdjacentHTML("beforeend", renderToHtml);
    })
  .catch(error => console.error(error));
};



fetchFilms()