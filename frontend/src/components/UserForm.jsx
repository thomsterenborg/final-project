import React from "react";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage } from "formik";
import { InputText } from "primereact/inputtext";
import PropTypes from "prop-types";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";

export const UserForm = ({ initialValues, savingForm, onSubmit }) => {
  //Yup validation rules
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Tittle is too short")
      .max(50, "Title is too long")
      .required("Tittle is required"),
    image: Yup.string()
      .url("Provide a valid URL")
      .required("Image is required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => onSubmit(values)}
    >
      {(formik) => {
        return (
          <Form>
            <div className="flex flex-column gap-2">
              <label htmlFor="name">Full name</label>
              <InputText
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={classNames({
                  "p-invalid": formik.touched.name && formik.errors.name,
                })}
              />
              <ErrorMessage name="name">
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
            <div className="flex gap-4 mt-5 justify-content-center">
              <Button
                severity="success"
                type="submit"
                icon="pi pi-save"
                label={savingForm ? "Saving..." : "Save profile"}
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

UserForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  savingForm: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
