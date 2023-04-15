// @ts-nocheck
import React from "react";
import { Button } from "primereact/button";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { EventForm } from "../components/EventForm";
import { EventTitle } from "../components/ui/EventTitle";
import { EventDescription } from "../components/ui/EventDescription";
import { EventCreatedBy } from "../components/ui/EventCreatedBy";
import { EventStartTime } from "../components/ui/EventStartTime";
import { EventEndTime } from "../components/ui/EventEndTime";
import { EventLocation } from "../components/ui/EventLocation";
import { EventCategories } from "../components/ui/EventCategories";
import { EventImage } from "../components/ui/EventImage";
import { useCurrentUser } from "../contexts/UserContext";

import { Message } from "primereact/message";
import { classNames } from "primereact/utils";
import {
  Timestamp,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "../js/firebase";

export const loader = async ({ params }) => {
  const eventDoc = await getDoc(doc(db, "events", `${params.eventId}`));

  if (!eventDoc.exists()) return redirect("/notfound");

  const event = {
    ...eventDoc.data(),
    id: eventDoc.id,
    startTime: eventDoc.data().startTime.toDate(),
    endTime: eventDoc.data().endTime.toDate(),
  };

  const users = [];
  const usersDocs = await getDocs(collection(db, "users"));
  usersDocs.forEach((user) => users.push({ ...user.data(), id: user.id }));

  const categories = [];
  const categoriesDocs = await getDocs(collection(db, "categories"));
  categoriesDocs.forEach((category) =>
    categories.push({ ...category.data(), id: category.id })
  );

  return {
    event: event,
    users: users,
    categories: categories,
  };
};

export const EventPage = () => {
  const { currentUser } = useCurrentUser();
  const { users, event, categories } = useLoaderData();
  const [visible, setVisible] = useState(false);
  const [savingForm, setSavingForm] = useState(false);

  const navigate = useNavigate();

  const toast = useRef(null);

  //actions taken when users confirms deletion of event
  const accept = async () => {
    await deleteDoc(doc(db, "events", `${event.id}`))
      .then(() => {
        //show success message
        toast.current.show({
          severity: "success",
          summary: "Event deleted",
          detail:
            "The event has successfully been deleted. We will redirect you to the Events page.",
          life: 5000,
        });
        setTimeout(() => {
          setVisible(false);
          setSavingForm(false);
          navigate(`/events`);
        }, 3000);
      })
      .catch((error) => {
        //show error message to user
        toast.current.show({
          severity: "error",
          summary: "Event not updated",
          detail: `Deleting events has been disabled in Live Preview: ${error})`,
          life: 9000,
        });
        setVisible(false);
        setSavingForm(false);
      });
  };

  //actions taken when users cancels deletion of event
  const reject = () => {
    toast.current.show({
      severity: "warn",
      summary: "Event not deleted",
      detail: "Deletion of event canceled by user",
      life: 9000,
    });
  };

  //Delete button popover
  const handleDelete = (e) => {
    confirmPopup({
      target: e.currentTarget,
      message: "Do you really want to delete this event?",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept,
      reject,
    });
  };

  //Initial values for event edit form
  const initialValues = {
    createdBy: event.createdBy,
    title: event.title,
    description: event.description,
    image: event.image,
    categoryIds: event.categoryIds,
    location: event.location,
    startTime: new Date(event.startTime),
    endTime: new Date(event.endTime),
  };

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

    await setDoc(doc(db, "events", `${event.id}`), eventData)
      .then(() => {
        //show success message
        toast.current.show({
          severity: "success",
          summary: "Event updated",
          detail: "The event has successfully been updated",
          life: 5000,
        });
        setVisible(false);
        setSavingForm(false);
        navigate(`/event/${event.id}`);
      })
      .catch((error) => {
        //show error message to user
        toast.current.show({
          severity: "error",
          summary: "Event not updated",
          detail: `Editing events has been disabled in Live Preview: ${error})`,
          life: 9000,
        });

        setVisible(false);
        setSavingForm(false);
      });
  };

  return (
    <div className="max-w-1200  w-full">
      <h1 className="text-gray-900 font-bold text-7xl ml-0 m-4 uppercase">
        EVENT.
      </h1>

      <div className="p-card p-4 flex flex-column max-w-1200 h-fit">
        <div className="flex h-full flex-column md:flex-row">
          <div className="w-8">
            <div className="flex flex-column w-full">
              <div className="flex gap-1">
                <Button
                  icon="pi pi-arrow-left"
                  rounded
                  text
                  onClick={() => navigate(-1)}
                />
                <Button
                  icon="pi pi-pencil"
                  rounded
                  text
                  onClick={() => setVisible(true)}
                  disabled={!currentUser}
                />
                <Toast ref={toast} />
                <ConfirmPopup />
                <Button
                  icon="pi pi-trash"
                  severity="danger"
                  onClick={handleDelete}
                  disabled={!currentUser}
                  rounded
                  text
                />
              </div>
              <div
                className={classNames({
                  "p-hidden": currentUser,
                  "w-full": true,
                  "mt-3": true,
                })}
              >
                <Message
                  severity="warn"
                  text="Log in to edit or delete events"
                />
              </div>
            </div>

            <div className="flex flex-column justify-content-center">
              <EventTitle title={event.title} />
              <EventDescription description={event.description} />

              {new Date(event.startTime) < new Date() ? (
                <Message
                  severity="warn"
                  text="You've missed this event!"
                  style={{ height: "2rem" }}
                  className="mt-2 mr-4 w-16rem"
                />
              ) : null}
              <EventStartTime date={event.startTime} />
              <EventEndTime date={event.endTime} />

              <EventLocation location={event.location} />

              <EventCategories
                categories={categories}
                categoryIds={event.categoryIds}
              />
              <EventCreatedBy users={users} createdBy={event.createdBy} />
            </div>
          </div>

          <div className="w-full  md:w-8 m-0 p-0">
            <EventImage imageURL={event.image} />
          </div>
        </div>
      </div>

      <div className="card flex flex-column justify-content-center">
        <Dialog
          header="Edit event"
          visible={visible}
          style={{ width: "600px" }}
          onHide={() => setVisible(false)}
        >
          <EventForm
            initialValues={initialValues}
            categories={categories}
            onSubmit={submitForm}
            savingForm={savingForm}
          />
        </Dialog>
      </div>
    </div>
  );
};
