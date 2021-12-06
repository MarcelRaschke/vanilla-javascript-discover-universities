//
//
//
//
//
//
class SearchView {
  constructor(form) {
    this.form = form;
  }
  search(handler) {
    //
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.chosenCountry = e.target.country.value;
      this.query = e.target.query.value;
      this.query = this.query.trim().replace(/\s/g, '+').toLowerCase();
      handler(this.chosenCountry, this.query);
    });
  }
}

export default new SearchView(document.querySelector('form'));
