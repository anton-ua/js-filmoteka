import './styles/normalize.scss';
import './styles/styles.scss';
import './components/header/header';
import './components/header/homePageList/2searchAndPlaginationHomePage';

import './components/filmLibraryPage/libraryPage';
import './components/header/header';
import './components/footer/footer';
import './components/homePage/homePage';
// import './components/filmDetails/filmDetails';

import './main';
import createCardFunc from './components/filmLibraryPage/initialHomePage.js';
import {
  paginationEventListener,
  listener,
} from './components/filmLibraryPage/pagination.js';
createCardFunc();
// paginationEventListener();
// listener();
