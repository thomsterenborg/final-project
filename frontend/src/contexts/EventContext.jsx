import React from "react";
import { createContext, useContext, useState } from "react";
import { useSessionStorage } from "primereact/hooks";

export const EventContext = createContext({});

EventContext.displayName = "EventContext";

export const EventContextProvider = ({ children }) => {
  const [availableEvents, setAvaiblabeEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useSessionStorage(
    null,
    "selectedCategory"
  );
  const [search, setSearch] = useState("");
  const [sort, setSort] = useSessionStorage("Default", "sort");

  const handleSort = (e) => {
    setSort(e.target.value);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSelectedCategory = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleAvailableEvents = (param) => {
    setAvaiblabeEvents(param);
  };

  const resetFilters = () => {
    setSort("Default");
    setSearch("");
    setSelectedCategory(null);
  };
  return (
    <EventContext.Provider
      value={{
        availableEvents,
        selectedCategory,
        search,
        sort,
        handleSort,
        handleSearch,
        handleSelectedCategory,
        handleAvailableEvents,
        resetFilters,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEvent must be used within EventContextProvider");
  }
  return context;
};
