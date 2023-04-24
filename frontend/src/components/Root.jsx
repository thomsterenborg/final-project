import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { UserContextProvider } from "../contexts/UserContext";
import { Footer } from "./ui/Footer";

export const Root = () => {
  return (
    <div className="flex align-items-center justify-content-center flex-column">
      <UserContextProvider>
        <Navigation />
        <Outlet />
      </UserContextProvider>
      <Footer />
    </div>
  );
};
