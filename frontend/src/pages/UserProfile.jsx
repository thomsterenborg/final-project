// @ts-nocheck
import React from "react";
import { Link, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { fetchData, updateData } from "../js/fetchers";
import { useCurrentUser } from "../contexts/UserContext";
import { useEffect, useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { DataView } from "primereact/dataview";
import { EventStartTime } from "../components/ui/EventStartTime";
import { EventEndTime } from "../components/ui/EventEndTime";
import { Button } from "primereact/button";
import { UserForm } from "../components/UserForm";

export const loader = async ({ params }) => {
  //validate if signed in user and request profile are the same user
  const signedInUser = JSON.parse(localStorage.getItem("currentUser"));
  if (signedInUser.id != params.userId) return redirect("/login");

  const user = await fetchData(`users/${params.userId}`);
  const events = await fetchData(`events?createdBy=${params.userId}`);

  if (!user.ok) {
    switch (user.status) {
      case 404:
        return redirect("/notfound");

      default:
        throw new Error(
          `Failed to load user. ${user.status} ${user.statusText}`
        );
    }
  }

  if (!events.ok) {
    throw new Error(
      `Failed to load categories. ${events.status} ${events.statusText}`
    );
  }

  return {
    user: await user.json(),
    events: await events.json(),
  };
};

export const UserProfile = () => {
  const { user, events } = useLoaderData();

  const { handleCurrentUser } = useCurrentUser();

  const [visible, setVisible] = useState(false);
  const [savingForm, setSavingForm] = useState(false);

  const toast = useRef(null);
  const navigate = useNavigate();

  const submitForm = async (values) => {
    setSavingForm(true);
    const response = await updateData(`users/${user.id}`, values);

    if (response.ok) {
      toast.current.show({
        severity: "success",
        summary: "Profile updated",
        detail: "Your profile has succesfully been updated",
        life: 5000,
      });
      setVisible(false);
      setSavingForm(false);
      navigate(`/user/${user.id}`);
    }

    if (!response.ok) {
      toast.current.show({
        severity: "error",
        summary: "Profile not updatet",
        detail: `Your profile could not be updatet (${response.status} ${response.statusText})`,
        life: 5000,
      });
      setVisible(false);
      setSavingForm(false);
    }
  };

  const handleSignOut = () => {
    handleCurrentUser(null);
  };

  const itemTemplate = (event) => {
    return (
      <div className="col-12 w-full">
        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4 w-full">
          <img
            className="w-9 sm:w-16rem xl:w-10rem h-6 h-12rem xl:h-7rem shadow-2 block xl:block mx-auto border-round object-fit-cover"
            src={event.image}
            alt={event.title}
          />
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4 w-full">
            <div className="flex flex-column align-items-center sm:align-items-start gap-3 w-full">
              <Link className="no-underline" to={`/event/${event.id}`}>
                <div className="text-2xl text-yellow-400 font-bold text-900 mb-0 uppercase w-full">
                  {event.title}.
                </div>
              </Link>
              <div className="flex align-items-center mt-0 gap-3 w-full">
                <span className="flex flex-column ">
                  <EventStartTime date={event.startTime} />
                  <EventEndTime date={event.endTime} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const initialValues = {
    name: user.name,
    image: user.image,
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="flex justify-content-start flex-column max-w-1200 w-full">
        <h1 className="text-gray-900 font-bold text-7xl ml-0 m-4 uppercase">
          your profile.
        </h1>
        <div className="flex flex-column md:flex-row gap-6 w-full">
          <div className="p-card flex flex-column justify-content-center align-items-center p-4 w-full md:max-w-20rem h-26rem">
            <img
              src={user.image}
              alt="Profile picture"
              className="profile-picture"
            />
            <h1>{user.name}</h1>
            <Button
              label="Edit profile"
              icon="pi pi-pencil"
              onClick={() => setVisible(true)}
              outlined
            />
            <Button
              severity="secondary"
              label="Sign out"
              icon="pi pi-sign-out"
              className="mt-4"
              onClick={handleSignOut}
              outlined
            />
          </div>
          <div className="p-card flex flex-column align-items-center w-full h-fit">
            <h1 className="p-card-title text-4xl">Your events.</h1>
            <DataView
              value={events}
              itemTemplate={itemTemplate}
              paginator
              rows={5}
              className="w-full"
            />
          </div>
        </div>
        <div className="card flex flex-column justify-content-center">
          <Dialog
            header="Edit profile"
            visible={visible}
            style={{ width: "600px" }}
            onHide={() => setVisible(false)}
          >
            {/* Form starts here */}
            <UserForm
              initialValues={initialValues}
              savingForm={savingForm}
              onSubmit={submitForm}
            />
          </Dialog>
        </div>
      </div>
    </>
  );
};
