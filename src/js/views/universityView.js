//
//
//
//
class RenderUniversity {
  constructor(universityContainer) {
    this.universityContainer = universityContainer;
  }
  // render university data in DOM
  renderData(universityDataFromController) {
    // render and call markup function
    this.universityContainer.innerHTML = this.markup(
      universityDataFromController
    );
  }
  // markup for university
  markup(data) {
    const html = `
	<div class="the-university">
	<h2>${data.name}</h2>
	<h3>${data.country}</h3>
	<p>${data.website}</p>
	</div>
	`;
    return html;
  }
  //
  // render spinner in DOM
  renderSpinner() {
    // render and call markup function
    this.universityContainer.innerHTML = this.loadingMarkup();
  }

  // loading spinner
  loadingMarkup() {
    const html = `
	<div class="spinner-container">
	<div class="loader"></div>
	</div>
	`;
    return html;
  }

  addHandlerRender(handler) {
    window.addEventListener('hashchange', handler);
  }
}

//
export default new RenderUniversity(
  document.querySelector('.single-university')
);
