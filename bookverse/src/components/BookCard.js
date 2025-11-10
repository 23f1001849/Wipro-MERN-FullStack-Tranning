import React from 'react';
import './BookCard.css';

const BookCard = ({ book, viewMode }) => {
  return (
    <div className={`book-card ${viewMode === 'list' ? 'list-view' : 'grid-view'}`}>
      <div className="book-image">
        <img src={book.image} alt={book.title} />
      </div>
      <div className="book-details">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">by {book.author}</p>
        <p className="book-price">${book.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default BookCard;
