import React from "react";
import PropTypes from "prop-types";

export const EventLocation = ({ location }) => {
  return (
    <p className="mt-2">
      <span className="text-yellow-500">Location:</span> {location}
    </p>
  );
};

EventLocation.propTypes = {
  location: PropTypes.string.isRequired,
};
