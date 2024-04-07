import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAuthors = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/authors.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.warn('API Response:', data);
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

// FIXME: CREATE AUTHOR
const createAuthor = (payload) => new Promise((resolve, reject) => { // this promise is to post a new payload into authors
  fetch(`${endpoint}/authors.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload), // the payload is converted into JSON type, and added to authors, via POST fetch
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// FIXME: GET SINGLE AUTHOR
const getSingleAuthor = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/authors/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// FIXME: DELETE AUTHOR
const deleteSingleAuthor = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/authors/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// FIXME: UPDATE AUTHOR
const updateAuthor = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/authors/${payload.firebaseKey}.json`, {
    method: 'PATCH', // similar to creating an author, but the payload needs a matching firebasekey to PATCH the payload
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

// TODO: GET A SINGLE AUTHOR'S BOOKS
const getAuthorBooks = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/books.json?orderBy="author_id"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const favoriteAuthors = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/authors.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const favorites = Object.values(data).filter((item) => item.favorite);
      resolve(favorites);
    })
    .catch(reject);
});

export {
  getAuthors,
  createAuthor,
  getSingleAuthor,
  deleteSingleAuthor,
  updateAuthor,
  favoriteAuthors,
  getAuthorBooks,
};
