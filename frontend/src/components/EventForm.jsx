// @ts-nocheck
import React from "react";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage } from "formik";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { MultiSelect } from "primereact/multiselect";
import { classNames } from "primereact/utils";
import PropTypes from "prop-types";

export const EventForm = ({
  initialValues,
  categories,
  savingForm,
  onSubmit,
}) => {
  // validation rules with Yup
  const validationSchema = Yup.object({
    title: Yup.string()
      .min(2, "Tittle is too short")
      .max(30, "Title is too long")
      .required("Tittle is required"),
    description: Yup.string()
      .min(10, "Description is too short")
      .max(90, "Description is too long")
      .required("Description is required"),
    image: Yup.string()
      .url("Provide a valid URL")
      .required("Image is required"),
    categoryIds: Yup.array()
      .of(Yup.number("No valid number"))
      .min(1, "Select at least 1 category")
      .required("This field is required"),
    location: Yup.string()
      .min(2, "Location is too short")
      .max(100, "Location is too long")
      .required("Location is required"),
    startTime: Yup.date("Start time should be a valid date")
      .min(new Date(), "Start time can not be in the past")
      .required("Start time is required"),
    endTime: Yup.date("Should be a valid date")
      .when(
        "startTime",
        (startTime, schema) =>
          startTime &&
          schema.min(startTime, "End time should be later than Start time")
      )
      .required("End time is required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => onSubmit(values)}
    >
      {(formik) => {
        return (
          // form starts here

          <Form>
            <div className="flex flex-column gap-2">
              <label htmlFor="tittle">Title</label>
              <InputText
                id="title"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={classNames({
                  "p-invalid": formik.touched.title && formik.errors.title,
                })}
              />
              <ErrorMessage name="title">
                {(msg) => <small className="text-red-200">{msg}</small>}
              </ErrorMessage>
            </div>

            <div className="flex flex-column gap-2 mt-4">
              <label htmlFor="description">Description</label>
              <InputTextarea
                id="description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={classNames({
                  "p-invalid":
                    formik.touched.description && formik.errors.description,
                })}
              />
              <div className="flex w-full">
                <ErrorMessage name="description">
                  {(msg) => (
                    <small className="text-red-200 w-full">{msg}</small>
                  )}
                </ErrorMessage>

                {/* Count the length of the description and gives feedback to the user */}
                <small
                  className={classNames({
                    "w-full": true,
                    "text-right": true,
                    "text-gray-200": formik.values.description.length < 10,
                    "text-green-200": formik.values.description.length >= 10,
                    "text-red-200":
                      formik.values.description.length > 90 ||
                      (formik.touched.description && formik.errors.description),
                  })}
                >
                  {formik.values.description.length}/90
                </small>
              </div>
            </div>

            <div className="flex flex-column gap-2 mt-4">
              <label htmlFor="location">Location</label>
              <InputText
                id="location"
                name="location"
                value={formik.values.location}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={classNames({
                  "p-invalid":
                    formik.touched.location && formik.errors.location,
                })}
              />
              <ErrorMessage name="location">
                {(msg) => <small className="text-red-200">{msg}</small>}
              </ErrorMessage>
            </div>

            <div className="flex flex-column gap-2 mt-4">
              <label htmlFor="image">Image URL</label>
              <InputText
                id="image"
                name="image"
                value={formik.values.image}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={classNames({
                  "p-invalid": formik.touched.image && formik.errors.image,
                })}
              />
              <ErrorMessage name="image">
                {(msg) => <small className="text-red-200">{msg}</small>}
              </ErrorMessage>
              {formik.values.image ? (
                <div>
                  <p>Image preview:</p>
                  <img
                    src={formik.values.image}
                    width="300px"
                    alt="Event image"
                    className="border-round"
                  />
                </div>
              ) : null}
            </div>

            <div className="flex flex-column gap-2 mt-4 w-full">
              <label htmlFor="categorIds">Categories</label>
              <div className="flex flex-row flex-wrap  gap-2">
                <MultiSelect
                  name="categoryIds"
                  id="categoryIds"
                  value={formik.values.categoryIds}
                  optionLabel="name"
                  optionValue="id"
                  options={categories}
                  display="chip"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={classNames({
                    "p-invalid":
                      formik.touched.categoryIds && formik.errors.categoryIds,
                    "w-full": formik.values.categoryIds,
                  })}
                />
              </div>
              <ErrorMessage name="categoryIds">
                {(msg) => <small className="text-red-200">{msg}</small>}
              </ErrorMessage>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-column gap-2 mt-4 w-6">
                <label htmlFor="startTime">Start time</label>
                <Calendar
                  id="startTime"
                  name="startTime"
                  value={formik.values.startTime}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  dateFormat="dd/mm/yy"
                  showTime
                  hourFormat="24"
                  className={classNames({
                    "p-invalid":
                      formik.touched.startTime && formik.errors.startTime,
                  })}
                />
                <ErrorMessage name="startTime">
                  {(msg) => <small className="text-red-200">{msg}</small>}
                </ErrorMessage>
              </div>
              <div className="flex flex-column gap-2 mt-4 w-6">
                <label htmlFor="endTime">End time</label>
                <Calendar
                  id="endTime"
                  name="endTime"
                  value={formik.values.endTime}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  dateFormat="dd/mm/yy"
                  showTime
                  hourFormat="24"
                  className={classNames({
                    "p-invalid":
                      formik.touched.endTime && formik.errors.endTime,
                  })}
                />
                <ErrorMessage name="endTime">
                  {(msg) => <small className="text-red-200">{msg}</small>}
                </ErrorMessage>
              </div>
            </div>

            <div className="flex gap-4 mt-5 justify-content-center">
              <Button
                severity="success"
                type="submit"
                icon="pi pi-save"
                label={savingForm ? "Saving..." : "Save event"}
                loading={savingForm}
                disabled={savingForm}
                size="large"
                raised
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

EventForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  savingForm: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
