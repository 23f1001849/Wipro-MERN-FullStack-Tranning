import React, { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import AuthorInfo from './AuthorInfo';
import BookCard from './BookCard';
import './BookList.css';

const BookList = ({ books, onRefresh }) => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBookId, setSelectedBookId] = useState(null);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!books.length) {
      setSelectedBookId(null);
      return;
    }

    if (!selectedBookId || !books.some((book) => book.id === selectedBookId)) {
      setSelectedBookId(books[0].id);
    }
  }, [books, selectedBookId]);

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFocusSearch = () => {
    searchInputRef.current?.focus();
  };

  const handleSelectBook = (book) => {
    setSelectedBookId(book.id);
  };

  const handleNavigateToDetails = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  const filteredBooks = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return books.filter((book) => {
      return (
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query)
      );
    });
  }, [books, searchQuery]);

  const selectedBook = useMemo(
    () => books.find((book) => book.id === selectedBookId) || null,
    [books, selectedBookId]
  );

  const authorProfile = selectedBook
    ? {
        name: selectedBook.author,
        bio: selectedBook.authorBio,
        topBooks: selectedBook.authorTopBooks,
      }
    : null;

  return (
    <div className="book-list-container container py-5">
      <header className="book-list-header text-center">
        <p className="eyebrow text-uppercase text-muted mb-2">Day 13 · Flux in Action</p>
        <h1>📚 BookVerse Author Explorer</h1>
        <p className="subtitle">Discover a book, meet the author, and manage the catalog without leaving the SPA.</p>
        <div className="mt-3 d-flex justify-content-center gap-3 flex-wrap">
          <Link to="/add-book" className="btn btn-success">
            + Add a New Book
          </Link>
          <Link to="/advanced" className="btn btn-outline-warning">
            Day 14 Demos
          </Link>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => {
              if (onRefresh) {
                onRefresh();
              } else {
                navigate('/home');
              }
            }}
          >
            Refresh Library
          </button>
        </div>
      </header>

      <div className="controls-section row g-3 align-items-center">
        <div className="col-lg-6">
          <div className="search-container">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search by title or author..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
            <span className="search-icon" role="img" aria-label="search">
              🔍
            </span>
          </div>
        </div>
        <div className="col-sm-6 col-lg-3">
          <button type="button" className="btn btn-outline-secondary focus-btn w-100" onClick={handleFocusSearch}>
            Focus Search
          </button>
        </div>
        <div className="col-sm-6 col-lg-3">
          <div className="view-toggle btn-group w-100" role="group" aria-label="view toggle">
            <button
              type="button"
              className={`btn ${viewMode === 'grid' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleViewModeChange('grid')}
            >
              ⊞ Grid
            </button>
            <button
              type="button"
              className={`btn ${viewMode === 'list' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleViewModeChange('list')}
            >
              ☰ List
            </button>
          </div>
        </div>
      </div>

      <div className="results-info">
        {searchQuery && (
          <p>
            Found {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''} matching "{searchQuery}"
          </p>
        )}
      </div>

      <div className="books-layout row g-4">
        <div className="col-lg-8">
          <div className={`books-container ${viewMode}-mode`}>
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  viewMode={viewMode}
                  onSelect={handleSelectBook}
                  onViewDetails={handleNavigateToDetails}
                  isSelected={selectedBook?.id === book.id}
                />
              ))
            ) : (
              <div className="no-results">
                <p>No books found matching your search.</p>
              </div>
            )}
          </div>
        </div>
        <div className="col-lg-4">
          <AuthorInfo author={authorProfile} bookTitle={selectedBook?.title} />
        </div>
      </div>
    </div>
  );
};

BookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      description: PropTypes.string,
      authorBio: PropTypes.string,
      authorTopBooks: PropTypes.arrayOf(PropTypes.string),
    })
  ),
  onRefresh: PropTypes.func,
};

BookList.defaultProps = {
  books: [],
  onRefresh: undefined,
};

export default BookList;
