import actionTypes from '../../constants/actionTypes';

const createBookActions = (dispatcher, bookService) => {
  const loadBooks = async () => {
    dispatcher.dispatch({ type: actionTypes.BOOKS_LOADING });
    try {
      const books = await bookService.list();
      dispatcher.dispatch({ type: actionTypes.BOOKS_LOAD_SUCCESS, payload: books });
    } catch (error) {
      dispatcher.dispatch({ type: actionTypes.BOOKS_LOAD_FAILURE, error: error.message });
    }
  };

  const addBook = async (book) => {
    dispatcher.dispatch({ type: actionTypes.BOOK_ADDING });
    try {
      const created = await bookService.create(book);
      dispatcher.dispatch({ type: actionTypes.BOOK_ADD_SUCCESS, payload: created });
      return created;
    } catch (error) {
      dispatcher.dispatch({ type: actionTypes.BOOK_ADD_FAILURE, error: error.message });
      throw error;
    }
  };

  return {
    loadBooks,
    addBook,
  };
};

export default createBookActions;
