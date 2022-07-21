import icons from '../../img/icons.svg';
import { Fraction } from 'fractional';
import view from './view.js';

class RecipeView extends view {
  _parentElement = document.querySelector('.recipe');
  _errorMessage = 'Cant find your recipe please try other one';

  _generateMarkup() {
    return ` <figure class="recipe__fig">
        <img src="${this._data.img}" alt="${
      this._data.title
    }" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${this._data.title}</span>
        </h1>
      </figure>
    
      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href= "${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${
            this._data.cookingTime
          }</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${
            this._data.serving
          }</span>
          <span class="recipe__info-text">servings</span>
    
          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--increase-servings" data-update="${
              this._data.serving - 1
            }">
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny  btn--increase-servings" data-update= "${
              this._data.serving + 1
            }">
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>
    
        <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
        <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
        </div>
        <button class="btn--round">
          <svg class="">
            <use href="${icons}#icon-bookmark${
      this._data.bookmarks ? '-fill' : ''
    }"></use>
          </svg>
        </button>
      </div>
      <div class="recipe__ingredients">
      <h2 class="heading--2">Recipe ingredients</h2>
      <ul class="recipe__ingredient-list">
   
      ${this._data.ingredients.map(this._ingredientMarkup).join('')}
      </ul>
    </div>

     
    
      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${
            this._data.publisher
          }</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${this._data.sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>`;
  }
  _ingredientMarkup(el) {
    return `<li class="recipe__ingredient">
    <svg class="recipe__icon">
      <use href="${icons}#icon-check"></use>
    </svg>
    <div class="recipe__quantity">${
      el.quantity ? new Fraction(el.quantity).toString() : ''
    }</div>
    <div class="recipe__description">
      <span class="recipe__unit">${el.unit}</span>
      ${el.description}
    </div>
  </li>
 `;
  }
  //if use func() mean excute code one time
  addHandlerRenderRecipe(func) {
    ['hashchange', 'load'].forEach(event =>
      window.addEventListener(event, func)
    );
  }

  addHandlerUpdatIng(func) {
    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault();
      const btn = e.target.closest('.btn--increase-servings');
      if (!btn) return;
      const data = btn.dataset.update;
      if (data > 0) func(+data);
    });
  }

  addHandlerBookmark(func) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--round');
      if (!btn) return;
      func();
    });
  }
  // addHandlerUpdateRecipe(func) {
  //   this._parentElement.addEventListener('click', function (e) {
  //     const btnUpdate = e.target.closest('.btn--increase-servings');
  //     if (!btnUpdate) return;
  //     const { update } = btnUpdate.dataset;
  //     if (+update > 0) func(+update);
  //   });
  // }
}

export default new RecipeView();
// //display to ui

// class RecipeView extends view {
//   _parentElement = document.querySelector('.recipe');
//   _errorMessage = 'No recipes found for your search. Please try new one !';

//   _generateMarkup() {
//     return `  <figure class="recipe__fig">
//     <img src="${this._data.imgUrl}" alt="${
//       this._data.title
//     }" class="recipe__img" />
//     <h1 class="recipe__title">
//       <span>${this._data.title}</span>
//     </h1>
//   </figure>

//   <div class="recipe__details">
//     <div class="recipe__info">
//       <svg class="recipe__info-icon">
//         <use href= "${icons}#icon-clock"></use>
//       </svg>
//       <span class="recipe__info-data recipe__info-data--minutes">${
//         this._data.cookingTime
//       }</span>
//       <span class="recipe__info-text">minutes</span>
//     </div>
//     <div class="recipe__info">
//       <svg class="recipe__info-icon">
//         <use href="${icons}#icon-users"></use>
//       </svg>
//       <span class="recipe__info-data recipe__info-data--people">${
//         this._data.serving
//       }</span>
//       <span class="recipe__info-text">servings</span>

//       <div class="recipe__info-buttons">
//         <button class="btn--tiny btn--increase-servings">
//           <svg>
//             <use href="${icons}#icon-minus-circle"></use>
//           </svg>
//         </button>
//         <button class="btn--tiny btn--increase-servings">
//           <svg>
//             <use href="${icons}#icon-plus-circle"></use>
//           </svg>
//         </button>
//       </div>
//     </div>

//     <div class="recipe__user-generated">
//     </div>
//     <button class="btn--round">
//       <svg class="">
//         <use href="${icons}#icon-bookmark-fill"></use>
//       </svg>
//     </button>
//   </div>

//   <div class="recipe__ingredients">
//     <h2 class="heading--2">Recipe ingredients</h2>
//     <ul class="recipe__ingredient-list">
//     ${this._data.ingredients
//       .map(
//         ing => `<li class="recipe__ingredient">
//     <svg class="recipe__icon">
//       <use href="${icons}#icon-check"></use>
//     </svg>
//     <div class="recipe__quantity">${
//       ing.quantity ? new Fraction(ing.quantity).toString() : ''
//     }</div>
//     <div class="recipe__description">
//       <span class="recipe__unit">${ing.unit}</span>
//       ${ing.description}
//     </div>
//   </li>`
//       )
//       .join('')}
//     </ul>
//   </div>

//   <div class="recipe__directions">
//     <h2 class="heading--2">How to cook it</h2>
//     <p class="recipe__directions-text">
//       This recipe was carefully designed and tested by
//       <span class="recipe__publisher">${
//         this._data.publisher
//       }</span>. Please check out
//       directions at their website.
//     </p>
//     <a
//       class="btn--small recipe__btn"
//       href="${this._data.sourceUrl}"
//       target="_blank"
//     >
//       <span>Directions</span>
//       <svg class="search__icon">
//         <use href="${icons}#icon-arrow-right"></use>
//       </svg>
//     </a>
//   </div>
// `;
//   }
// }

// export default new RecipeView();
