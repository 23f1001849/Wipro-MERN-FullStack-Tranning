import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container mt-5">
          <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">Oops! Something went wrong</h4>
            <p>We're sorry, but something unexpected happened. Please refresh the page and try again.</p>
            <hr />
            <p className="mb-0">
              <button 
                className="btn btn-primary"
                onClick={() => window.location.href = '/'}
              >
                Go to Homepage
              </button>
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
