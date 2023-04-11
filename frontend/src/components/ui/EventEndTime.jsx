import React from "react";
import { transformDate } from "../../js/functions";
import PropTypes from "prop-types";

export const EventEndTime = ({ date }) => {
  return (
    <p>
      <span className="text-yellow-500">End time:</span> {transformDate(date)}
    </p>
  );
};

EventEndTime.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
};
