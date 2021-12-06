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
const showUniversities = async function (pageNumber, country, query) {
  // reset local storage item "searchTerm" on load
  // window.addEventListener('beforeunload', (e) => {
  window.addEventListener('unload', (e) => {
    localStorage.removeItem('searchTerm');
  });

  if (localStorage.getItem('searchTerm')) {
    query = localStorage.getItem('searchTerm');
  }

  // render spinner until api call is done
  universitiesView.renderSpinner();
  // check if query is true
  if (query !== undefined && query.length > 0) {
    //
    console.log(query !== undefined);
    await model.loadUniversitiesByTerm(query);
    //
    //
    //
    //
    //
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
    //
    //
    return;
  }
  //
  console.log('see', country);
  // check if country exist in local storage
  if (localStorage.getItem('country')) {
    country = localStorage.getItem('country');
    // load universities from model
    await model.loadUniversities(country);
    //
    //
    //
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
  } else {
    country = 'denmark';
    // load universities from model
    await model.loadUniversities(country);
    //
    //
    //
    //
    //
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
  }
  //
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
const initSearch = function (chosenCountry, query) {
  localStorage.setItem('country', chosenCountry);
  localStorage.setItem('searchTerm', query);
  showUniversities(
    1,
    localStorage.getItem('country'),
    localStorage.getItem('searchTerm')
  );
};
searchView.search(initSearch);
//
//
//
