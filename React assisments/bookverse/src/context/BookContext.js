import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import Dispatcher from '../flux/dispatcher';
import BookStore from '../flux/stores/bookStore';
import createBookActions from '../flux/actions/bookActions';
import bookService from '../services/bookService';

const BookContext = createContext(null);

export const BookProvider = ({ children, service = bookService }) => {
  const dispatcherRef = useRef(null);
  const storeRef = useRef(null);
  const actionsRef = useRef(null);
  const [state, setState] = useState(() => ({ books: [], isLoading: false, error: '', isSaving: false }));

  if (!dispatcherRef.current) {
    dispatcherRef.current = new Dispatcher();
    storeRef.current = new BookStore(dispatcherRef.current);
    actionsRef.current = createBookActions(dispatcherRef.current, service);
  }

  useEffect(() => {
    const store = storeRef.current;
    const updateState = () => setState(store.getState());
    updateState();
    store.addChangeListener(updateState);
    actionsRef.current.loadBooks();
    return () => {
      store.removeChangeListener(updateState);
    };
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      actions: actionsRef.current,
    }),
    [state]
  );

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};

export const useBookContext = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBookContext must be used within a BookProvider');
  }
  return context;
};
