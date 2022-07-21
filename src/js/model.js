// import { async } from 'regenerator-runtime';
// import { API_FECTH as api, MAX_SEARCH } from './config.js';
// import { getJson as json } from './helper.js';
import { async } from 'regenerator-runtime';
import { MAX_SEARCH, API_FECTH, KEY } from './config.js';
// import { fetchData, sendData } from './helper.js';
import { AJAX } from './helper.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    recipe: [],
    page: 1,
    maxPerPage: MAX_SEARCH,
  },
  bookmarks: [],
};
const recipeObject = function (data) {
  const { recipe } = data.data;
  return {
    cookingTime: recipe.cooking_time,
    id: recipe.id,
    img: recipe.image_url,
    ingredients: recipe.ingredients,
    publisher: recipe.publisher,
    serving: recipe.servings,
    source: recipe.source_url,
    title: recipe.title,
    //if there recipe.key will spread object and set value
    ...(recipe.key && { key: recipe.key }),
  };
};

export const getData = async function (id) {
  try {
    //get single data
    const data = await AJAX(`${API_FECTH}/${id}?key=${KEY}`);
    state.recipe = recipeObject(data);
    //when first load we will set recipe.bookmarks to false when finish load api
    // check have any recipe id same as bookmarks state  id then mark current recipe that we load from api set to true
    if (state.bookmarks.some(data => data.id === id))
      state.recipe.bookmarks = true;
    else state.recipe.bookmarks = false;
    console.log(state.recipe);
    // if (state.bookmarks.some(data => data.id === id))
    //   state.recipe.bookmarks = true;
    // else state.recipe.bookmarks = false;

    // if (state.bookmarks.some(state => state.id === id))
    //   state.recipe.bookmarks = true;
    // else state.recipe.bookmarks = false;
  } catch (er) {
    throw er;
  }
};

export const serachData = async function (word) {
  try {
    //return list of data
    //fetch data with search keyword and including contain own key
    // รับข้อมูลมาเฉพาะ ที่มีเฉพาะ key ของเรา
    const { data } = await AJAX(`${API_FECTH}?search=${word}&key=${KEY}`);
    const datas = data.recipes;
    if (!datas || (Array.isArray(datas) && datas.length === 0)) return;
    // console.log(datas);
    state.search.query = word;
    state.search.recipe = datas.map(obj => {
      return {
        id: obj.id,
        publisher: obj.publisher,
        img: obj.image_url,
        title: obj.title,
        ...(obj.key && { key: obj.key }),
      };
    });

    const test = state.search.recipe.sort((a, b) =>
      a.title > b.title ? 1 : -1
    );
    console.log(test);
    //reset page when it  have new search
    state.search.page = 1;
  } catch (er) {
    throw er;
  }
  // console.log(data);
  // console.log(data);
};

export const calResultPerPage = function (page = state.search.page) {
  state.search.page = page;
  const startData = (page - 1) * state.search.maxPerPage;
  const endData = page * state.search.maxPerPage;

  return state.search.recipe.slice(startData, endData);
};

export const updateRecipe = function (serving = state.recipe.serving) {
  state.recipe.ingredients.forEach(el => {
    el.quantity = (el.quantity * serving) / state.recipe.serving;
  });
  //model and view not connect together so we need to pass to controller then sent it to change data
  //if not chnage serving still use old results is 5 should chage it
  //not set still get same serving 4+1 all time
  state.recipe.serving = serving;
};
//push recipe object to bookmarks and set bookmarks as true

