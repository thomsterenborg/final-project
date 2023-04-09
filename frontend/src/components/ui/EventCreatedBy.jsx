import React from "react";
import PropTypes from "prop-types";
import { Avatar } from "primereact/avatar";

export const EventCreatedBy = ({ users, createdBy }) => {
  //gets the name of the user who created the event.

  return (
    <h4 className="p-card-subtitle mt-6">
      <span className="text-yellow-500">Create by: </span>
      {users.map((user) =>
        user.id === createdBy ? (
          <div key={user.id} className=" flex align-items-center gap-2 mt-2">
            <Avatar icon="pi pi-user" image={user.image} shape="circle" />
            {user.name}
          </div>
        ) : (
          ""
        )
      )}
    </h4>
  );
};

EventCreatedBy.propTypes = {
  users: PropTypes.array.isRequired,
  createdBy: PropTypes.number.isRequired,
};
