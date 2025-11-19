import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useFormSubmit from '../utils/useFormSubmit';

// Validation schema using Yup
const BookingSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, 'Name must be at least 3 characters')
    .required('Full name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
  destination: Yup.string()
    .required('Please select a destination'),
  packageType: Yup.string()
    .required('Please select a package type'),
  travelDate: Yup.date()
    .min(new Date(), 'Travel date must be in the future')
    .required('Travel date is required'),
  returnDate: Yup.date()
    .min(Yup.ref('travelDate'), 'Return date must be after travel date')
    .required('Return date is required'),
  numberOfTravelers: Yup.number()
    .min(1, 'At least 1 traveler required')
    .max(10, 'Maximum 10 travelers allowed')
    .required('Number of travelers is required'),
  accommodationType: Yup.string()
    .required('Please select accommodation type'),
  mealPlan: Yup.string()
    .required('Please select a meal plan'),
  specialRequests: Yup.string()
    .max(500, 'Special requests must be less than 500 characters'),
  agreeToTerms: Yup.boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required('You must accept the terms and conditions'),
});

const BookingForm = () => {
  const navigate = useNavigate();
  const { handleSubmit, isSubmitting, submitStatus, setSubmitStatus } = useFormSubmit();

  const initialValues = {
    fullName: '',
    email: '',
    phone: '',
    destination: '',
    packageType: '',
    travelDate: '',
    returnDate: '',
    numberOfTravelers: 1,
    accommodationType: 'standard',
    mealPlan: 'breakfast',
    specialRequests: '',
    agreeToTerms: false,
  };

  const onSubmit = async (values, { resetForm }) => {
    const success = await handleSubmit(values);
    if (success) {
      setTimeout(() => {
        setSubmitStatus(null);
        resetForm();
        navigate('/my-bookings');
      }, 2000);
    }
  };

  return (
    <div className="card shadow">
      <div className="card-body p-4">
        <h4 className="card-title mb-4">Booking Information</h4>
        
        {submitStatus === 'success' && (
          <div className="alert alert-success" role="alert">
            <i className="bi bi-check-circle"></i> Booking submitted successfully! We'll contact you soon.
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="alert alert-danger" role="alert">
            <i className="bi bi-exclamation-triangle"></i> Failed to submit booking. Please try again.
          </div>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={BookingSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="fullName" className="form-label">Full Name *</label>
                <Field
                  type="text"
                  name="fullName"
                  className={`form-control ${errors.fullName && touched.fullName ? 'is-invalid' : ''}`}
                  placeholder="John Doe"
                />
                <ErrorMessage name="fullName" component="div" className="invalid-feedback" />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email Address *</label>
                <Field
                  type="email"
                  name="email"
                  className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`}
                  placeholder="john@example.com"
                />
                <ErrorMessage name="email" component="div" className="invalid-feedback" />
              </div>

              <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone Number *</label>
                <Field
                  type="text"
                  name="phone"
                  className={`form-control ${errors.phone && touched.phone ? 'is-invalid' : ''}`}
                  placeholder="1234567890"
                />
                <ErrorMessage name="phone" component="div" className="invalid-feedback" />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="destination" className="form-label">Destination *</label>
                  <Field
                    as="select"
                    name="destination"
                    className={`form-select ${errors.destination && touched.destination ? 'is-invalid' : ''}`}
                  >
                    <option value="">Select a destination</option>
                    <option value="paris">Paris, France</option>
                    <option value="tokyo">Tokyo, Japan</option>
                    <option value="bali">Bali, Indonesia</option>
                    <option value="newyork">New York, USA</option>
                    <option value="dubai">Dubai, UAE</option>
                    <option value="santorini">Santorini, Greece</option>
                    <option value="london">London, UK</option>
                    <option value="peru">Machu Picchu, Peru</option>
                  </Field>
                  <ErrorMessage name="destination" component="div" className="invalid-feedback" />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="packageType" className="form-label">Package Type *</label>
                  <Field
                    as="select"
                    name="packageType"
                    className={`form-select ${errors.packageType && touched.packageType ? 'is-invalid' : ''}`}
                  >
                    <option value="">Select package type</option>
                    <option value="cultural">Cultural & Heritage</option>
                    <option value="adventure">Adventure</option>
                    <option value="beach">Beach & Relaxation</option>
                    <option value="luxury">Luxury Experience</option>
                    <option value="family">Family Package</option>
                    <option value="honeymoon">Honeymoon Special</option>
                  </Field>
                  <ErrorMessage name="packageType" component="div" className="invalid-feedback" />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="travelDate" className="form-label">Departure Date *</label>
                  <Field
                    type="date"
                    name="travelDate"
                    className={`form-control ${errors.travelDate && touched.travelDate ? 'is-invalid' : ''}`}
                  />
                  <ErrorMessage name="travelDate" component="div" className="invalid-feedback" />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="returnDate" className="form-label">Return Date *</label>
                  <Field
                    type="date"
                    name="returnDate"
                    className={`form-control ${errors.returnDate && touched.returnDate ? 'is-invalid' : ''}`}
                  />
                  <ErrorMessage name="returnDate" component="div" className="invalid-feedback" />
                </div>
              </div>

              <div className="row">
                <div className="col-md-4 mb-3">
                  <label htmlFor="numberOfTravelers" className="form-label">Number of Travelers *</label>
                  <Field
                    type="number"
                    name="numberOfTravelers"
                    min="1"
                    max="10"
                    className={`form-control ${errors.numberOfTravelers && touched.numberOfTravelers ? 'is-invalid' : ''}`}
                  />
                  <ErrorMessage name="numberOfTravelers" component="div" className="invalid-feedback" />
                </div>

                <div className="col-md-4 mb-3">
                  <label htmlFor="accommodationType" className="form-label">Accommodation *</label>
                  <Field
                    as="select"
                    name="accommodationType"
                    className={`form-select ${errors.accommodationType && touched.accommodationType ? 'is-invalid' : ''}`}
                  >
                    <option value="standard">Standard</option>
                    <option value="deluxe">Deluxe</option>
                    <option value="suite">Suite</option>
                    <option value="villa">Private Villa</option>
                  </Field>
                  <ErrorMessage name="accommodationType" component="div" className="invalid-feedback" />
                </div>

                <div className="col-md-4 mb-3">
                  <label htmlFor="mealPlan" className="form-label">Meal Plan *</label>
                  <Field
                    as="select"
                    name="mealPlan"
                    className={`form-select ${errors.mealPlan && touched.mealPlan ? 'is-invalid' : ''}`}
                  >
                    <option value="breakfast">Breakfast Only</option>
                    <option value="halfboard">Half Board</option>
                    <option value="fullboard">Full Board</option>
                    <option value="allinclusive">All Inclusive</option>
                  </Field>
                  <ErrorMessage name="mealPlan" component="div" className="invalid-feedback" />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="specialRequests" className="form-label">Special Requests</label>
                <Field
                  as="textarea"
                  name="specialRequests"
                  rows="3"
                  className={`form-control ${errors.specialRequests && touched.specialRequests ? 'is-invalid' : ''}`}
                  placeholder="Any special requirements or requests (dietary restrictions, accessibility needs, etc.)..."
                />
                <ErrorMessage name="specialRequests" component="div" className="invalid-feedback" />
              </div>

              <div className="mb-3 form-check">
                <Field
                  type="checkbox"
                  name="agreeToTerms"
                  className={`form-check-input ${errors.agreeToTerms && touched.agreeToTerms ? 'is-invalid' : ''}`}
                  id="agreeToTerms"
                />
                <label className="form-check-label" htmlFor="agreeToTerms">
                  I agree to the <button type="button" className="btn btn-link p-0 text-primary" style={{textDecoration: 'underline'}}>Terms and Conditions</button> and <button type="button" className="btn btn-link p-0 text-primary" style={{textDecoration: 'underline'}}>Privacy Policy</button> *
                </label>
                <ErrorMessage name="agreeToTerms" component="div" className="invalid-feedback d-block" />
              </div>

              <div className="d-grid gap-2">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Processing Booking...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check-circle me-2"></i>
                      Confirm Booking
                    </>
                  )}
                </button>
                <p className="text-center text-muted small mb-0">
                  <i className="bi bi-shield-check me-1"></i>
                  Your information is secure and encrypted
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default BookingForm;
