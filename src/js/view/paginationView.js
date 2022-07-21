import View from './view.js';
import icons from '../../img/icons.svg';
import { isGeneratorFunction } from 'regenerator-runtime';

class Pagination extends View {
  _parentElement = document.querySelector('.pagination');

  _leftBtn(currentPage) {
    return `<button class="btn--inline pagination__btn--prev" data-click="${
      currentPage - 1
    }">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${currentPage - 1}</span>
  </button>`;
  }

  _rightBtn(currentPage) {
    return `<button class="btn--inline pagination__btn--next" data-click="${
      currentPage + 1
    }">
    <span>Page ${currentPage + 1}</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
  </button> `;
  }
  addHandlerClick(func) {
    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault();
      const target = e.target.closest('.btn--inline');
      if (!target) return;
      const data = +target.dataset.click;
      func(data);
    });
  }
  _generateMarkup() {
    const currentPage = this._data.page;

    //cal all data how many page have
    const amountPage = Math.ceil(
      this._data.recipe.length / this._data.maxPerPage
    );
    //next page
    if (currentPage === 1 && amountPage > 1) return this._rightBtn(currentPage);
    //last page
    if (currentPage === amountPage && amountPage > 1)
      return this._leftBtn(currentPage);
    //2 page
    if (currentPage < amountPage)
      return `${this._leftBtn(currentPage)}${this._rightBtn(currentPage)}`;

    return '';
    // no other page
  }
}

export default new Pagination();

// class Pagination extends View {
//   _parentElement = document.querySelector('.pagination');

//   addHandlerClick(func) {
//     this._parentElement.addEventListener('click', function (e) {
//       e.preventDefault();
//       //closest can be loop up and down
//       const data = e.target.closest('.btn--inline');
//       if (!data) return;
//       const dataGoto = +data.dataset.goto;

//       func(dataGoto);
//     });
//   }

//   _generateMarkupNext(currentPage) {
//     return `<button data-goto="${
//       currentPage + 1
//     }" class="btn--inline pagination__btn--next">
//     <span>Page ${currentPage + 1}</span>
//     <svg class="search__icon">
//       <use href="${icons}#icon-arrow-right"></use>
//     </svg>
//   </button>`;
//   }

//   _generateMarkupPrev(currentPage) {
//     return `<button data-goto="${
//       currentPage - 1
//     }" class="btn--inline pagination__btn--prev">
//     <svg class="search__icon">
//       <use href="${icons}#icon-arrow-left"></use>
//     </svg>
//     <span>Page ${currentPage - 1}</span>
//   </button>`;
//   }
//   _generateMarkup() {
//     const currentPage = this._data.page;
//     //cal number of page
//     const numPage = Math.ceil(
//       this._data.result.length / this._data.resultsPerPage
//     );
//     //first page and other
//     if (currentPage === 1 && numPage > 1) {
//       return this._generateMarkupNext(currentPage);
//     }
//     //last page
//     if (currentPage === numPage && numPage > 1) {
//       return this._generateMarkupPrev(currentPage);
//     }
//     //other page
//     // read หน้าปัจจุบัน น้อยกว่า หน้าทั้งหมด
//     if (currentPage < numPage) {
//       return `${this._generateMarkupPrev(
//         currentPage
//       )}${this._generateMarkupNext(currentPage)}`;
//     }

//     return '';
//     //no other
//   }
// }

// export default new Pagination();
