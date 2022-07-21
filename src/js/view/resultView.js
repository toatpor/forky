import view from './view.js';
import previewView from './previewView.js';
class resultView extends view {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'Please check your recipe';

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new resultView();
// class resultView extends View {
//   _parentElement = document.querySelector('.results');
//   _errorMessage = `cant't find your recipe in your query`;

//   //loop for all data
//   _generateMarkupPreview(el) {
//     // console.log(el);
//     //object inside data that we pass in to map method
//     return `<li class="preview">
//     <a class="preview__link preview__link--active" href="#${el.id}">
//       <figure class="preview__fig">
//         <img src="${el.imgUrl}" alt="${el.title}" />
//       </figure>
//       <div class="preview__data">
//         <h4 class="preview__title">${el.title}</h4>
//         <p class="preview__publisher">${el.publisher}</p>
//       </div>
//     </a>
//   </li>`;
//   }
//   _generateMarkup() {
//     // console.log(this._data);
//     //read loop over array for create html markup insert to html
//     //print result of searching api
//     return this._data.map(this._generateMarkupPreview).join('');
//   }
// }

// export default new resultView();
