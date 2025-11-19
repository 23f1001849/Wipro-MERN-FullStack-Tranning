import React from 'react';
import PropTypes from 'prop-types';

const ReviewCard = ({ review }) => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<i key={i} className="bi bi-star-fill text-warning"></i>);
    }
    for (let i = rating; i < 5; i++) {
      stars.push(<i key={i} className="bi bi-star text-warning"></i>);
    }
    return stars;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div>
            <h6 className="mb-0">{review.author}</h6>
            <small className="text-muted">{formatDate(review.date)}</small>
          </div>
          <div>
            {renderStars(review.rating)}
          </div>
        </div>
        <p className="card-text mb-0">{review.comment}</p>
      </div>
    </div>
  );
};

ReviewCard.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
};

export default ReviewCard;
