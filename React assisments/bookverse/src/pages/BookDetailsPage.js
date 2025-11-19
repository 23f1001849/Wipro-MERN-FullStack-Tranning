import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import withLoader from '../hoc/withLoader';
import { fetchBookById } from '../api/booksApi';
import './BookDetailsPage.css';

const BookDetailsSection = ({ book }) => {
  if (!book) {
    return (
      <div className="alert alert-secondary" role="alert">
        Book details are unavailable. Try returning to the library and selecting a different title.
      </div>
    );
  }

  return (
    <div className="details-card card shadow-lg">
      <div className="row g-4 align-items-center">
        <div className="col-md-5">
          <img src={book.image} alt={book.title} className="img-fluid rounded-4" />
        </div>
        <div className="col-md-7">
          <h1 className="h3 mb-3">{book.title}</h1>
          <p className="text-muted mb-1">by {book.author}</p>
          <p className="lead">${Number(book.price ?? 0).toFixed(2)}</p>
          <p className="book-description">{book.description}</p>
          <div className="book-meta row g-3">
            <div className="col-6 col-md-4">
              <p className="meta-label">Released</p>
              <p className="meta-value">{book.year ?? '—'}</p>
            </div>
            <div className="col-6 col-md-4">
              <p className="meta-label">Pages</p>
              <p className="meta-value">{book.pages ?? '—'}</p>
            </div>
            <div className="col-12 col-md-4">
              <p className="meta-label">Genres</p>
              <div className="genre-list">
                {(book.genres || []).map((genre) => (
                  <span key={genre} className="badge text-bg-light me-2 mb-2">
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4">
            <h2 className="h6 text-uppercase text-muted">Author highlights</h2>
            <ul className="ps-3">
              {(book.authorTopBooks || []).map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

BookDetailsSection.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
    year: PropTypes.number,
    pages: PropTypes.number,
    genres: PropTypes.arrayOf(PropTypes.string),
    authorTopBooks: PropTypes.arrayOf(PropTypes.string),
    image: PropTypes.string,
  }),
};

BookDetailsSection.defaultProps = {
  book: null,
};

const BookDetailsWithLoader = withLoader(BookDetailsSection);

const BookDetailsPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    const loadBook = async () => {
      try {
        setIsLoading(true);
        const data = await fetchBookById(id);
        if (isMounted) {
          setBook(data);
          setError('');
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load book details.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadBook();

    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <section className="container py-5 route-fade">
      <div className="mb-4">
        <Link to="/home" className="btn btn-outline-light back-link">
          ← Back to library
        </Link>
      </div>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <BookDetailsWithLoader book={book} isLoading={isLoading} loaderText="Loading book details..." />
    </section>
  );
};

export default BookDetailsPage;
