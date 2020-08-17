import hbsTemplate from './filmDetails.hbs';
import * as api from '../api/fetchApi';
import * as localStorage from '../services/localStorage';

const refs = {
  filmDetails: document.querySelector('#main'),
  watched: null,
  watchedIcon: null,
  queue: null,
  queueIcon: null,
};

let selectFilm = {};

const pushItemToLocalStorage = key => {
  const list = localStorage.get(key) || [];
  list.push(selectFilm);
  localStorage.set(key, list);
};

const removeItemFromLocalStorage = key => {
  const list = localStorage.get(key);
  const newList = list.filter(({ id }) => selectFilm.id !== id);

  localStorage.set(key, newList);
};

const findById = (list, filmId) => {
  if (!list) {
    return false;
  }
  return list.find(({ id }) => id === filmId);
};

const monitorButtonStatusText = id => {
  refs.watched = document.querySelector('.watched');
  refs.watchedIcon = document.querySelector('.film-icon-watched');
  refs.watchedButton = document.querySelector('.watched-button');

  const watchedList = localStorage.get('filmsWatched');
  const watched = findById(watchedList, id);

  if (watched) {
    refs.watched.innerHTML = 'Remove from watched';
    refs.watchedIcon.innerHTML = 'videocam_off';
    refs.watchedButton.name = 'remove';
  }

  const toggleWatched = () => {
    if (refs.watchedButton.name === 'add') {
      refs.watched.innerHTML = 'Remove from watched';
      refs.watchedIcon.innerHTML = 'videocam_off';
      refs.watchedButton.name = 'remove';
      pushItemToLocalStorage('filmsWatched');
    } else {
      refs.watched.innerHTML = 'Add to watched';
      refs.watchedIcon.innerHTML = 'videocam';
      refs.watchedButton.name = 'add';
      removeItemFromLocalStorage('filmsWatched');
    }
  };

  refs.watchedButton.addEventListener('click', toggleWatched);

  refs.queue = document.querySelector('.queue');
  refs.queueIcon = document.querySelector('.film-icon-queue');
  refs.queueButton = document.querySelector('.queue-button');

  const queueList = localStorage.get('filmsQueue');
  const queue = findById(queueList, id);

  if (queue) {
    refs.queue.innerHTML = 'Remove from queue';
    refs.queueIcon.innerHTML = 'event_busy';
    refs.queueButton.name = 'remove';
  }

  const toggleQueue = () => {
    if (refs.queueButton.name === 'add') {
      refs.queue.innerHTML = 'Remove from queue';
      refs.queueIcon.innerHTML = 'videocam_off';
      refs.queueButton.name = 'remove';
      pushItemToLocalStorage('filmsQueue');
    } else {
      refs.queue.innerHTML = 'Add to queue';
      refs.queueIcon.innerHTML = 'videocam';
      refs.queueButton.name = 'add';
      removeItemFromLocalStorage('filmsQueue');
    }
  };

  refs.queueButton.addEventListener('click', toggleQueue);
};

const activeDetailsPage = async (id, isLibraryFilm) => {
  if (!isLibraryFilm) {
    selectFilm = await getFilmDetails(id);
  }

  showDetails(selectFilm);
};

const showDetails = selectFilm => {
  const markup = hbsTemplate(selectFilm);

  refs.filmDetails.innerHTML = markup;

  console.log(selectFilm.id);

  monitorButtonStatusText(selectFilm.id);
};

const getFilmDetails = async filmId => {
  try {
    const film = await api.getFilmDetailsByID(filmId);

    const year = film.data.release_date.split('-').slice(0, 1).toString();
    const genres = film.data.genres.map(({ name }) => name).join(', ');
    const backdrop_path = film.data.backdrop_path
      ? film.data.backdrop_path
      : film.data.poster_path;

    const {
      poster_path,
      title,
      vote_average,
      vote_count,
      popularity,
      original_title,
      overview,
      id,
    } = film.data;

    return {
      poster_path,
      title,
      vote_average,
      vote_count,
      popularity,
      original_title,
      overview,
      genres,
      year,
      backdrop_path,
      id,
    };
  } catch (err) {
    console.log(err);
  }
};

export default activeDetailsPage;
