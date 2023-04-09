import { redirect } from "react-router-dom";

const ROOT_URL = "http://localhost:3000/";

export const fetchData = async (url_part) => {
  const response = await fetch(`${ROOT_URL}${url_part}`);

  return response;
};

export const deleteData = async (url_part) => {
  const response = await fetch(`${ROOT_URL}${url_part}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  return response;
};

export const addData = async (url_part, values) => {
  const response = await fetch(`${ROOT_URL}${url_part}`, {
    method: "POST",
    body: JSON.stringify(values),
    headers: { "Content-Type": "application/json" },
  });

  return response;
};

export const updateData = async (url_part, values) => {
  const response = await fetch(`${ROOT_URL}${url_part}`, {
    method: "PATCH",
    body: JSON.stringify(values),
    headers: { "Content-Type": "application/json" },
  });

  return response;
};
