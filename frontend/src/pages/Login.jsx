// @ts-nocheck
import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { addData, fetchData } from "../js/fetchers";
import { useCurrentUser } from "../contexts/UserContext";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { UserForm } from "../components/UserForm";
import { useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../js/firebase";

export const loader = async () => {
  const users = [];
  const usersDocs = await getDocs(collection(db, "users"));
  usersDocs.forEach((user) => users.push({ ...user.data(), id: user.id }));

  return { users: users };
};

export const Login = () => {
  const { users } = useLoaderData();
  const { handleCurrentUser } = useCurrentUser();
  const [visible, setVisible] = useState(false);
  const [savingForm, setSavingForm] = useState(false);
  const toast = useRef(null);
  const navigate = useNavigate();

  const submitForm = async (values) => {
    setSavingForm(true);

    const userData = {
      name: values.name,
      image: values.image,
    };

    try {
      const response = await addDoc(collection(db, "users"), userData);

      const newId = response.id;
      console.log(newId);
      //show success message
      toast.current.show({
        severity: "success",
        summary: "Account created",
        detail: "Your account had been created",
        life: 5000,
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
        summary: "Account not created",
        detail: `Creating accounts has been disabled in Live Preview. ${error}`,
        life: 9000,
      });
      setVisible(false);
      setSavingForm(false);
    }
  };

  const initialValues = {
    name: "",
    image: "",
  };

  return (
    <div className="flex flex-column align-items-center justify-content-center w-full">
      <Toast ref={toast} />
      <div className="p-card flex flex-column align-items-center justify-content-center gap-4 max-w-30rem w-full mt-8 p-8">
        <h2 className="m-0 ">Select your account</h2>
        {users.map((user) => (
          <Button
            key={user.id}
            value={user}
            className="w-20rem"
            onClick={() => handleCurrentUser(user)}
            disabled={user.name === "GLaDOS"}
            tooltip={
              user.name === "GLaDOS"
                ? "THE CAKE IS A LIE! GLaDOS has been banned after people have disappeared after joining previous events organized by GLaDOS"
                : null
            }
            tooltipOptions={{
              position: "bottom",
              mouseTrack: true,
              mouseTrackTop: 15,
              showOnDisabled: true,
            }}
          >
            <div className="flex flex-column gap-4">
              <div className="flex gap-2 justify-content-center align-items-center">
                <Avatar icon="pi pi-user" image={user.image} shape="circle" />
                <p>{user.name}</p>
              </div>
            </div>
          </Button>
        ))}
        <div className="flex flex-column justify-content-center align-items-center">
          <p>Is your account not listed?</p>
          <Button
            label="Create a new one"
            onClick={() => setVisible(true)}
            outlined
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
  );
};
