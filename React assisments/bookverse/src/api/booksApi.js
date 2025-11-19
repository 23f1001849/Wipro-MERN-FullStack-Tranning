const BASE_URL = process.env.REACT_APP_BOOKS_API ?? 'http://localhost:5000/books';

const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error('Unable to load BookVerse data. Please refresh or restart json-server.');
  }
  return response.json();
};

export const fetchBooks = async () => {
  const response = await fetch(BASE_URL);
  return handleResponse(response);
};

export const fetchBookById = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`);
  return handleResponse(response);
};

export const createBook = async (book) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
  });
  return handleResponse(response);
};

export default {
  fetchBooks,
  fetchBookById,
  createBook,
};