const setLocalStorage = function () {
  localStorage.setItem('bookmark', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (data) {
  state.bookmarks.push(data);
  if (data.id === state.recipe.id) state.recipe.bookmarks = true;
  setLocalStorage();
  // state.bookmarks.push(data);
  // if (data.id === state.recipe.id) state.recipe.bookmarks = true;
};
//delet recipe object from bookmarks and set bookmarks to false
export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex(data => data.id === id);
  state.bookmarks.splice(index, 1);
  if (id === state.recipe.id) state.recipe.bookmarks = false;
  setLocalStorage();
  // const index = state.bookmarks.findIndex(data => data.id === id);
  // state.bookmarks.slice(index, 1);
  // if (id === state.recipe.id) state.recipe.bookmarks = false;
};

export const uploadData = async function (recipe) {
  try {
    // console.log(recipe);
    // console.log(Object.entries(recipe));
    //convert obj to array
    const ingredients = Object.entries(recipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(entry => {
        // const arrIng = entry[1].replaceAll(' ', '').split(',');
        const arrIng = entry[1].split(',').map(el => el.trim());
        if (arrIng.length !== 3) throw new Error('Please use a correct format');
        const [quantity, unit, description] = arrIng;
        return {
          quantity: quantity ? +quantity : null,
          unit,
          description,
        };
      });
    // format to same api that we recieve
    const recipeData = {
      cooking_time: +recipe.cookingTime,
      image_url: recipe.image,
      servings: +recipe.servings,
      source_url: recipe.sourceUrl,
      title: recipe.title,
      publisher: recipe.publisher,
      ingredients: ingredients,
    };
    // post data to api
    const data = await AJAX(`${API_FECTH}?key=${KEY}`, recipeData);
    console.log(data);
    // console.log(data);
    state.recipe = recipeObject(data);
    addBookmark(state.recipe);
  } catch (er) {
    throw er;
  }
};
const init = function () {
  const bookmark = localStorage.getItem('bookmark');
  if (bookmark) state.bookmarks = JSON.parse(bookmark);
};
init();
// console.log(state.bookmarks);
export const clearLocal = function () {
  localStorage.clear('bookmarks');
};
// export const addBookmark = function (recipe) {
//   state.bookmarks.push(recipe);

//   if (recipe.id === state.recipe.id) state.recipe.bookmarks = true;
// };

// export const deleteBookmark = function (id) {
//   const find = state.bookmarks.findIndex(state => state.id === id);
//   state.bookmarks.slice(find);
//   if (id === state.recipe.id) state.recipe.bookmarks = false;
// };
// export const updateRecipe = function (serv = state.recipe.serving) {
//   state.recipe.ingredients.forEach(el => {
//     el.quantity = (el.quantity * serv) / state.recipe.serving;
//   });
//   state.recipe.serving = serv;
// };
// export const state = {
//   recipe: {},
//   search: {
//     query: '',
//     result: [],
//     page: 1,
//     resultsPerPage: MAX_SEARCH,
//   },
// };
// //hash mean id of url link

// export const loadRecipe = async function (hash) {
//   try {
//     //resolve
//     // json function create for get data from api use url link
//     //checl network if load api morethan 5 sec will reject and send error
//     const data = await json(`${api}/${hash}`);
//     // const gettindData = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
//     // const { data } = await gettindData.json();
//     state.recipe = {
//       cookingTime: data.recipe.cooking_time,
//       id: data.recipe.id,
//       imgUrl: data.recipe.image_url,
//       ingredients: data.recipe.ingredients,
//       publisher: data.recipe.publisher,
//       serving: data.recipe.servings,
//       title: data.recipe.title,
//       sourceUrl: data.recipe.source_url,
//     };

//     // console.log(state.recipe);
//     //catch working with reject promise
//   } catch (err) {
//     throw err;
//   }
// };

// export const searchRecipe = async function (key) {
//   try {
//     state.search.query = key;
//     const data = await json(`${api}?search=${key}`);
//     state.search.result = data.recipes.map(el => {
//       return {
//         id: el.id,
//         imgUrl: el.image_url,
//         publisher: el.publisher,
//         title: el.title,
//       };
//     });
//   } catch (er) {
//     throw er;
//   }
// };

// // pagination get 10 query from fetch data array
// export const calSearchResult = function (page = state.search.page) {
//   state.search.page = page;
//   //0 10
//   const start = (page - 1) * state.search.resultsPerPage;
//   //9  20
//   const end = page * state.search.resultsPerPage;

//   return state.search.result.slice(start, end);
// };
