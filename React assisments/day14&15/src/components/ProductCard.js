import React from 'react';
import PropTypes from 'prop-types';

const ProductCard = ({ product, shouldCrash }) => {
  if (shouldCrash) {
    throw new Error('Product data failed to load.');
  }

  return (
    <div className="product-card shadow-sm">
      <h3 className="h5 mb-2">{product.name}</h3>
      <p className="fs-3 fw-semibold text-success">${product.price}</p>
      <ul className="ps-3">
        {product.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    features: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  shouldCrash: PropTypes.bool,
};

ProductCard.defaultProps = {
  shouldCrash: false,
};

export default ProductCard;
