import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PackageCard from '../components/PackageCard';

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState('All');

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get('http://localhost:3001/packages');
        setPackages(response.data);
        setFilteredPackages(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load packages. Please ensure json-server is running.');
        setLoading(false);
        // Fallback data if server is not running
        const fallbackData = [
          {
            id: 1,
            name: "European Explorer",
            destination: "Paris, Rome, Barcelona",
            duration: "10 Days",
            price: 2499,
            description: "Visit three iconic European cities with guided tours.",
            image: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800",
            includes: ["Flights", "Hotels", "Guided Tours", "Breakfast"],
            category: "Cultural",
            rating: 4.8,
            reviews: 245
          },
          {
            id: 2,
            name: "Asian Adventure",
            destination: "Tokyo, Bangkok, Singapore",
            duration: "12 Days",
            price: 2899,
            description: "Experience diverse cultures and cuisines of Asia.",
            image: "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=800",
            includes: ["Flights", "Hotels", "City Tours", "Some Meals"],
            category: "Cultural",
            rating: 4.7,
            reviews: 189
          }
        ];
        setPackages(fallbackData);
        setFilteredPackages(fallbackData);
      }
    };

    fetchPackages();
  }, []);

  // Filter packages based on search, category, and price
  useEffect(() => {
    let filtered = [...packages];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(pkg =>
        pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(pkg => pkg.category === selectedCategory);
    }

    // Price range filter
    if (priceRange !== 'All') {
      switch (priceRange) {
        case 'under2500':
          filtered = filtered.filter(pkg => pkg.price < 2500);
          break;
        case '2500-3000':
          filtered = filtered.filter(pkg => pkg.price >= 2500 && pkg.price <= 3000);
          break;
        case 'over3000':
          filtered = filtered.filter(pkg => pkg.price > 3000);
          break;
        default:
          break;
      }
    }

    setFilteredPackages(filtered);
  }, [searchTerm, selectedCategory, priceRange, packages]);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading packages...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">Travel Packages</h1>
        <p className="lead">Choose from our carefully curated travel experiences</p>
      </div>

      {error && (
        <div className="alert alert-warning" role="alert">
          <i className="bi bi-exclamation-triangle"></i> {error}
        </div>
      )}

      {/* Filters Section */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            {/* Search Bar */}
            <div className="col-md-4">
              <label className="form-label fw-bold">
                <i className="bi bi-search me-2"></i>Search Packages
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Search by name or destination..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="col-md-4">
              <label className="form-label fw-bold">
                <i className="bi bi-tag me-2"></i>Category
              </label>
              <select
                className="form-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                <option value="Cultural">Cultural</option>
                <option value="Adventure">Adventure</option>
                <option value="Beach">Beach</option>
              </select>
            </div>

            {/* Price Range Filter */}
            <div className="col-md-4">
              <label className="form-label fw-bold">
                <i className="bi bi-currency-dollar me-2"></i>Price Range
              </label>
              <select
                className="form-select"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
              >
                <option value="All">All Prices</option>
                <option value="under2500">Under $2,500</option>
                <option value="2500-3000">$2,500 - $3,000</option>
                <option value="over3000">Over $3,000</option>
              </select>
            </div>
          </div>

          {/* Results Count and Reset */}
          <div className="mt-3 d-flex justify-content-between align-items-center">
            <span className="text-muted">
              Showing {filteredPackages.length} of {packages.length} packages
            </span>
            {(searchTerm || selectedCategory !== 'All' || priceRange !== 'All') && (
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                  setPriceRange('All');
                }}
              >
                <i className="bi bi-x-circle me-1"></i>Clear Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Packages Grid */}
      {filteredPackages.length > 0 ? (
        <div className="row">
          {filteredPackages.map(pkg => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <i className="bi bi-inbox fs-1 text-muted"></i>
          <p className="mt-3 text-muted">No packages found matching your criteria.</p>
          <button
            className="btn btn-primary"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
              setPriceRange('All');
            }}
          >
            View All Packages
          </button>
        </div>
      )}

      {/* Popular Destinations Banner */}
      <div className="my-5 p-4 bg-light rounded">
        <h4 className="text-center mb-4">Can't Find What You're Looking For?</h4>
        <p className="text-center text-muted mb-4">
          We offer custom packages tailored to your preferences. Contact us to create your dream vacation.
        </p>
        <div className="text-center">
          <button className="btn btn-primary me-2">Contact Us</button>
          <button className="btn btn-outline-primary">View Custom Packages</button>
        </div>
      </div>
    </div>
  );
};

export default Packages;
