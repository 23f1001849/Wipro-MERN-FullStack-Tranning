import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewCard from './ReviewCard';

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:3001/reviews');
        setReviews(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        // Fallback reviews
        setReviews([
          {
            id: 1,
            packageId: 1,
            author: "Sarah Johnson",
            rating: 5,
            comment: "Amazing experience! The guided tours were excellent and hotels were top-notch.",
            date: "2024-10-15"
          },
          {
            id: 2,
            packageId: 2,
            author: "Michael Chen",
            rating: 5,
            comment: "Best trip ever! Tokyo was incredible and the itinerary was perfect.",
            date: "2024-10-10"
          },
          {
            id: 3,
            packageId: 3,
            author: "Emma Williams",
            rating: 5,
            comment: "Paradise on earth! The overwater villa exceeded all expectations.",
            date: "2024-09-28"
          }
        ]);
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="my-5">
      <h3 className="text-center mb-4">What Our Travelers Say</h3>
      <div className="row">
        {reviews.map(review => (
          <div key={review.id} className="col-md-4">
            <ReviewCard review={review} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
