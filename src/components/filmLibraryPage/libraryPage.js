import hbsTemplate from './libraryPage.hbs';
import * as localStorage from '../services/localStorage';

const ref = document.querySelector('#main');

const renderMarkup = key => {
  const list = localStorage.get(key);

  console.log(list);

  const markup = hbsTemplate(list);

  ref.innerHTML = markup;

  document.querySelectorAll('.card-film__item').forEach(card =>
    card.addEventListener('click', e => {
      e.preventDefault();
      const { name } = e.currentTarget;
      window['router'].navigate(`/film/${name}`);
    }),
  );
};

export default renderMarkup;
