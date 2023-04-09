import React from "react";
import { EventCardSkeleton } from "./EventCardSkeleton";

export const EventListLoading = () => {
  //loading screen for events
  return (
    <>
      <EventCardSkeleton />
      <EventCardSkeleton />
      <EventCardSkeleton />
      <EventCardSkeleton />
      <EventCardSkeleton />
      <EventCardSkeleton />
    </>
  );
};
