//
export class PaginationView {
  constructor(paginationContainer) {
    this.paginationContainer = paginationContainer;
  }
  // check for click on page number
  clickedPage(handler) {
    this.clickedPageNumber;
    this.paginationContainer.addEventListener('mousedown', (e) => {
      if (e.target.closest('.page') === null) {
        return;
      } else {
        this.clickedPageNumber = +e.target
          .closest('.page')
          .getAttribute('data-page-number');
        handler(this.clickedPageNumber);
      }
    });
  }
  // render pagination
  renderPagination(numberOfPages, currentPage) {
    this.paginationContainer.innerHTML = this.markup(
      numberOfPages,
      currentPage
    );
  }

  // markup
  markup(numberOfPages, currentPage) {
    let html = '';
    //
    for (let i = 1; i <= numberOfPages; i++) {
      html += `
	  <div class="page${
      i === currentPage ? ' current-page' : ''
    }" data-page-number="${i}"><p>${i}</p></div>
	  `;
    }
    return html;
  }
}

export default new PaginationView(document.querySelector('.pagination'));
