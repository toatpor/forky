import { mark } from 'regenerator-runtime';
import icons from '../../img/icons.svg';
export default class View {
  _data;
  //check any markup html is not same content the update and render agin not start with api
  update(data) {
    this._data = data;
    const markup = this._generateMarkup();
    const createDom = document.createRange().createContextualFragment(markup);
    const newElement = Array.from(createDom.querySelectorAll('*'));
    const curElement = Array.from(this._parentElement.querySelectorAll('*'));

    newElement.forEach((el, i) => {
      const cureEl = curElement[i];
      //check node is not equal and content then inside elemnt is not same  then return
      if (!el.isEqualNode(cureEl) && el.firstChild?.nodeValue.trim() !== '') {
        cureEl.textContent = el.textContent;
      }
      if (!el.isEqualNode(cureEl)) {
        Array.from(el.attributes).forEach(attr =>
          cureEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }
  // update(data) {
  //   this._data = data;
  //   const markup = this._generateMarkup();
  //   //convert string to real dom object  living in the memory
  //   //dom that not use in our page
  //   // create dom element that not in our page new one
  //   const newDom = document.createRange().createContextualFragment(markup);
  //   // select all element in container recipe and compare to current on our page
  //   const newELement = newDom.querySelectorAll('*');
  //   const curDom = this._parentElement.querySelectorAll('*');
  //   curDom.forEach((cur, i) => {
  //     const newE = newELement[i];
  //     //if newElement not equal to curElement and newElement content not empty
  //     if (!newE.isEqualNode(cur) && newE.firstChild.nodeValue.trim() !== '') {
  //       cur.textContent = newE.textContent;
  //     }
  //     if (!newE.isEqualNode(cur)) {
  //       //set attribute of data that change in dom element
  //       Array.from(newE.attributes).forEach(attr => {
  //         cur.setAttribute(attr.name, attr.value);
  //       });
  //     }
  //   });
  // }
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    //return string if render is false but not insert to parentelement
    // need to return htmlMarkup
    if (!render) return markup;
    // console.log(this._data);
    this._clearHtml();
    this._parentElement.insertAdjacentHTML('beforeend', markup);
  }

  _clearHtml() {
    this._parentElement.innerHTML = '';
  }
  renderSpin() {
    const markup = `<div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
    </div>
    `;
    this._clearHtml();
    this._parentElement.insertAdjacentHTML('beforeend', markup);
  }

  renderError(error = this._errorMessage) {
    const markup = `<div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${error}</p>
  </div>`;
    this._clearHtml();
    this._parentElement.insertAdjacentHTML('beforeend', markup);
  }

  renderMessage(message = this._message) {
    const markup = `<div class="message">
    <div>
      <svg>
        <use href="${icons}#icon-smile"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>`;
    this._clearHtml();
    this._parentElement.insertAdjacentHTML('beforeend', markup);
  }
}

// export default class View {
//   _data;
//   render(data) {
//     //if no data or data is array and array.lenth = 0 then return
//     //ถ้ามีข้อมูล ไปเช้็คที่ or
//     if (!data || (!Array.isArray(data) && data.length === 0))
//       return this.renderError();
//     this._data = data;
//     const markup = this._generateMarkup();
//     this._clear();
//     this._parentElement.insertAdjacentHTML('beforeend', markup);
//   }

//   //publisher mean code that know when to react
//   addHandlerRender(dom, func) {
//     ['hashchange', 'load'].forEach(el => dom.addEventListener(el, func));
//   }
//   _clear() {
//     this._parentElement.innerHTML = '';
//   }
//   //api to load spin
//   renderSpin() {
//     const html = `<div class="spinner">
//     <svg>
//       <use href="${icons}#icon-loader"></use>
//     </svg>
//   </div> `;
//     this._clear();
//     this._parentElement.insertAdjacentHTML('afterbegin', html);
//   }

//   renderError(message = this._errorMessage) {
//     const markup = ` <div class="error">
//    <div>
//      <svg>
//        <use href="${icons}}#icon-alert-triangle"></use>
//      </svg>
//    </div>
//    <p>${message}</p>
//  </div>
// `;
//     this._clear();
//     this._parentElement.insertAdjacentHTML('afterbegin', markup);
//   }
// }
