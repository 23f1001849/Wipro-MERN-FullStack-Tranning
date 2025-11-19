import React from 'react';

const OfflineBanner = ({ isOnline }) => {
  if (isOnline) {
    return null;
  }

  return (
    <div className="offline-banner" role="status" aria-live="assertive">
      <strong>Offline mode:</strong>
      <span className="ms-2">Changes will sync once you are back online.</span>
    </div>
  );
};

export default OfflineBanner;
