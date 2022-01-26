import React from "react";
import PropTypes from "prop-types";

const Quality = ({ quality }) => {
  return (
    <span className={`badge bg-${quality.color} m-1`}>{quality.name}</span>
  );
};

Quality.propTypes = {
  quality: PropTypes.object.isRequired
};

export default Quality;
