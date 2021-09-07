/* eslint-disable no-new-object */
/* eslint-disable no-console */
/**
 * body request
 {
    "name": string,
    "year": number,
    "author": string,
    "summary": string,
    "publisher": string,
    "pageCount": number,
    "readPage": number,
    "reading": boolean
}

 * server
 {
    "id": "Qbax5Oy7L8WKf74l",
    "name": "Buku A",
    "year": 2010,
    "author": "John Doe",
    "summary": "Lorem ipsum dolor sit amet",
    "publisher": "Dicoding Indonesia",
    "pageCount": 100,
    "readPage": 25,
    "finished": false,
    "reading": false,
    "insertedAt": "2021-03-04T09:11:44.598Z",
    "updatedAt": "2021-03-04T09:11:44.598Z"
}

* edit body
 {
    "name": string,
    "year": number,
    "author": string,
    "summary": string,
    "publisher": string,
    "pageCount": number,
    "readPage": number,
    "reading": boolean
}
*/

const { nanoid } = require('nanoid');

const books = require('./books');

const addBook = (request, h) => {
  const reqBody = request.payload;
  const { pageCount, readPage, name } = reqBody;

  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const id = nanoid(16);
  const finished = pageCount === readPage;

  if (name === undefined) {
    const response = h.response({ status: 'fail', message: 'Gagal menambahkan buku. Mohon isi nama buku' });
    response.code(400);

    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({ status: 'fail', message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount' });
    response.code(400);

    return response;
  }

  const isExist = books.some((book) => book.id === id);

  if (!isExist) {
    const book = {
      ...reqBody,
      id,
      insertedAt,
      updatedAt,
      finished,
    };

    books.push(book);

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);

    return response;
  }

  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);

  return response;
};

const getAllBooks = (request, h) => {
  let { name, reading, finished } = request.query;

  let newBooks = books;

  if (name !== undefined) {
    name = name.toLowerCase();
    newBooks = newBooks.filter((b) => b.name.toLowerCase().includes(name));
  }

  if (reading !== undefined) {
    reading = Number(reading) === 1;
    newBooks = newBooks.filter((b) => b.reading === reading);
  }

  if (finished !== undefined) {
    console.log(typeof (finished));
    finished = Number(finished) === 1;
    newBooks = newBooks.filter((b) => b.finished === finished);
    console.log(newBooks);
  }

  newBooks = newBooks.map((b) => new Object({
    id: b.id,
    name: b.name,
    publisher: b.publisher,
  }));

  const response = h.response({
    status: 'success',
    data: { books: newBooks },
  });
  response.code(200);

  return response;
};

const getBook = (request, h) => {
  const { bookId } = request.params;

  const book = books.find((b) => b.id === bookId);

  if (book) {
    const response = h.response({
      status: 'success',
      data: { book },
    });
    response.code(200);

    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);

  return response;
};

const editBook = (request, h) => {
  const { bookId } = request.params;
  const reqBody = request.payload;
  const { name, pageCount, readPage } = reqBody;

  if (name === undefined) {
    // response gagal
    const response = h.response({ status: 'fail', message: 'Gagal memperbarui buku. Mohon isi nama buku' });
    response.code(400);

    return response;
  }

  if (readPage > pageCount) {
    // response gagal
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);

    return response;
  }

  const bookIndex = books.findIndex((b) => b.id === bookId);

  if (bookIndex !== -1) {
    // response berhasil
    const finished = readPage === pageCount;
    const updatedAt = new Date().toISOString();
    books[bookIndex] = {
      ...books[bookIndex],
      ...reqBody,
      updatedAt,
      finished,
    };

    const response = h.response({ status: 'success', message: 'Buku berhasil diperbarui' });
    response.code(200);

    return response;
  }

  const response = h.response({ status: 'fail', message: 'Gagal memperbarui buku. Id tidak ditemukan' });
  response.code(404);

  return response;
};

const deleteBook = (request, h) => {
  const { bookId } = request.params;
  const bookIndex = books.findIndex((b) => b.id === bookId);

  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    const response = h.response({ status: 'success', message: 'Buku berhasil dihapus' });
    response.code(200);

    return response;
  }

  const response = h.response({ status: 'fail', message: 'Buku gagal dihapus. Id tidak ditemukan' });
  response.code(404);

  return response;
};

module.exports = {
  addBook,
  getAllBooks,
  getBook,
  deleteBook,
  editBook,
};
