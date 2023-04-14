import React from "react";
import PropTypes from "prop-types";
import { Tag } from "primereact/tag";

export const EventCategories = ({ categories, categoryIds }) => {
  //generates event tags for every category of a event
  return (
    <div className="flex gap-2">
      {categories.map((category) =>
        categoryIds.includes(category.id) ? (
          <Tag
            key={category.id}
            icon="pi pi-tag"
            severity="info"
            value={category.name}
          />
        ) : null
      )}
    </div>
  );
};

EventCategories.propTypes = {
  categories: PropTypes.array.isRequired,
  categoryIds: PropTypes.array.isRequired,
};
