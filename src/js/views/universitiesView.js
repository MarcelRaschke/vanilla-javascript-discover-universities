class RenderUniversitiesView {
  constructor(modulesContainer) {
    this.modulesContainer = modulesContainer;
  }
  // render universities in DOM
  renderUniversities(universitiesData) {
    this.modulesContainer.innerHTML = '';
    // once for each
    universitiesData.forEach((university) => {
      this.modulesContainer.insertAdjacentHTML(
        'beforeend',
        this.markup(university)
      );
    });
  }

  // universities markup
  markup(university) {
    // university hash
    const universityHashId = university.name
      .trim()
      .replace(/\s/g, '+')
      .toLowerCase();

    // markup
    const html = `
    <a href="#${universityHashId}" class="university-link">
    <div class="module">
      <h4>${university.name}</h4>
      <h4>${university.country}</h4>
      <p>${university.website}</p>
    </div>
  </a>
    `;
    return html;
  }
  // render spinner in DOM
  renderSpinner() {
    // render and call markup function
    this.modulesContainer.innerHTML = this.loadingMarkup();
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
}

export default new RenderUniversitiesView(document.querySelector('.modules'));
