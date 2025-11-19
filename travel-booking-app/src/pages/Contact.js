import React from 'react';
import BookingForm from '../components/BookingForm';

const Contact = () => {
  return (
    <div className="container mt-4">
      <div className="text-center mb-5">
        <h1 className="display-4">Book Your Journey</h1>
        <p className="lead">Fill out the form below to reserve your dream vacation</p>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-8">
          <BookingForm />
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-4 text-center mb-4">
          <i className="bi bi-telephone fs-1 text-primary"></i>
          <h5 className="mt-3">Call Us</h5>
          <p>+1 (555) 123-4567</p>
        </div>
        <div className="col-md-4 text-center mb-4">
          <i className="bi bi-envelope fs-1 text-primary"></i>
          <h5 className="mt-3">Email Us</h5>
          <p>info@travelbook.com</p>
        </div>
        <div className="col-md-4 text-center mb-4">
          <i className="bi bi-clock fs-1 text-primary"></i>
          <h5 className="mt-3">Working Hours</h5>
          <p>Mon-Fri: 9AM - 6PM</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
