import React, { useState } from 'react';
import BookCard from './BookCard';
import './BookList.css';

const BookList = () => {
  const booksData = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      price: 12.99,
      image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop"
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      price: 14.99,
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop"
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      price: 13.99,
      image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop"
    },
    {
      id: 4,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      price: 11.99,
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop"
    },
    {
      id: 5,
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      price: 13.49,
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=600&fit=crop"
    },
    {
      id: 6,
      title: "Harry Potter and the Sorcerer's Stone",
      author: "J.K. Rowling",
      price: 16.99,
      image: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=400&h=600&fit=crop"
    },
    {
      id: 7,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      price: 15.99,
      image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop"
    },
    {
      id: 8,
      title: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=600&fit=crop"
    }
  ];

  // State management
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchQuery, setSearchQuery] = useState('');

  //handles view mode toggle event 
  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  // handles search input event  
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filters books based on search query
  const filteredBooks = booksData.filter((book) => {
    const query = searchQuery.toLowerCase();
    return (
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query)
    );
  });

  return (
    <div className="book-list-container">
      <header className="book-list-header">
        <h1>📚 BookVerse - Featured Books</h1>
        <p className="subtitle">Discover your next favorite read</p>
      </header>

      <div className="controls-section">
        {/* Search Input - Controlled Component */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        {/* View Mode Toggle Buttons */}
        <div className="view-toggle">
          <button
            className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => handleViewModeChange('grid')}
          >
            <span className="icon">⊞</span> Grid View
          </button>
          <button
            className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => handleViewModeChange('list')}
          >
            <span className="icon">☰</span> List View
          </button>
        </div>
      </div>

      {/* Display search results count */}
      <div className="results-info">
        {searchQuery && (
          <p>
            Found {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''} matching "{searchQuery}"
          </p>
        )}
      </div>

      {/* Book Cards Display */}
      <div className={`books-container ${viewMode}-mode`}>
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} viewMode={viewMode} />
          ))
        ) : (
          <div className="no-results">
            <p>No books found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookList;
