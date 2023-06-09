// @ts-nocheck
import React from "react";
import { Menubar } from "primereact/menubar";
import { useCurrentUser } from "../contexts/UserContext";
import { Link } from "react-router-dom";

export const Navigation = () => {
  const { currentUser } = useCurrentUser();

  let userURL = "/login";
  if (currentUser) userURL = `/user/${currentUser.id}`;

  let userName = "Log in";
  if (currentUser) userName = currentUser.name;

  const items = [
    { label: "Home", icon: "pi pi-home", url: "/" },
    { label: "Events", icon: "pi pi-calendar", url: "/events" },
    { label: userName, icon: "pi pi-user", url: userURL },
  ];

  const end = (
    <Link className="no-underline" to={"/events"}>
      <h1 className="uppercase text-gray-100 m-0">eventdash.</h1>
    </Link>
  );

  return (
    <nav className="flex align-items-center justify-content-center gap-3 w-full max-w-1200">
      <Menubar className="w-full" model={items} end={end} />
    </nav>
  );
};
