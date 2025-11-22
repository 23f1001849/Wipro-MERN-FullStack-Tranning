import PropTypes from 'prop-types';

export default function TeamCard({ name, role, favoriteColor }) {
  return (
    <div className="col-md-4">
      <div className="team-card" style={{ borderColor: favoriteColor }}>
        <h3>{name}</h3>
        <p>{role}</p>
        <span className="badge" style={{ backgroundColor: favoriteColor }}>
          Favorite Color
        </span>
      </div>
    </div>
  );
}

TeamCard.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  favoriteColor: PropTypes.string,
};

TeamCard.defaultProps = {
  favoriteColor: '#0ea5e9',
};
