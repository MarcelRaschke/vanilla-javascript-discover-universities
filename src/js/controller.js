import * as model from './model.js';
import renderUniversity from './views/universityView.js';
import renderUniversitiesView from './views/universitiesView.js';
import paginationView from './views/paginationView.js';
import universitiesView from './views/universitiesView.js';
import searchView from './views/searchView.js';

const showUniversity = async function () {
  // getting hash-id
  const hashId = window.location.hash.slice(1);
  // if hash-id is empty return
  if (hashId === '') {
    return;
  }
  // render spinner until api call is done
  renderUniversity.renderSpinner();

  // invoking load university function in model.js with hash id
  await model.loadUniversity(hashId);

  // university data and render into DOM in universityView.js
  renderUniversity.renderData(model.state.university);
};
showUniversity();
//
//
//
const init = function () {
  // render when hashchange and website load
  renderUniversity.addHandlerRender(showUniversity);
};
init();
//
//
//
//
// load universities
const showUniversities = async function (
  pageNumber,
  country = localStorage.getItem('country')
) {
  // render spinner until api call is done
  universitiesView.renderSpinner();

  // load universities from model
  await model.loadUniversities(country);

  // console.log('see this one', model.getSearchResultsPage(pageNumber));

  // call render universities view with universities data as input and page number
  // renderUniversitiesView.renderUniversities(model.state.search.universities);
  renderUniversitiesView.renderUniversities(
    model.getSearchResultsPage(pageNumber)
  );
  //
  // render pagination in pagination view. input number of pages and current page
  paginationView.renderPagination(
    model.state.search.numberOfPages,
    model.state.search.currentPage
  );
};
showUniversities();
//
//
//
// invoke below function every time a page number is clicked
const initPageNumber = function (pageNumber) {
  // load universities
  showUniversities(pageNumber);
};
// clicked page number
paginationView.clickedPage(initPageNumber);
//
//
//
//
//
// search view
const initSearch = function (chosenCountry) {
  localStorage.setItem('country', chosenCountry);
  showUniversities(1, localStorage.getItem('country'));
};
searchView.search(initSearch);
