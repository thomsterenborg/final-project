import React from "react";
import PropTypes from "prop-types";

export const EventImage = ({ imageURL }) => {
  return (
    <img
      width="100%"
      height="100%"
      src={imageURL}
      alt="Image"
      className="object-fit-cover"
    />
  );
};

EventImage.propTypes = {
  imageURL: PropTypes.string.isRequired,
};
