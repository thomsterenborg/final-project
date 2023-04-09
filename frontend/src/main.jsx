import React from "react";
import ReactDOM from "react-dom/client";
import { EventPage } from "./pages/EventPage";
import { EventsPage } from "./pages/EventsPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";
import { NotFound } from "./pages/NotFound";
import { UserProfile } from "./pages/UserProfile";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { ErrorElement } from "./components/ErrorElement";

//loaders
import { loader as eventsLoader } from "./pages/EventsPage";
import { loader as eventLoader } from "./pages/EventPage";
import { loader as homeLoader } from "./pages/Home";
import { loader as loginLoader } from "./pages/Login";
import { loader as userProfileLoader } from "./pages/UserProfile";

//Primereact and PrimeFlex imports
import PrimeReact from "primereact/api";
import "primereact/resources/themes/arya-orange/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core
import "primeicons/primeicons.css"; //icons
import "/node_modules/primeflex/primeflex.css"; //PrimeFlux
import "./styles/style.css";

PrimeReact.ripple = true; //this enables a nice on click effect on supported elements like buttons

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <ErrorElement />,
        loader: homeLoader,
      },
      {
        path: "/events",
        element: <EventsPage />,
        errorElement: <ErrorElement />,
        loader: eventsLoader,
      },
      {
        path: "/event/:eventId",
        element: <EventPage />,
        errorElement: <ErrorElement />,
        loader: eventLoader,
        // action: addComment,
      },
      {
        path: "/user/:userId",
        element: <UserProfile />,
        errorElement: <ErrorElement />,
        loader: userProfileLoader,
      },
      {
        path: "/login",
        element: <Login />,
        errorElement: <ErrorElement />,
        loader: loginLoader,
      },
      {
        path: "/notfound",
        element: <NotFound />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
