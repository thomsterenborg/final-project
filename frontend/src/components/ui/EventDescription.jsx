import React from "react";
import PropTypes from "prop-types";

export const EventDescription = ({ description }) => {
  return <h4 className="p-card-subtitle mt-1">{description}</h4>;
};

EventDescription.proptTypes = {
  description: PropTypes.string.isRequired,
};
