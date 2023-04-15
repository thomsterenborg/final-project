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
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "../js/firebase";

export const loader = async () => {
  const categories = [];
  const categoriesDocs = await getDocs(collection(db, "categories"));
  categoriesDocs.forEach((category) =>
    categories.push({ ...category.data(), id: category.id })
  );
  return { categories: categories };
};

export const EventsPage = () => {
  const { categories } = useLoaderData();
  const { currentUser } = useCurrentUser();

  const [visible, setVisible] = useState(false);

  const toast = useRef(null);

  let userId = 0;
  if (currentUser) userId = currentUser.id;

  //initial values for Add event form
  const initialValues = {
    createdBy: userId,
    title: "",
    description: "",
    image: "",
    categoryIds: [],
    location: "",
    startTime: new Date(),
    endTime: "",
  };

  const navigate = useNavigate();

  const [savingForm, setSavingForm] = useState(false);

  const submitForm = async (values) => {
    setSavingForm(true);

    const eventData = {
      createdBy: values.createdBy,
      title: values.title.toLocaleLowerCase(),
      keywords: values.title.split(" "),
      description: values.description,
      image: values.image,
      categoryIds: values.categoryIds,
      location: values.location,
      startTime: Timestamp.fromDate(new Date(values.startTime)),
      endTime: Timestamp.fromDate(new Date(values.endTime)),
    };

    try {
      const response = await addDoc(collection(db, "events"), eventData);

      const newId = response.id;

      //show success message
      toast.current.show({
        severity: "success",
        summary: "Event created",
        detail: "The event has successfully been created",
        life: 3000,
      });

      //redirect to new event
      setTimeout(() => {
        setVisible(false);
        setSavingForm(false);
        navigate(`/event/${newId}`);
      }, 3000);
    } catch (error) {
      //show error
      toast.current.show({
        severity: "error",
        summary: "Event not created",
        detail: `Creating events has been disabled in Live Preview. ${error}`,
        life: 5000,
      });

      setTimeout(() => {
        setVisible(false);
        setSavingForm(false);
      }, 5000);
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
            {/* Form starts here */}
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
