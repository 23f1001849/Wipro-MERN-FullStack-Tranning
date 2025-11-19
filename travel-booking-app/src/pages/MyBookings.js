import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { confirmBooking, cancelBooking, removeBooking } from '../store/bookingSlice';

const MyBookings = () => {
  const bookings = useSelector((state) => state.booking.bookings);
  const dispatch = useDispatch();

  const handleConfirm = (id) => {
    dispatch(confirmBooking(id));
  };

  const handleCancel = (id) => {
    dispatch(cancelBooking(id));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      dispatch(removeBooking(id));
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'confirmed':
        return 'badge bg-success';
      case 'cancelled':
        return 'badge bg-danger';
      case 'pending':
        return 'badge bg-warning text-dark';
      default:
        return 'badge bg-secondary';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (bookings.length === 0) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <h1 className="display-4 mb-4">My Bookings</h1>
          <div className="alert alert-info">
            <i className="bi bi-info-circle me-2"></i>
            You don't have any bookings yet. Start exploring our packages!
          </div>
          <a href="/packages" className="btn btn-primary mt-3">
            Browse Packages
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="display-4 mb-4">My Bookings</h1>
      <p className="lead mb-4">Manage your travel bookings</p>

      <div className="row">
        {bookings.map((booking) => (
          <div key={booking.id} className="col-md-6 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Booking #{booking.id}</h5>
                <span className={getStatusBadgeClass(booking.status)}>
                  {booking.status.toUpperCase()}
                </span>
              </div>
              <div className="card-body">
                <div className="row mb-3">
                  <div className="col-6">
                    <small className="text-muted d-block">Full Name</small>
                    <strong>{booking.fullName}</strong>
                  </div>
                  <div className="col-6">
                    <small className="text-muted d-block">Email</small>
                    <strong>{booking.email}</strong>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-6">
                    <small className="text-muted d-block">Phone</small>
                    <strong>{booking.phone}</strong>
                  </div>
                  <div className="col-6">
                    <small className="text-muted d-block">Travelers</small>
                    <strong>{booking.numberOfTravelers} person(s)</strong>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-6">
                    <small className="text-muted d-block">Destination</small>
                    <strong className="text-capitalize">{booking.destination}</strong>
                  </div>
                  <div className="col-6">
                    <small className="text-muted d-block">Package Type</small>
                    <strong>{booking.packageType || 'N/A'}</strong>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-6">
                    <small className="text-muted d-block">Departure Date</small>
                    <strong>{formatDate(booking.travelDate)}</strong>
                  </div>
                  <div className="col-6">
                    <small className="text-muted d-block">Return Date</small>
                    <strong>{booking.returnDate ? formatDate(booking.returnDate) : 'N/A'}</strong>
                  </div>
                </div>

                {booking.accommodationType && (
                  <div className="row mb-3">
                    <div className="col-6">
                      <small className="text-muted d-block">Accommodation</small>
                      <strong className="text-capitalize">{booking.accommodationType}</strong>
                    </div>
                    <div className="col-6">
                      <small className="text-muted d-block">Meal Plan</small>
                      <strong className="text-capitalize">{booking.mealPlan || 'N/A'}</strong>
                    </div>
                  </div>
                )}

                {booking.specialRequests && (
                  <div className="mb-3">
                    <small className="text-muted d-block">Special Requests</small>
                    <p className="mb-0">{booking.specialRequests}</p>
                  </div>
                )}

                <div className="mb-3">
                  <small className="text-muted d-block">Booked On</small>
                  <strong>{formatDate(booking.bookingDate)}</strong>
                </div>

                <hr />

                <div className="d-flex gap-2 flex-wrap">
                  {booking.status === 'pending' && (
                    <>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleConfirm(booking.id)}
                      >
                        <i className="bi bi-check-circle me-1"></i>
                        Confirm
                      </button>
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => handleCancel(booking.id)}
                      >
                        <i className="bi bi-x-circle me-1"></i>
                        Cancel
                      </button>
                    </>
                  )}
                  
                  {booking.status === 'confirmed' && (
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleCancel(booking.id)}
                    >
                      <i className="bi bi-x-circle me-1"></i>
                      Cancel Booking
                    </button>
                  )}
                  
                  {booking.status === 'cancelled' && (
                    <span className="text-muted">This booking has been cancelled</span>
                  )}
                  
                  <button
                    className="btn btn-danger btn-sm ms-auto"
                    onClick={() => handleDelete(booking.id)}
                  >
                    <i className="bi bi-trash me-1"></i>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
