import hbsTemplateHeaderList from '../homePageList/homePageList.hbs';


const markup = hbsTemplateHeaderList();

const homePageList = document.querySelector('.homePageList');

homePageList.insertAdjacentHTML('afterBegin', markup);