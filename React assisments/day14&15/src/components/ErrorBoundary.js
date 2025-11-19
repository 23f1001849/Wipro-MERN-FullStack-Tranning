import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error, info) {
    const { componentName } = this.props;
    console.group(`ErrorBoundary captured error in ${componentName}`);
    console.error(error);
    console.info(info.componentStack);
    console.groupEnd();
  }

  handleReset = () => {
    this.setState({ hasError: false, errorMessage: '' });
  };

  render() {
    const { hasError, errorMessage } = this.state;
    const { fallback, children } = this.props;

    if (hasError) {
      if (fallback) {
        return fallback({ errorMessage, onRetry: this.handleReset });
      }

      return (
        <div className="alert alert-danger" role="alert">
          <p className="fw-semibold mb-1">Something went wrong.</p>
          <p className="mb-2">{errorMessage}</p>
          <button type="button" className="btn btn-light btn-sm" onClick={this.handleReset}>
            Try again
          </button>
        </div>
      );
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  componentName: PropTypes.string,
  fallback: PropTypes.func,
};

ErrorBoundary.defaultProps = {
  componentName: 'UnknownComponent',
  fallback: null,
};

export default ErrorBoundary;
