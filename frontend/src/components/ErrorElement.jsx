// @ts-nocheck
import React from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export const ErrorElement = () => {
  const error = useRouteError();

  return (
    <div className="p-card flex flex-column justify-content-center align-items-center w-full h-fit max-w-1200 mt-4 p-4">
      <h1 className="p-card-title">Something went wrong</h1>
      <p className="mb-0">We couldn't load the page, please try again.</p>
      <p className="mt-0">if the issue presist the server might be down.</p>
      <small>Error: {error.message}</small>
    </div>
  );
};
