import React from "react";
import { createContext, useContext, useState } from "react";
import { useSessionStorage } from "primereact/hooks";

export const EventContext = createContext({});

EventContext.displayName = "EventContext";

export const EventContextProvider = ({ children }) => {
  const [availableEvents, setAvailableEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useSessionStorage(
    null,
    "selectedCategory"
  );
  const [search, setSearch] = useState("");
  const [sort, setSort] = useSessionStorage("Date ascending", "sort");
  const [searchInput, setSearchInput] = useState("");

  const handleSort = (e) => {
    setSort(e.target.value);
  };

  const handleSearch = (e) => {
    setSearch(e);
  };

  const handleSelectedCategory = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleAvailableEvents = (param) => {
    setAvailableEvents(param);
  };

  const handleSearchInput = (e) => {
    setSearchInput(e);
  };

  const resetFilters = () => {
    setSort("Date ascending");
    setSearch("");
    setSelectedCategory(null);
    setSearchInput("");
  };
  return (
    <EventContext.Provider
      value={{
        availableEvents,
        selectedCategory,
        search,
        sort,
        searchInput,
        handleSort,
        handleSearch,
        handleSelectedCategory,
        handleAvailableEvents,
        handleSearchInput,
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
