const getHumanMonth = (date) => {
  return date.getMonth() + 1; //getMonth starts at 0 and ends at 11
};

//convert ISO 8601 date to Weekday DD/MM/YYYY HH:MM
export const transformDate = (iso8601Date) => {
  const eventDate = new Date(iso8601Date);
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const date = `${
    weekday[eventDate.getDay()]
  } ${eventDate.getDate()}-${getHumanMonth(
    eventDate
  )}-${eventDate.getFullYear()} ${eventDate.getHours()}:${
    (eventDate.getMinutes() < 10 ? "0" : "") + eventDate.getMinutes()
  }`;
  return date;
};
