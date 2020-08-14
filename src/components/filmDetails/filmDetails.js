import hbsTemplate from './filmDetails.hbs';
import * as api from '../api/fetchApi';

const filmDetailsRef = document.querySelector('#main');

const filmDetails = async id => {
  try {
    const film = await api.getFilmDetailsByID(id);

    const year = film.data.release_date.split('-').slice(0, 1);
    const genres = film.data.genres.map(({ name }) => name).join(', ');
    const {
      poster_path,
      title,
      vote_average,
      vote_count,
      popularity,
      original_title,
      overview,
    } = film.data;

    const markup = hbsTemplate({
      poster_path,
      title,
      vote_average,
      vote_count,
      popularity,
      original_title,
      overview,
      genres,
      year,
    });
    filmDetailsRef.innerHTML = markup;
    // filmDetailsRef.insertAdjacentHTML('afterbegin', markup);
  } catch (err) {
    console.log(err);
  }
};

export default filmDetails;
