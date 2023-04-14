// @ts-nocheck
// cSpell:ignore winc, localstorage, primereact, nocheck, eventdash, zoomin, chakra, primeflex, formik
import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { FeaturedEvent } from "../components/ui/FeaturedEvent";
import { NextEvent } from "../components/ui/NextEvent";
import { fetchData } from "../js/fetchers";
import { useLocalStorage } from "primereact/hooks";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

export const loader = async () => {
  const events = await fetchData("events?_sort=startTime&_order=asc");

  if (!events.ok) {
    throw new Error(
      `Failed to load events. ${events.status} ${events.statusText}`
    );
  }

  return { events: await events.json() };
};

export const Home = () => {
  const { events } = useLoaderData();
  const [showWelcome, setShowWelcome] = useLocalStorage(true, "showWelcome");

  const dialogFooterContent = (
    <div>
      <Button
        label="Close"
        icon="pi pi-times"
        onClick={() => setShowWelcome(false)}
        className="mt-2"
        autoFocus
      />
    </div>
  );

  const nextEvent = events.find(
    (event) => new Date() <= new Date(event.startTime) //gets the first item in from events that older than today.
  );
  const randomEvent = events[Math.floor(Math.random() * events.length)]; //gets random event to show as featured

  return (
    <>
      <div className="flex flex-column align-items-center justify-content-center w-full h-full max-w-1200">
        <div className="flex justify-content-start flex-column w-full">
          <h1 className="mt-4 mb-0 text-gray-600">Welcome to</h1>
          <h1 className="text-6xl md:text-7xl text-gray-900 m-0">EVENTDASH.</h1>
        </div>
        <div className="flex gap-4 flex-column m-4 w-full">
          <Link className="no-underline" to={`/event/${randomEvent.id}`}>
            <FeaturedEvent
              title={randomEvent.title}
              image={randomEvent.image}
              startTime={randomEvent.startTime}
              location={randomEvent.location}
            />
          </Link>

          {nextEvent ? (
            <Link className="no-underline" to={`/event/${nextEvent.id}`}>
              <NextEvent
                title={nextEvent.title}
                image={nextEvent.image}
                startTime={nextEvent.startTime}
                location={nextEvent.location}
              />
            </Link>
          ) : null}
        </div>
      </div>
      <div className="card flex flex-column justify-content-center">
        <Dialog
          header="EVENTDASH. | Winc Academy Final Project"
          visible={showWelcome}
          style={{ width: "800px" }}
          onHide={() => setShowWelcome(false)}
          footer={dialogFooterContent}
        >
          <h1 className="p-card-title">Welcome.</h1>
          <p>
            Thank you for checking out my final project for the Winc Academy
            Front-end Development course. In this popup I will explain what the
            assessment was, what I did extra and what choices I made. If you're
            not interested in that, just close this popup and you will not see
            it again until you clear the browsers localStorage.
          </p>
          <h1 className="p-card-title">The Assessment.</h1>
          <p>
            I had to make an event dashboard. The theme was all up to me, but
            Winc Academy gave me an example events.json to run with JSON-server
            so I knew what the data structure should look like.
          </p>
          <h1 className="p-card-title">Requirements.</h1>
          <h3>General</h3>
          <ul>
            <li className="mb-2">The app has to contain a form</li>
            <li>You have to use React Router</li>
          </ul>
          <h3>Events page</h3>
          <ul>
            <li className="mb-2">
              The page shows a list of all events that are retrieved from the
              back-end server with the following details: title, description,
              image, startTime, endTime and categories.
            </li>
            <li className="mb-2">
              The user can click on an event that leads them to the ‘Event’ page
              using React Router.
            </li>
            <li className="mb-2">
              There is a button that allows the user to add new events using a
              form.
            </li>
            <li className="mb-2">
              A query to add the event to the server is sent as well.
            </li>
            <li className="mb-2">
              A success message is displayed after successfully adding a new
              event.
            </li>
            <li className="mb-2">
              You can search through the events based on the name of the event.
            </li>
            <li className="mb-2">
              You can filter through the list/search results based on
              categories.
            </li>
          </ul>
          <h3>Event page</h3>
          <ul>
            <li className="mb-2">
              The event page shows the following details: title, description,
              image, startTime, endTime, categories and by who it’s created
              (display their name and image).
            </li>
            <li className="mb-2">
              You can click on an edit button where the user can edit the
              details shown on the page.
            </li>
            <li className="mb-2">The back-end server data is updated after.</li>
            <li className="mb-2">
              A success or fail message is shown after a successful update.
            </li>
            <li className="mb-2">
              You can click on a delete button to delete the event.
            </li>
            <li className="mb-2">
              A delete query is sent to delete the data in the back-end.
            </li>
            <li>
              A success or fail message is shown after a successful delete.
            </li>
          </ul>
          <h1 className="p-card-title">Extra Challenge.</h1>
          <p>
            There were a few extras suggested by Winc Academy to implement.
            They're not required, but I implemented all of them
          </p>
          <ul>
            <li className="mb-2">
              Sorting option on events page, based on date, category, and title
              (A-z).
            </li>
            <li className="mb-2">Make the app responsive.</li>
            <li>
              Add pagination to your event list using the json server pagination
              function.I used the slice function, because of the Paginator
              component I used.
            </li>
          </ul>
          <h1 className="p-card-title">Extras I did.</h1>
          <p>
            I did a few extra things that make the app make feel more complete
            to me.
          </p>
          <ul>
            <li className="mb-2">
              Used sessionStorage and localStorage in the app. localStorage is
              being used for keeping track of the "logged in" user.
              sessionStorage is used for keeping track of the used filters on
              the Events page.
            </li>
            <li className="mb-2">
              Create a user profile page, where the user can edit their name and
              image. This originally was suggested as extra by Winc Academy, but
              was removed from the assessment. I decided to build in anyway. The
              page also shows an list of events created by the users.
            </li>
            <li className="mb-2">
              There is no real authentication in the app. But there is a login
              procedure and some features are only available when signed in.
            </li>
            <li>
              Home page with Featured event en Next Event. The featured event is
              a random event from the database (try refresh the page a few
              times). The Next event is the first event after the current day
              and time.
            </li>
          </ul>
          <h1 className="p-card-title">Used libraries.</h1>
          <p>
            I used a few libraries in this app. Here is a list of them and why I
            choose them. I took a bit of a risk with using these libraries,
            because I never used them before, but that's something that will
            happen in the "real world" all the time.
          </p>
          <ul>
            <li className="mb-2">
              <span className="text-yellow-400">Primereact: </span>I used
              Primereact as UI Library for two main reasons. I wanted to know
              how it would be to work on a project with a library I never used
              before (I've worked with Chakra UI in earlier assessments). Also I
              thought Primereact had nicer, more and more complex UI components
              that I could use.
            </li>
            <li className="mb-2">
              <span className="text-yellow-400">Primeflex: </span>Primeflex is
              an addition to Primereact. Where Primereact are just UI
              components, Primeflex adds a lot CSS classes for example flexbox,
              margins, paddings, typography, etc. One really big drawback I
              found using Primeflex is that it can cause an overload on classes
              you need to use on a single component. This can have negative
              impact on readability.
            </li>
            <li className="mb-2">
              <span className="text-yellow-400">Formik & Yup: </span>I used
              Formik and Yup mainly to make form validation easier. Formik made
              it really easy to keep track of the form fields error and touched
              state, where Yup made it really easy to add proper validation
              without writing a lot of code.
            </li>
          </ul>
          <p>
            If you made to here, thanks for reading all of this. You're done
            now. You can close this popup now and it will not be shown again
            until you clear your browsers localStorage.
          </p>
        </Dialog>
      </div>
    </>
  );
};
