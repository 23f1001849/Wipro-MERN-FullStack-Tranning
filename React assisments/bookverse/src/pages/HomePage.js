import React from 'react';
import BookList from '../components/BookList';
import UserGreeting from '../components/UserGreeting';
import withLoader from '../hoc/withLoader';
import { useBookContext } from '../context/BookContext';

const BookListWithLoader = withLoader(BookList);

const HomePage = () => {
  const { books, isLoading, error, actions } = useBookContext();

  return (
    <section className="route-fade">
      <div className="container text-center text-white mb-4">
        <h1 className="display-6 fw-semibold">BookVerse Library</h1>
        <UserGreeting
          render={(partOfDay) => (
            <p className="text-white-50">
              Good {partOfDay}! Explore curated tales, compare authors, and dive into detailed write-ups in just a click.
            </p>
          )}
        />
      </div>
      <div className="container">
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <BookListWithLoader
          books={books}
          isLoading={isLoading}
          loaderText="Fetching curated titles..."
          onRefresh={actions.loadBooks}
        />
      </div>
    </section>
  );
};

export default HomePage;
