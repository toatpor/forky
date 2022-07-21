import View from './view.js';

class uploadViw extends View {
  constructor() {
    super();
    this._addHandlerOpenModal();
    this._addHandlerCloseModal();
  }
  _message = 'Your recipe have success fully upload';
  _parentElement = document.querySelector('.upload');
  _overlay = document.querySelector('.overlay');
  _recipeWindow = document.querySelector('.add-recipe-window');
  _btnAddRecipe = document.querySelector('.nav__btn--add-recipe');
  _btnCloseModal = document.querySelector('.btn--close-modal');

  _openCloseModal() {
    this._overlay.classList.toggle('hidden');
    this._recipeWindow.classList.toggle('hidden');
  }
  _addHandlerOpenModal() {
    this._btnAddRecipe.addEventListener(
      'click',
      this._openCloseModal.bind(this)
    );
  }
  _addHandlerCloseModal() {
    this._overlay.addEventListener('click', this._openCloseModal.bind(this));
    this._btnCloseModal.addEventListener(
      'click',
      this._openCloseModal.bind(this)
    );
  }

  addHandlerSubmitForm(func) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      // getting value and name from form return entrie array
      // inside handeler function this keyword will point to form
      const formData = [...new FormData(this)];
      // convert array entrie to object
      const data = Object.fromEntries(formData);
      func(data);
    });
  }
}

export default new uploadViw();
