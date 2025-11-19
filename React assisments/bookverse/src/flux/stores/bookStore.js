import actionTypes from '../../constants/actionTypes';

const CHANGE_EVENT = 'change';

class BookStore {
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
    this.state = {
      books: [],
      isLoading: false,
      error: '',
      isSaving: false,
    };
    this.listeners = new Map();
    this.dispatcher.register(this.handleAction);
  }

  handleAction = (action) => {
    switch (action.type) {
      case actionTypes.BOOKS_LOADING: {
        this.state = { ...this.state, isLoading: true, error: '' };
        this.emitChange();
        break;
      }
      case actionTypes.BOOKS_LOAD_SUCCESS: {
        this.state = {
          ...this.state,
          isLoading: false,
          error: '',
          books: action.payload,
        };
        this.emitChange();
        break;
      }
      case actionTypes.BOOKS_LOAD_FAILURE: {
        this.state = {
          ...this.state,
          isLoading: false,
          error: action.error,
        };
        this.emitChange();
        break;
      }
      case actionTypes.BOOK_ADDING: {
        this.state = { ...this.state, isSaving: true, error: '' };
        this.emitChange();
        break;
      }
      case actionTypes.BOOK_ADD_SUCCESS: {
        this.state = {
          ...this.state,
          isSaving: false,
          books: [action.payload, ...this.state.books],
        };
        this.emitChange();
        break;
      }
      case actionTypes.BOOK_ADD_FAILURE: {
        this.state = { ...this.state, isSaving: false, error: action.error };
        this.emitChange();
        break;
      }
      default:
        break;
    }
  };

  getState() {
    return this.state;
  }

  addChangeListener(listener) {
    this.listeners.set(listener, true);
  }

  removeChangeListener(listener) {
    this.listeners.delete(listener);
  }

  emitChange() {
    this.listeners.forEach((_, listener) => listener());
  }
}

export default BookStore;
