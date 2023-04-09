import React from "react";
import PropTypes from "prop-types";

export const EventTitle = ({ title }) => {
  return <h2 className="p-card-title mb-0 uppercase">{title}.</h2>;
};

EventTitle.propTypes = {
  title: PropTypes.string.isRequired,
};
