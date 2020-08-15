import './styles/normalize.scss';
import './styles/styles.scss';

import './components/filmLibraryPage/libraryPage';
import './components/header/header';
import './components/footer/footer';
import './components/filmDetails/filmDetails';

import './main';
import createCardFunc from './components/filmLibraryPage/initialHomePage.js';
import { paginationEventListener } from './components/filmLibraryPage/pagination.js';
createCardFunc();
paginationEventListener();
