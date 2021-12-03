//
export class PaginationView {
  constructor(paginationContainer) {
    this.paginationContainer = paginationContainer;
  }
  // check for click on page number
  clickedPage(handler) {
    this.clickedPageNumber;
    this.paginationContainer.addEventListener('click', (e) => {
      if (e.target.closest('.page') === null) {
        return;
      } else {
        this.clickedPageNumber = +e.target.closest('.page').textContent;
        handler(this.clickedPageNumber);
      }
    });
  }

  renderPagination(numberOfPages, currentPage) {
    this.paginationContainer.innerHTML = this.markup(
      numberOfPages,
      currentPage
    );
  }

  markup(numberOfPages, currentPage) {
    let html = '';
    //
    for (let i = 1; i <= numberOfPages; i++) {
      html += `
	  <div class="page ${i === currentPage ? 'current-page' : ''}">${i}</div>
	  `;
    }
    return html;
  }
}

export default new PaginationView(document.querySelector('.pagination'));
