// @ts-nocheck
import React from "react";
import { useEffect, useState } from "react";
import { useEvents } from "../contexts/EventContext";
import { fetchData } from "../js/fetchers";
import { EventCard } from "./ui/EventCard";
import PropTypes from "prop-types";
import { EventListLoading } from "./ui/EventListLoading";

import { Paginator } from "primereact/paginator";
import {
  collection,
  endAt,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  startAt,
  where,
} from "firebase/firestore";
import { db } from "../js/firebase";
import { Button } from "primereact/button";

export const EventList = ({ categories }) => {
  const [isLoading, setLoading] = useState(false);
  const [isLoadingMore, setLoadingMore] = useState(false);
  const [loadMore, setLoadMore] = useState(0);
  const [last, setLast] = useState("");

  const {
    availableEvents,
    search,
    sort,
    selectedCategory,
    handleAvailableEvents,
  } = useEvents();

  //Pagination
  let totalEvents = {};
  let lastVisible = "";

  const handleLoadMore = () => {
    setLoadingMore(true);
    setLoadMore(loadMore + 1);
  };

  //fetch events on load and when conditions change
  useEffect(() => {
    const getEvents = async () => {
      if (!isLoadingMore) setLoading(true);

      //building the url for data fetching based on users choices

      let conditions = [];
      if (search !== "" && sort !== "Name A-z" && sort !== "Name z-A")
        conditions.push(orderBy("title", "desc"));

      switch (sort) {
        case "Date ascending":
          conditions.push(orderBy("startTime"));
          break;

        case "Date descending":
          conditions.push(orderBy("startTime", "desc"));
          break;

        case "Name A-z":
          conditions.push(orderBy("title"));
          break;

        case "Name z-A":
          conditions.push(orderBy("title", "desc"));
          break;

        case "Category":
          conditions.push(orderBy("categoryIds"));
          break;

        default:
          break;
      }

      if (search !== "")
        conditions.push(
          where("title", ">=", `${search}`),
          where("title", "<=", `${search}` + "~")
        );

      if (selectedCategory !== null && selectedCategory !== undefined)
        conditions.push(
          where("categoryIds", "array-contains", `${selectedCategory.id}`)
        );

      if (isLoadingMore) conditions.push(startAfter(last));

      const q = query(collection(db, "events"), ...conditions, limit(6));
      const countQ = query(collection(db, "events"), ...conditions);

      const eventCount = await getCountFromServer(countQ);
      if (!isLoadingMore) totalEvents = eventCount.data().count;

      const events = isLoadingMore ? [...availableEvents] : [];
      console.log(events);

      const eventsDocs = await getDocs(q);

      if (!isLoadingMore)
        setLast(eventsDocs.docs[eventsDocs.docs.length - 1].data().startTime);
      console.log(last);

      eventsDocs.forEach((event) =>
        events.push({
          ...event.data(),
          id: event.id,
          startTime: event.data().startTime.toDate(),
          endTime: event.data().endTime.toDate(),
        })
      );
      console.log(events);

      // const nextEvents = [];

      // if (isLoadingMore)
      //   eventsDocs.forEach((event) =>
      //     nextEvents.push({
      //       ...event.data(),
      //       id: event.id,
      //       startTime: event.data().startTime.toDate(),
      //       endTime: event.data().endTime.toDate(),
      //     })
      //   );
      // if (isLoadingMore) console.log("next:", nextEvents);

      handleAvailableEvents(events);

      setLoading(false);
      setLoadingMore(false);
    };

    getEvents();
  }, [sort, selectedCategory, search, loadMore]);

  const hasMoreEvents = totalEvents < availableEvents;

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
        <Button
          label={hasMoreEvents ? "Load more" : "No more events"}
          onClick={() => handleLoadMore()}
        />
      </div>
    </div>
  );
};

EventList.propTypes = {
  categories: PropTypes.array.isRequired,
};
