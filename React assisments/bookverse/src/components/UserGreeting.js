import React from 'react'; 
import PropTypes from 'prop-types';

const UserGreeting = ({ render }) => {
  const hour = new Date().getHours();
  const partOfDay = hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : 'evening';
  return render(partOfDay);
};

UserGreeting.propTypes = {
  render: PropTypes.func.isRequired,
};

export default UserGreeting;
