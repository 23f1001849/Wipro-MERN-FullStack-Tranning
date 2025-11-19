import React from 'react';
import PropTypes from 'prop-types';
import './BookCard.css';

const BookCard = ({ book, viewMode, onSelect, onViewDetails, isSelected }) => {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect(book);
    }
  };

  const handleViewDetails = (event) => {
    event.stopPropagation();
    onViewDetails(book.id);
  };

  return (
    <article
      className={`book-card card shadow-sm ${
        viewMode === 'list' ? 'list-view' : 'grid-view'
      } ${isSelected ? 'selected' : ''}`.trim()}
      onClick={() => onSelect(book)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
    >
      <div className="book-image">
        <img src={book.image} alt={book.title} className="img-fluid" />
      </div>
      <div className="book-details card-body">
        <h3 className="book-title card-title">{book.title}</h3>
        <p className="book-author card-subtitle mb-2">by {book.author}</p>
        <p className="book-price">${Number(book.price ?? 0).toFixed(2)}</p>
        <p className="text-muted small mb-0">Tap for author details</p>
        <button type="button" className="btn btn-sm btn-primary view-details-btn" onClick={handleViewDetails}>
          View Details
        </button>
      </div>
    </article>
  );
};

BookCard.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  viewMode: PropTypes.oneOf(['grid', 'list']).isRequired,
  onSelect: PropTypes.func,
  onViewDetails: PropTypes.func,
  isSelected: PropTypes.bool,
};

BookCard.defaultProps = {
  onSelect: () => {},
  onViewDetails: () => {},
  isSelected: false,
};

export default BookCard;
