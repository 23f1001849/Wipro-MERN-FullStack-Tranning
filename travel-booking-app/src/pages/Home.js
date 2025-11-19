import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DestinationCard from '../components/DestinationCard';
import Testimonials from '../components/Testimonials';

const Home = () => {
  const [wishlist, setWishlist] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get('http://localhost:3001/destinations?popular=true');
        setDestinations(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching destinations:', err);
        // Fallback to static data
        setDestinations([
          {
            id: 1,
            name: 'Paris, France',
            description: 'Experience the city of love with iconic landmarks and rich culture.',
            price: 1299,
            image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=600',
          },
          {
            id: 2,
            name: 'Tokyo, Japan',
            description: 'Explore traditional temples and modern technology in perfect harmony.',
            price: 1599,
            image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=600',
          },
          {
            id: 3,
            name: 'Bali, Indonesia',
            description: 'Relax on pristine beaches and discover spiritual retreats.',
            price: 899,
            image: 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=600',
          },
          {
            id: 4,
            name: 'New York, USA',
            description: 'The city that never sleeps - Broadway, Times Square, and more.',
            price: 1099,
            image: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=600',
          },
          {
            id: 5,
            name: 'Dubai, UAE',
            description: 'Luxury shopping, ultramodern architecture, and desert adventures.',
            price: 1399,
            image: 'https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg?auto=compress&cs=tinysrgb&w=600',
          },
          {
            id: 6,
            name: 'Santorini, Greece',
            description: 'Stunning sunsets, white-washed buildings, and crystal-clear waters.',
            price: 1199,
            image: 'https://images.pexels.com/photos/161815/santorini-oia-greece-water-161815.jpeg?auto=compress&cs=tinysrgb&w=600',
          },
        ]);
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const handleAddToWishlist = (destination) => {
    const isAlreadyWishlisted = wishlist.find(item => item.id === destination.id);
    if (isAlreadyWishlisted) {
      setWishlist(wishlist.filter(item => item.id !== destination.id));
    } else {
      setWishlist([...wishlist, destination]);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading destinations...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* Hero Section */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">Discover Your Next Adventure</h1>
        <p className="lead">Explore featured destinations and create unforgettable memories</p>
      </div>

      {/* Wishlist Alert */}
      {wishlist.length > 0 && (
        <div className="alert alert-info d-flex justify-content-between align-items-center">
          <span>
            <i className="bi bi-heart-fill me-2"></i>
            <strong>Wishlist:</strong> {wishlist.length} destination(s) saved
          </span>
          <button 
            className="btn btn-sm btn-outline-primary"
            onClick={() => setWishlist([])}
          >
            Clear All
          </button>
        </div>
      )}

      {/* Destinations Grid */}
      <div className="row">
        {destinations.map(destination => (
          <DestinationCard
            key={destination.id}
            destination={destination}
            onAddToWishlist={handleAddToWishlist}
          />
        ))}
      </div>

      {/* Featured Offers Section */}
      <div className="my-5 p-5 bg-gradient rounded shadow-sm" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div className="text-center text-white">
          <h2 className="mb-3">Special Summer Offers</h2>
          <p className="lead mb-4">Book now and save up to 30% on selected destinations</p>
          <button className="btn btn-light btn-lg">View All Offers</button>
        </div>
      </div>

      {/* Why Choose TravelBook Section */}
      <div className="my-5 p-4 bg-light rounded">
        <h3 className="text-center mb-5">Why Choose TravelBook?</h3>
        <div className="row mt-4">
          <div className="col-md-3 text-center mb-4">
            <i className="bi bi-cash-coin fs-1 text-primary"></i>
            <h5 className="mt-3">Best Prices</h5>
            <p className="text-muted">We guarantee the best prices for your dream vacation.</p>
          </div>
          <div className="col-md-3 text-center mb-4">
            <i className="bi bi-shield-check fs-1 text-primary"></i>
            <h5 className="mt-3">Secure Booking</h5>
            <p className="text-muted">Your safety and security are our top priorities.</p>
          </div>
          <div className="col-md-3 text-center mb-4">
            <i className="bi bi-headset fs-1 text-primary"></i>
            <h5 className="mt-3">24/7 Support</h5>
            <p className="text-muted">Our team is always ready to assist you.</p>
          </div>
          <div className="col-md-3 text-center mb-4">
            <i className="bi bi-star-fill fs-1 text-primary"></i>
            <h5 className="mt-3">Top Rated</h5>
            <p className="text-muted">Thousands of 5-star reviews from happy travelers.</p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Travel Tips Section */}
      <div className="my-5">
        <h3 className="text-center mb-4">Travel Tips & Guides</h3>
        <div className="row">
          <div className="col-md-4 mb-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">
                  <i className="bi bi-passport me-2 text-primary"></i>
                  Visa Requirements
                </h5>
                <p className="card-text">Check visa requirements for your destination before booking.</p>
                <button className="btn btn-sm btn-outline-primary">Learn More</button>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">
                  <i className="bi bi-calendar-check me-2 text-primary"></i>
                  Best Time to Visit
                </h5>
                <p className="card-text">Plan your trip during the best season for optimal experience.</p>
                <button className="btn btn-sm btn-outline-primary">Learn More</button>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">
                  <i className="bi bi-bag-check me-2 text-primary"></i>
                  Packing Tips
                </h5>
                <p className="card-text">Learn what to pack for different types of destinations.</p>
                <button className="btn btn-sm btn-outline-primary">Learn More</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="my-5 p-5 bg-primary text-white rounded shadow">
        <div className="text-center">
          <h3 className="mb-3">Subscribe to Our Newsletter</h3>
          <p className="mb-4">Get the latest travel deals and destination guides delivered to your inbox.</p>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="input-group">
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="Enter your email"
                  aria-label="Email"
                />
                <button className="btn btn-light" type="button">
                  <i className="bi bi-envelope-fill me-2"></i>Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
