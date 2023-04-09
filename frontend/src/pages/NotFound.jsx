import React from "react";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="flex align-items-center justify-content-center w-full">
      <div className="p-card flex flex-column align-items-center justify-content-center gap-4 max-w-1200 w-full mt-8 p-8">
        <h1 className="text-8xl text-yellow-400 m-0">🙊</h1>
        <h1 className="text-8xl text-yellow-400 m-0">404</h1>
        <h2 className="m-0 ">Oops...</h2>
        <p className="mt-0">You've the taken the road less traveled</p>
        <h3 className="mt-6 mb-0">Let us help to get you back on track</h3>
        <div className="flex gap-4">
          <Link className="no-underline" to={"/"}>
            <Button label="Go back home" />
          </Link>
          <Link className="no-underline" to={"/events"}>
            <Button label="To all events" />
          </Link>
        </div>
      </div>
    </div>
  );
};
