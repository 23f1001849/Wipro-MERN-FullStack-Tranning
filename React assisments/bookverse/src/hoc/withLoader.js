import React from 'react';

const withLoader = (WrappedComponent) => {
  const WithLoader = ({ isLoading, loaderText, ...rest }) => {
    if (isLoading) {
      return (
        <div className="loader-wrapper">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          {loaderText && <p className="text-muted mt-3">{loaderText}</p>}
        </div>
      );
    }

    return <WrappedComponent {...rest} />;
  };

  const wrappedName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithLoader.displayName = `withLoader(${wrappedName})`;

  return WithLoader;
};

export default withLoader;
