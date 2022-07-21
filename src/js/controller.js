// import recipeView from './view/recipeView.js';
// import resultView from './view/resultView.js';
// import paginationView from './view/paginationView.js';
// import * as model from './model.js';
// import search from './view/searchView.js';
// import { async } from 'regenerator-runtime';
// import View from './view/view.js';
//view and model can send data across each other
import recipeView from './view/recipeView.js';
import * as model from './model.js';
import { async } from 'regenerator-runtime';
import searchView from './view/searchView.js';
import resultView from './view/resultView.js';
import paginationView from './view/paginationView.js';
import bookmarkView from './view/bookmarkView.js';
import uploadView from './view/uploadView.js';
// // const recipeContainer = document.querySelector('.recipe');

// //spin
const recipeRender = async function () {
  try {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    recipeView.renderSpin();
    resultView.update(model.calResultPerPage());
    //hash change need to update or render data again
    // debugger;
    // resultView.update(model.calResultPerPage());
    bookmarkView.update(model.state.bookmarks);
    await model.getData(hash);
    recipeView.render(model.state.recipe);
    // paginationView.render(model.state.search);
    // console.log(model.state);
  } catch (er) {
    // console.log(er);
    recipeView.renderError();
    console.error(er);
  }
};
const submitFunc = async function () {
  try {
    resultView.renderSpin();
    const searh = searchView.getSearchValue();
    if (!searh) return;
    searchView.clearField();
    await model.serachData(searh);
    resultView.render(model.calResultPerPage());
    paginationView.render(model.state.search);
  } catch (er) {
    console.log(er);
  }
};
const pagination = function (data) {
  resultView.render(model.calResultPerPage(data));
  paginationView.render(model.state.search);
};
const updateIng = function (data) {
  model.updateRecipe(data);
  recipeView.update(model.state.recipe);
};

// const updateRecipe = function (data) {
//   model.updateRecipe(data);
//   recipeView.update(model.state.recipe);
// };

const addBookmark = function () {
  if (!model.state.recipe.bookmarks) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  recipeView.update(model.state.recipe);
  //set data to view class
  bookmarkView.render(model.state.bookmarks);
  //first load from api bookmarks set to false
  // if (!model.state.recipe.bookmarks) model.addBookmark(model.state.recipe);
  // else model.deleteBookmark(model.state.recipe.id);
  // recipeView.update(model.state.recipe);
  // bookmarkView.render(model.state.bookmarks);
  // recipeView.update(model.state.recipe);
};
const loadBookmark = function () {
  bookmarkView.render(model.state.bookmarks);
};
const submitForm = async function (data) {
  try {
    uploadView.renderSpin();
    await model.uploadData(data);
    recipeView.render(model.state.recipe);
    uploadView.renderMessage();
    bookmarkView.render(model.state.bookmarks);
    // change url
    //change url without reload page
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    setTimeout(() => {
      uploadView._openCloseModal();
    }, 2500);
  } catch (er) {
    uploadView.renderError(er.message);
  }
};
const init = function () {
  bookmarkView.addLoad(loadBookmark);
  recipeView.addHandlerRenderRecipe(recipeRender);
  recipeView.addHandlerBookmark(addBookmark);
  recipeView.addHandlerUpdatIng(updateIng);
  // recipeView.addHandlerUpdateRecipe(updateRecipe);
  searchView.addHandlerSubmit(submitFunc);
  paginationView.addHandlerClick(pagination);
  uploadView.addHandlerSubmitForm(submitForm);
};

init();

// white space nodeList will be text
// console.log(test.childNodes);
// // https://forkify-api.herokuapp.com/v2

// //make application work
// ///////////////////////////////////////
// const gettingRecipe = async function () {
//   try {
//     //read hash mean url which variable you want to pass through url
//     // console.log(window.location);
//     // read always read api doc this case fetch data dont use hash # symbol
//     // if hash not change index.html still same place
//     const hash = window.location.hash.slice(1);
//     //read since page load url will not have hash so need to use gaurd clause
//     // console.log(hash);
//     if (!hash) return;
//     recipeView.renderSpin();
//     //1
//     //unpure function model keep data from business logic
//     //getting data from api
//     await model.loadRecipe(hash);
//     //create object mutate from loadRecipe
//     //get api from json will be object
//     const { recipe } = model.state;
//     //controller like middle man send data from business logic to view to display
//     // create method from class to recieve data to object send to view
//     //render to userInteface
//     recipeView.render(recipe);

//     // console.log(recipeData);
//   } catch (err) {
//     recipeView.renderError();
//   }
// };

// const searchRecipe = async function () {
//   try {
//     resultView.renderSpin();

//     const searchValue = search.getQuery();
//     if (!searchValue) return;
//     //fetch data
//     await model.searchRecipe(searchValue);
//     // console.log(model.state.recipe);
//     //render and send data to view
//     // console.log(model.state.recipe);
//     //read render all data
//     // resultView.render(model.state.search.result);
//     //read render only 10 datas
//     resultView.render(model.calSearchResult());
//     //create pagination
//     paginationView.render(model.state.search);
//     //

//     // search.clearField();
//   } catch (err) {
//     console.error(err);
//   }
// };

// const controlPagination = function (goto) {
//   resultView.render(model.calSearchResult(goto));
//   paginationView.render(model.state.search);
// };
// //subcriber code that want to react when event happen
// //as page load program  init function call addHanderlerRender function from the view
// const init = function () {
//   search.addHandlerSearch(searchRecipe);
//   recipeView.addHandlerRender(window, gettingRecipe);
//   paginationView.addHandlerClick(controlPagination);
// };

// init();
