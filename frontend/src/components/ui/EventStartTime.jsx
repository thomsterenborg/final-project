import React from "react";
import { transformDate } from "../../js/functions";
import PropTypes from "prop-types";

export const EventStartTime = ({ date }) => {
  return (
    <p className="mb-0">
      <span className="text-yellow-500">Start time:</span> {transformDate(date)}
    </p>
  );
};

EventStartTime.propTypes = {
  date: PropTypes.string.isRequired,
};
