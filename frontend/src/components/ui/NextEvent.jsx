import React from "react";
import PropTypes from "prop-types";
import { EventLocation } from "./EventLocation";
import { EventStartTime } from "./EventStartTime";
import { EventTitle } from "./EventTitle";

export const NextEvent = ({ title, image, location, startTime }) => {
  return (
    <div className="zoomin animation-duration-100 p-card flex flex-column md:flex-row max-w-1200 w-full md:h-20rem select-none highlighted-event">
      <img
        className="object-fit-cover w-full md:w-6 highlighted-image"
        src={image}
        alt="Event image"
      />
      <div className="w-full md:w-6 m-4">
        <h1 className="text-6xl text-gray-200 uppercase">next up.</h1>
        <EventTitle title={title} />
        <EventStartTime date={startTime} />
        <EventLocation location={location} />
      </div>
    </div>
  );
};

NextEvent.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  location: PropTypes.string,
  startTime: PropTypes.instanceOf(Date).isRequired,
};
