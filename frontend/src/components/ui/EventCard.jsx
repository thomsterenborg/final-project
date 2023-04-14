import React from "react";
import PropTypes from "prop-types";
import { Card } from "primereact/card";
import { Link } from "react-router-dom";
import { Message } from "primereact/message";
import { EventStartTime } from "./EventStartTime";
import { EventEndTime } from "./EventEndTime";
import { EventCategories } from "./EventCategories";

export const EventCard = ({
  id,
  title,
  description,
  image,
  categoryIds,
  startTime,
  endTime,
  categories,
}) => {
  return (
    <Link className="no-underline w-full md:max-w-23rem" to={`/event/${id}`}>
      <Card
        title={`${title}.`}
        subTitle={description}
        className="zoomin animation-duration-100 md:max-w-23rem w-full h-fit shadow-6 event-card"
      >
        <img
          width="100%"
          height="220px"
          src={image}
          alt="Event image"
          className="object-fit-cover border-round"
        />

        {new Date(startTime) < new Date() ? (
          <Message
            severity="warn"
            text="You've missed this event!"
            style={{ height: "2rem" }}
            className="mt-2 w-full"
          />
        ) : null}

        <EventStartTime date={startTime} />
        <EventEndTime date={endTime} />
        <EventCategories categories={categories} categoryIds={categoryIds} />
      </Card>
    </Link>
  );
};

EventCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  categoryIds: PropTypes.array.isRequired,
  location: PropTypes.string,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
};
