// class SearchView {
//   #form = document.querySelector('.search');

import View from './view.js';

//   getQuery() {
//     return this.#form.querySelector('.search__field').value;
//   }
//   addHandlerSearch(func) {
//     this.#form.addEventListener('submit', function (e) {
//       e.preventDefault();
//       func();
//     });
//   }
//   clearField() {
//     this.#form.querySelector('.search__field').value = '';
//     // this.#form.querySelector('.search__field').blur();
//   }
// }
// export default new SearchView();

class SearchResult extends View {
  _formSubmit = document.querySelector('.search');
  _input = document.querySelector('.search__field');

  getSearchValue() {
    return this._input.value;
  }
  //already fill function
  addHandlerSubmit(func) {
    this._formSubmit.addEventListener('submit', function (e) {
      e.preventDefault();
      func();
    });
  }
  clearField() {
    this._input.value = '';
    this._input.blur();
  }
}

export default new SearchResult();
