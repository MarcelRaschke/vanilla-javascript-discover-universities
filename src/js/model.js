import { UNIVERSITY_BY_NAME_API_URL } from './config.js';
import { UNIVERSITY_BY_COUNTRY_API_URL } from './config.js';
import { RESULTS_PER_PAGE } from './config.js';
// live connection between below state and imported state to controller
// so when below state updates, the state in controller also updates
export const state = {
  university: '',
  search: {
    query: '',
    universities: [],
    currentPage: 1,
    numberOfPages: 0,
    universitiesPerPage: RESULTS_PER_PAGE,
  },
};
//
// loadUniversity
export const loadUniversity = async function (id) {
  try {
    const responseUniversity = await fetch(
      `${UNIVERSITY_BY_NAME_API_URL}${id}`
    );
    // check if status is ok if not throw and error
    if (responseUniversity.ok === true) {
      const [data] = await responseUniversity.json();

      // filter and save relevant data
      let universityData = {
        name: data.name,
        country: data.country,
        website: data.domains[0],
      };
      // save filtered data in state.university object
      state.university = universityData;
      //
    } else {
      throw new Error('University not found:', responseUniversity.message);
    }
  } catch (error) {
    console.log('Found a server error:', error.message);
  }
};
//
//
//
// loadUniversities by country
export const loadUniversities = async function (country) {
  try {
    const responseUniversities = await fetch(
      `${UNIVERSITY_BY_COUNTRY_API_URL}${country}`
    );

    // check if status is ok if not throw and error
    if (responseUniversities.ok === true) {
      const data = await responseUniversities.json();

      // save filtered universities in state.universities object
      state.search.universities = data.map((university) => {
        return {
          name: university.name,
          country: university.country,
          website: university.domains[0],
        };
      });

      // calculate number of pages
      state.search.numberOfPages = Math.ceil(
        state.search.universities.length / state.search.universitiesPerPage
      );

      // check for server error
    } else {
      throw new Error('Universities not found:', responseUniversities.message);
    }
  } catch (error) {
    console.log('Found a server error:', error.message);
  }
};
//
//
//
//
// loadUniversities by search term
export const loadUniversitiesByTerm = async function (query) {
  try {
    const responseUniversities = await fetch(
      `${UNIVERSITY_BY_NAME_API_URL}${query}`
    );
    // check if status is ok if not throw and error
    if (responseUniversities.ok === true) {
      const data = await responseUniversities.json();

      // save filtered universities in state.universities object
      state.search.universities = data.map((university) => {
        return {
          name: university.name,
          country: university.country,
          website: university.domains[0],
        };
      });

      // calculate number of pages
      state.search.numberOfPages = Math.ceil(
        state.search.universities.length / state.search.universitiesPerPage
      );
      // check for server error
    } else {
      throw new Error('Universities not found:', responseUniversities.message);
    }
  } catch (error) {
    console.log('Found a server error:', error.message);
  }
};
//

export const getSearchResultsPage = function (page = state.search.currentPage) {
  // save current page number
  state.search.currentPage = page;
  // calculate first and last page
  const start = (page - 1) * state.search.universitiesPerPage;
  const end = page * state.search.universitiesPerPage;
  return state.search.universities.slice(start, end);
};
