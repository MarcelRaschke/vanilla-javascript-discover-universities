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
    this.chosenCountry = 'all';
    //
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.chosenCountry = e.target.country.value;
      handler(this.chosenCountry);
    });
  }
}

export default new SearchView(document.querySelector('form'));
