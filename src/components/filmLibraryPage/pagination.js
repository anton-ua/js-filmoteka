let renderFilms = [];
let genres = [];
let pageNumber = 1;

const refs = {
  pagination: document.querySelector('.homepage__pagination'),
  prev: document.querySelector('#prev'),
  next: document.querySelector('#next'),
};

const handlePaginationClick = e => {
  console.log('refs.pagination', refs.pagination);
  console.log('refs.prev', refs.prev);
  console.log('refs.next', refs.next);

  console.log(e.target === refs.prev);
  console.log(e.target === refs.next);

  // if()
};

export const paginationEventListener = refs.pagination.addEventListener(
  'click',
  handlePaginationClick(),
);

let startIdx = () => {
  if (pageNumber > 1) {
  }
};
let endIdx = 6;
const innerArr = renderFilms.slice(startIdx, endIdx);
console.log('innerArr', innerArr);
console.log('totalNumberOfPages', Math.round(renderFilms.length / 6));
