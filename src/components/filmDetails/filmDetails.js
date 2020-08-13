import { refs } from './refs';
import filmDetailsTemplate from './film-details-template.hbs';
import imgSrc from '../../img/poster.jpg';
console.log('refs', refs);
console.log('filmDetailsTemplate', filmDetailsTemplate);
export function drawFilmDetailsMurkup() {
  // const filmDetailsMarkup = filmDetailsTemplate(imgSrc).join('\n');
  const filmDetailsMarkup = filmDetailsTemplate();
  console.log(filmDetailsMarkup);
  return (refs.main.innerHTML = filmDetailsMarkup);
}
