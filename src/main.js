import { Router } from './components/router/router';

window['router'] = new Router({
  root: '/',
  routes: [
    {
      path: /feed\/(.*)/,
      callback: id => {
        console.log(id);
      },
    },
    {
      path: /about/,
      callback: () => {},
    },
  ],
});

console.log(window['router']);

// window['router'].navigate();

console.log(document);

const add = document.querySelector('.add');

console.dir(add);

// const home = document.querySelector('.');

add.addEventListener('click', e => {
  e.preventDefault();
  window['router'].navigate('/about');
});

// add.addEventListener('click', e => {
//   e.preventDefault();
//   window['router'].navigate('/');
// });
