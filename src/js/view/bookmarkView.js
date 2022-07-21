import view from './view.js';
import previewView from './previewView.js';
class Bookmark extends view {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmark yet Find nice recipe and bookmark it :)';

  // bookmarkview call render method it will set data to bookmarkview then will call generatemarkuup method
  //todo call this method
  _generateMarkup() {
    //use child class preview to generate markup
    // set previewView to this._data
    // then we can use this keyword into recipeview
    // return string to generate markup   // todo set render to false to return markup string
    //generate markup equal to data that we fetch to
    //return htmlmarkup
    return this._data.map(data => previewView.render(data, false)).join('');
  }
  addLoad(func) {
    window.addEventListener('load', func);
  }
}

export default new Bookmark();
