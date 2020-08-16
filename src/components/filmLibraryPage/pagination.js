// import refs from './refs';

let renderFilms = [];
let genres = [];
let pageNumber = 1;

// console.log('refs.pagination', refs.pagination);
const handlePaginationClick = e => {
  const refs = {
    pagination: document.querySelector('.homepage__pagination'),
    prev: document.querySelector('#prev'),
    next: document.querySelector('#next'),
  };
  console.log('renderFilms', renderFilms);
  console.log('pageNumber', pageNumber);
  //   const innetPagination = 1;

  console.log('e.target', e.target);
  console.log('refs.pagination', refs.pagination);
  console.log('refs.prev', refs.prev);
  console.log('refs.next', refs.next);
  console.log(e.target === refs.prev);
  console.log(e.target === refs.next);
};

export const paginationEventListener = () => {
  document
    .querySelector('.homepage__pagination')
    .addEventListener('click', handlePaginationClick);
};

// const startIdx = () => {
//   if (pageNumber > 1) {
//   }
// };
// let endIdx = 6;
// const innerArr = renderFilms.slice(startIdx, endIdx);
// console.log('innerArr', innerArr);
// console.log('totalNumberOfPages', Math.round(renderFilms.length / 6));
