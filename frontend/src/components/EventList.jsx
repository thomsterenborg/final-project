// @ts-nocheck
import React from "react";
import { useEffect, useState } from "react";
import { useEvents } from "../contexts/EventContext";
import { fetchData } from "../js/fetchers";
import { EventCard } from "./ui/EventCard";
import PropTypes from "prop-types";
import { EventListLoading } from "./ui/EventListLoading";

import { Paginator } from "primereact/paginator";

export const EventList = ({ categories }) => {
  const [isLoading, setLoading] = useState(false);

  const {
    availableEvents,
    search,
    sort,
    selectedCategory,
    handleAvailableEvents,
  } = useEvents();

  //Pagination
  const [firstEvent, setFirstEvent] = useState(0);
  const [totalEvents, setTotalEvents] = useState(0);

  const onPageChange = (event) => {
    setFirstEvent(event.first);
  };

  //fetch events on load and when conditions change
  useEffect(() => {
    const getEvents = async () => {
      setLoading(true);

      //building the url for data fetching based on users choiches
      let sortOrder;
      switch (sort) {
        case "Default":
          sortOrder = "";
          break;

        case "Date ascending":
          sortOrder = "_sort=startTime&_order=asc";
          break;

        case "Date descending":
          sortOrder = "_sort=startTime&_order=desc";
          break;

        case "Name A-z":
          sortOrder = "_sort=title&_order=asc";
          break;

        case "Name z-A":
          sortOrder = "_sort=title&_order=desc";
          break;

        case "Category":
          sortOrder = "_sort=categoryIds&_order=asc";
          break;

        default:
          sortOrder = "Default";
      }

      let categoryPart = "";

      if (selectedCategory !== null && selectedCategory !== undefined) {
        categoryPart = `&categoryIds_like=${selectedCategory.id}`;
      }

      let searchPart = "";
      if (search !== "") {
        searchPart = `&title_like=${search}`;
      }

      //here the data is getting fetched based on users choices
      const response = await fetchData(
        `events?${sortOrder}${categoryPart}${searchPart}&_start=${firstEvent}&_limit=6`
      );

      if (!response.ok) {
        setLoading(false);
        throw new Error(
          `Failed to load events. ${response.status} ${response.statusText}`
        );
      }

      const amountOfEvents = response.headers.get("X-Total-Count");

      setTotalEvents(amountOfEvents);
      handleAvailableEvents(await response.json());

      setLoading(false);
    };

    getEvents();
  }, [sort, selectedCategory, search, firstEvent]);

  return (
    <div className="flex flex-column  max-w-1200 w-full">
      {isLoading ? (
        <div className="card flex flex-wrap gap-4 justify-content-center w-full pt-0">
          <EventListLoading />
        </div>
      ) : (
        <>
          {availableEvents.length > 0 ? (
            <div className="card flex flex-wrap gap-4 justify-content-center w-full pt-0">
              {availableEvents.map((event) => (
                <EventCard
                  key={event.id}
                  id={event.id}
                  title={event.title}
                  description={event.description}
                  image={event.image}
                  startTime={event.startTime}
                  endTime={event.endTime}
                  categoryIds={event.categoryIds}
                  categories={categories}
                />
              ))}
            </div>
          ) : (
            <div className="p-card flex flex-column justify-content-center align-items-center w-full">
              <h1 className="text-yellow-400 text-4xl">No events found</h1>
              <p>Please try different keywords</p>
            </div>
          )}
        </>
      )}
      <div className="card">
        <Paginator
          first={firstEvent}
          rows={6}
          totalRecords={totalEvents}
          onPageChange={onPageChange}
          className="mt-4 mr-2"
        />
      </div>
    </div>
  );
};

EventList.propTypes = {
  categories: PropTypes.array.isRequired,
};
