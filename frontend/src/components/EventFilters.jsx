// @ts-nocheck
import React, { useEffect } from "react";
import { Menu } from "primereact/menu";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { useEvents } from "../contexts/EventContext";
import { Button } from "primereact/button";
import { useRef } from "react";
import { useCurrentUser } from "../contexts/UserContext";
import PropTypes from "prop-types";

export const EventFilters = ({ categories, onClick }) => {
  const { currentUser } = useCurrentUser();
  const mobileMenu = useRef(null);

  const {
    // @ts-ignore
    selectedCategory,
    handleSelectedCategory,
    handleSearch,
    sort,
    handleSort,
    resetFilters,
    searchInput,
    handleSearchInput,
  } = useEvents();

  //Debounce search input to prevent unnecessary fetches
  useEffect(() => {
    console.log(searchInput);
    const timeOutId = setTimeout(() => handleSearch(searchInput), 600);
    return () => clearTimeout(timeOutId);
  }, [searchInput]);

  //sort order item are defined here
  const sortOrders = [
    {
      name: "Date ascending",
      id: `dateasc`,
    },
    {
      name: "Date descending",
      id: `datedesc`,
    },
    {
      name: "Name A-z",
      id: `nameasc`,
    },
    {
      name: "Name z-A",
      id: `namedesc`,
    },
    {
      name: "Category",
      id: `catasc`,
    },
  ];

  //menu item are defined here
  const items = [
    {
      label: "Search",
      items: [
        {
          template: () => {
            return (
              <div className="flex justify-content-center w-full mb-4">
                <span className="p-input-icon-left w-full mx-3">
                  <i className="pi pi-search" />
                  <InputText
                    className="w-full"
                    placeholder="Search"
                    value={searchInput}
                    onChange={(e) => handleSearchInput(e.target.value)}
                  />
                </span>
              </div>
            );
          },
        },
      ],
    },
    {
      label: "Filters",
      items: [
        {
          template: () => {
            return (
              <>
                <div className="flex flex-column gap-2">
                  <p className="p-submenu-header text-sm">Category</p>
                  <div className="card flex justify-content-center">
                    <Dropdown
                      value={selectedCategory}
                      onChange={(e) => handleSelectedCategory(e)}
                      options={categories}
                      optionLabel="name"
                      placeholder="Select category"
                      className="w-full md:w-18rem mx-3"
                    />
                  </div>
                </div>
                <div>
                  <p className="p-submenu-header text-sm">Sort</p>
                  <div className="flex justify-content-center">
                    <Dropdown
                      value={sort}
                      onChange={(e) => handleSort(e)}
                      options={sortOrders}
                      optionLabel="name"
                      optionValue="name"
                      placeholder="Default"
                      className="w-full md:w-18rem mb-4 mx-3"
                    />
                  </div>
                </div>
                <div className="flex justify-content-center w-full mb-4">
                  <Button
                    severity="secondary"
                    label="Reset filters"
                    icon="pi pi-filter-slash"
                    onClick={() => resetFilters()}
                    outlined
                  />
                </div>
              </>
            );
          },
        },
      ],
    },
  ];

  return (
    <>
      <div className="card flex justify-content-start w-full mt-0 px-3 md:px-4">
        <Menu model={items} className="w-18rem" popup ref={mobileMenu} />
        <div className="flex justify-content-between w-full">
          <Button
            label="Filters & search"
            icon="pi pi-filter"
            onClick={(e) => mobileMenu.current.toggle(e)}
            raised
          />
          <Button
            label="Add event"
            icon="pi pi-plus"
            onClick={() => onClick(true)}
            disabled={!currentUser}
            tooltip={!currentUser ? "You have to log in to add an event" : null}
            tooltipOptions={{
              position: "bottom",
              mouseTrack: true,
              mouseTrackTop: 15,
              showOnDisabled: true,
            }}
            raised
          />
        </div>
      </div>
    </>
  );
};

EventFilters.propTypes = {
  categories: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
