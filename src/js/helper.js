//contain function reuse over the project
import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config.js';
import { uploadData } from './model.js';
// read use with promise race
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchData = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);
    const data = await Promise.race([fetchData, timeout(TIMEOUT_SEC)]);
    const dataJson = await data.json();
    if (!data.ok) throw new Error(`${dataJson.message} (${dataJson.status})`);
    return dataJson;
  } catch (er) {
    throw er;
  }
};

// export const fetchData = async function (url) {
//   try {
//     const data = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
//     const dataJson = await data.json();
//     if (!data.ok) throw new Error('Please check your url');
//     return dataJson;
//   } catch (er) {
//     throw er;
//   }
// };

// export const sendData = async function (url, uploadData) {
//   try {
//     const fetchData = fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(uploadData),
//     });
//     const data = await Promise.race([fetchData, timeout(TIMEOUT_SEC)]);
//     const dataJson = await data.json();
//     if (!data.ok) throw new Error(`${dataJson.message}-${dataJson.status}`);
//     return dataJson;
//   } catch (er) {
//     throw er;
//   }
// };

// export const sendJSON = async function (url, uploadData) {
//   try {
//     const fetchPro = fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(uploadData),
//     });

//     const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
//     const data = await res.json();

//     if (!res.ok) throw new Error(`${data.message} (${res.status})`);
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };
// export const getJson = async function (url) {
//   try {
//     const gettindData = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
//     const { data } = await gettindData.json();
//     if (!gettindData.ok) throw new Error(`${data.message},${data.status}`);
//     return data; //return a promise from async
//   } catch (er) {
//     throw er;
//   }
// };
