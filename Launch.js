import React from 'react';
import PropTypes from 'prop-types';

const Launch = ({ id, rocketName, locationName, name, imgUrl, }) => (
  <div key={id} className="launch-card">
    <p>
      Name: {name}
    </p>
    <p>
      Location: {locationName}
    </p>
    <p>
      Rocket: {rocketName}
    </p>
    <img
      className="img"
      src={imgUrl}
      alt="rocket photo"
    />
  </div>
);

Launch.propTypes = {
  id: PropTypes.number.isRequired,
  rocketName: PropTypes.string,
  locationName: PropTypes.string,
  name: PropTypes.string,
  imgUrl: PropTypes.string,
};

Launch.defaultProps = {
  rocketName: 'Unknown rocket',
  locationName: 'Unknown location',
  name: 'Unknown launch',
  imgUrl: ''
};

export default Launch;