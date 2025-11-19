import React from 'react';
import PropTypes from 'prop-types';

const StatsCard = React.memo(({ title, value, lastUpdated }) => {
  console.log(`[StatsCard] ${title} rendered at ${new Date().toLocaleTimeString()}`);
  return (
    <div className="stats-card shadow-sm">
      <p className="text-uppercase text-muted small mb-1">{title}</p>
      <h3 className="display-6 fw-semibold mb-1">{value}</h3>
      <p className="text-muted mb-0">Updated {lastUpdated}</p>
    </div>
  );
});

StatsCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  lastUpdated: PropTypes.string.isRequired,
};

export default StatsCard;
