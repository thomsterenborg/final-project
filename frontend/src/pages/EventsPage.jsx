// @ts-nocheck
import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { EventList } from "../components/EventList";
import { EventContextProvider } from "../contexts/EventContext";
import { Dialog } from "primereact/dialog";
import { useRef, useState } from "react";
import { EventForm } from "../components/EventForm";
import { addData, fetchData } from "../js/fetchers";
import { Toast } from "primereact/toast";
import { useCurrentUser } from "../contexts/UserContext";
import { EventFilters } from "../components/EventFilters";

export const loader = async () => {
  const categories = await fetchData("categories");

  if (!categories.ok) {
    throw new Error(
      `Failed to load categories. ${categories.status} ${categories.statusText}`
    );
  }

  return { categories: await categories.json() };
};

export const EventsPage = () => {
  const { categories } = useLoaderData();
  const { currentUser } = useCurrentUser();

  const [visible, setVisible] = useState(false);

  const toast = useRef(null);

  let userid = 0;
  if (currentUser) userid = currentUser.id;

  //Initial values for add event form
  const initialValues = {
    createdBy: userid,
    title: "",
    description: "",
    image: "",
    categoryIds: [],
    location: "",
    startTime: new Date(),
    endTime: "",
  };

  const navigate = useNavigate(); //used for redirection

  const [savingForm, setSavingForm] = useState(false);

  const submitForm = async (values) => {
    setSavingForm(true);
    const response = await addData("events", values);

    const json = await response.json();
    const newId = json.id;

    if (!response.ok) {
      toast.current.show({
        severity: "error",
        summary: "Event not added",
        detail: "Could not add event",
        life: 3000,
      });
      setSavingForm(false);
    }

    if (response.ok) {
      toast.current.show({
        severity: "success",
        summary: "Event added",
        detail:
          "The event has succesfuly been added. You will be redirect to your new event",
        life: 3000,
      });
      //timeout for toast
      setTimeout(() => {
        setSavingForm(false);
        navigate(`/event/${newId}`);
      }, 3000);
    }
  };

  return (
    <>
      <div className="flex justify-content-start flex-column max-w-1200 w-full">
        <h1 className="text-gray-900 font-bold text-7xl ml-0 m-4 uppercase">
          events.
        </h1>

        <div className="flex flex-column  gap-3 w-full">
          <EventContextProvider>
            <EventFilters categories={categories} onClick={setVisible} />

            <EventList categories={categories} />
          </EventContextProvider>
        </div>
        <div className="card flex flex-column justify-content-center">
          <Dialog
            header="Add event"
            visible={visible}
            style={{ width: "600px" }}
            onHide={() => setVisible(false)}
          >
            <Toast ref={toast} />
            <EventForm
              initialValues={initialValues}
              categories={categories}
              savingForm={savingForm}
              onSubmit={submitForm}
            />
          </Dialog>
        </div>
      </div>
    </>
  );
};
