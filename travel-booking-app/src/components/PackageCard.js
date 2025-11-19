import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PackageCard = ({ pkg }) => {
  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`star-${i}`} className="bi bi-star-fill text-warning"></i>);
    }
    if (hasHalfStar) {
      stars.push(<i key="half-star" className="bi bi-star-half text-warning"></i>);
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="bi bi-star text-warning"></i>);
    }
    return stars;
  };

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100 shadow-sm hover-shadow">
        {/* Badge for availability */}
        {pkg.availability && (
          <div className="position-absolute top-0 end-0 m-2">
            <span className={`badge ${pkg.availability === 'Limited' ? 'bg-warning' : 'bg-success'}`}>
              {pkg.availability}
            </span>
          </div>
        )}
        
        <img 
          src={pkg.image} 
          className="card-img-top" 
          alt={pkg.name}
          style={{ height: '220px', objectFit: 'cover' }}
        />
        
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{pkg.name}</h5>
          
          {/* Rating and Reviews */}
          {pkg.rating && (
            <div className="mb-2">
              <span className="me-1">{renderStars(pkg.rating)}</span>
              <small className="text-muted">
                {pkg.rating} ({pkg.reviews} reviews)
              </small>
            </div>
          )}
          
          <p className="text-muted mb-2">
            <i className="bi bi-geo-alt-fill text-primary"></i> {pkg.destination}
          </p>
          
          <p className="card-text flex-grow-1">{pkg.description}</p>
          
          <div className="mt-auto">
            {/* Includes */}
            <ul className="list-unstyled small mb-3">
              {pkg.includes.slice(0, 3).map((item, index) => (
                <li key={index}>
                  <i className="bi bi-check-circle-fill text-success me-1"></i> {item}
                </li>
              ))}
              {pkg.includes.length > 3 && (
                <li className="text-muted">
                  <small>+ {pkg.includes.length - 3} more inclusions</small>
                </li>
              )}
            </ul>
            
            {/* Category Badge */}
            {pkg.category && (
              <span className="badge bg-light text-dark mb-2">
                <i className="bi bi-tag-fill me-1"></i>{pkg.category}
              </span>
            )}
            
            {/* Price and CTA */}
            <div className="d-flex justify-content-between align-items-center mt-3">
              <div>
                <small className="text-muted d-block">
                  <i className="bi bi-calendar3"></i> {pkg.duration}
                </small>
                <div className="h4 text-primary mb-0">
                  ${pkg.price.toLocaleString()}
                  <small className="text-muted fs-6"> /person</small>
                </div>
              </div>
              <Link to="/contact" className="btn btn-primary">
                <i className="bi bi-calendar-check me-1"></i>
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PackageCard.propTypes = {
  pkg: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    includes: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default PackageCard;
