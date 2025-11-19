import React, { useState } from 'react';
import PropTypes from 'prop-types';

const DestinationCard = ({ destination, onAddToWishlist }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlistClick = () => {
    setIsWishlisted(!isWishlisted);
    onAddToWishlist(destination);
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">
        <img 
          src={destination.image} 
          className="card-img-top" 
          alt={destination.name}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <div className="card-body">
          <h5 className="card-title">{destination.name}</h5>
          <p className="card-text">{destination.description}</p>
          <div className="d-flex justify-content-between align-items-center">
            <span className="h5 text-primary mb-0">${destination.price}</span>
            <button 
              className={`btn btn-sm ${isWishlisted ? 'btn-danger' : 'btn-outline-danger'}`}
              onClick={handleWishlistClick}
            >
              <i className={`bi bi-heart${isWishlisted ? '-fill' : ''}`}></i>
              {isWishlisted ? ' Wishlisted' : ' Add to Wishlist'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

DestinationCard.propTypes = {
  destination: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onAddToWishlist: PropTypes.func.isRequired,
};

export default DestinationCard;
