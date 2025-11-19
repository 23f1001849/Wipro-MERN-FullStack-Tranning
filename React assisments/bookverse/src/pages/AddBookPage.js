import React, { useMemo } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useBookContext } from '../context/BookContext';
import './AddBookPage.css';

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  author: Yup.string().required('Author is required'),
  price: Yup.number().typeError('Enter a valid price').positive('Price must be positive').required('Price is required'),
});

const initialValues = {
  title: '',
  author: '',
  price: '',
  description: '',
  pages: '',
  year: '',
  genres: '',
  authorTopBooks: '',
  image: '',
};

const parseListValue = (value) =>
  value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

const AddBookPage = () => {
  const navigate = useNavigate();
  const { actions, isSaving } = useBookContext();
  const cardTitle = useMemo(
    () => (isSaving ? 'Adding your book to the shelves…' : 'Add a new story to BookVerse'),
    [isSaving]
  );

  const handleSubmit = async (values, helpers) => {
    const payload = {
      title: values.title,
      author: values.author,
      price: Number(values.price),
      description: values.description,
      pages: values.pages ? Number(values.pages) : undefined,
      year: values.year ? Number(values.year) : undefined,
      genres: values.genres ? parseListValue(values.genres) : undefined,
      authorTopBooks: values.authorTopBooks ? parseListValue(values.authorTopBooks) : undefined,
      image: values.image,
    };

    try {
      await actions.addBook(payload);
      helpers.resetForm();
      navigate('/home');
    } catch (error) {
      helpers.setStatus(error.message || 'Unable to add book. Please try again.');
    }
  };

  return (
    <section className="route-fade">
      <div className="container py-5">
        <div className="mb-4 d-flex justify-content-between align-items-center flex-wrap gap-3 text-white">
          <div>
            <p className="text-uppercase text-white-50 mb-1">Day 13 · Flux + Forms</p>
            <h1 className="display-6 fw-semibold mb-0">BookVerse Admin Console</h1>
            <p className="text-white-50 mb-0">Add new books without page reloads thanks to SPA routing.</p>
          </div>
          <div className="d-flex gap-2">
            <Link to="/home" className="btn btn-outline-light">
              ← Back to Library
            </Link>
            <Link to="/book/1" className="btn btn-outline-warning">
              Preview SPA Flow
            </Link>
          </div>
        </div>

        <div className="add-book-card shadow-lg">
          <h2 className="h4 mb-3">{cardTitle}</h2>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ status }) => (
              <Form className="row g-3">
                <div className="col-md-6">
                  <label className="form-label" htmlFor="title">
                    Title*
                  </label>
                  <Field id="title" name="title" className="form-control" placeholder="Enter book title" />
                  <ErrorMessage component="div" className="invalid-feedback d-block" name="title" />
                </div>
                <div className="col-md-6">
                  <label className="form-label" htmlFor="author">
                    Author*
                  </label>
                  <Field id="author" name="author" className="form-control" placeholder="Enter author name" />
                  <ErrorMessage component="div" className="invalid-feedback d-block" name="author" />
                </div>
                <div className="col-md-4">
                  <label className="form-label" htmlFor="price">
                    Price* (USD)
                  </label>
                  <Field id="price" name="price" type="number" className="form-control" placeholder="12.99" />
                  <ErrorMessage component="div" className="invalid-feedback d-block" name="price" />
                </div>
                <div className="col-md-4">
                  <label className="form-label" htmlFor="year">
                    Release Year
                  </label>
                  <Field id="year" name="year" type="number" className="form-control" placeholder={new Date().getFullYear()} />
                </div>
                <div className="col-md-4">
                  <label className="form-label" htmlFor="pages">
                    Pages
                  </label>
                  <Field id="pages" name="pages" type="number" className="form-control" placeholder="320" />
                </div>
                <div className="col-12">
                  <label className="form-label" htmlFor="description">
                    Description
                  </label>
                  <Field
                    id="description"
                    name="description"
                    as="textarea"
                    rows="3"
                    className="form-control"
                    placeholder="Share what makes this book special"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label" htmlFor="genres">
                    Genres (comma separated)
                  </label>
                  <Field id="genres" name="genres" className="form-control" placeholder="Fantasy, Adventure" />
                </div>
                <div className="col-md-6">
                  <label className="form-label" htmlFor="authorTopBooks">
                    Author highlights (comma separated)
                  </label>
                  <Field
                    id="authorTopBooks"
                    name="authorTopBooks"
                    className="form-control"
                    placeholder="Previous works"
                  />
                </div>
                <div className="col-12">
                  <label className="form-label" htmlFor="image">
                    Cover Image URL
                  </label>
                  <Field id="image" name="image" className="form-control" placeholder="https://..." />
                </div>
                {status && (
                  <div className="col-12">
                    <div className="alert alert-danger mb-0" role="alert">
                      {status}
                    </div>
                  </div>
                )}
                <div className="col-12 d-flex justify-content-end gap-2">
                  <button type="reset" className="btn btn-outline-secondary" disabled={isSaving}>
                    Reset
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={isSaving}>
                    {isSaving ? 'Saving…' : 'Add Book'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default AddBookPage;
