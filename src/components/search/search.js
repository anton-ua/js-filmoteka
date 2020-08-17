import hbsTemplateSearch from './search.hbs';

const renderSearchBar = () => {
  const markup = hbsTemplateSearch();

  const search = document.querySelector('#search');

  search.innerHTML = markup;
};

export default renderSearchBar;
