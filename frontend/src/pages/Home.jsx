// @ts-nocheck
import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { FeaturedEvent } from "../components/ui/FeauterdEvent";
import { NextEvent } from "../components/ui/NextEvent";
import { fetchData } from "../js/fetchers";

export const loader = async () => {
  const events = await fetchData("events?_sort=startTime&_order=asc");

  if (!events.ok) {
    throw new Error(
      `Failed to load events. ${events.status} ${events.statusText}`
    );
  }

  return { events: await events.json() };
};

export const Home = () => {
  const { events } = useLoaderData();

  const nextEvent = events.find(
    (event) => new Date() <= new Date(event.startTime) //gets the first item in from events that older than today.
  );
  const randomEvent = events[Math.floor(Math.random() * events.length)];

  return (
    <>
      <div className="flex flex-column align-items-center justify-content-center w-full h-full max-w-1200">
        <div className="flex justify-content-start flex-column w-full">
          <h1 className="mt-4 mb-0 text-gray-600">Welcome to</h1>
          <h1 className="text-6xl md:text-8xl text-gray-900 m-0">EVENTDASH.</h1>
        </div>
        <div className="flex gap-4 flex-column m-4 w-full">
          <Link className="no-underline" to={`/event/${randomEvent.id}`}>
            <FeaturedEvent
              title={randomEvent.title}
              image={randomEvent.image}
              startTime={randomEvent.startTime}
              location={randomEvent.location}
            />
          </Link>

          {nextEvent ? (
            <Link className="no-underline" to={`/event/${nextEvent.id}`}>
              <NextEvent
                title={nextEvent.title}
                image={nextEvent.image}
                startTime={nextEvent.startTime}
                location={nextEvent.location}
              />
            </Link>
          ) : null}
        </div>
      </div>
    </>
  );
};
