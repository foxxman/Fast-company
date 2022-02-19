import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";

const QualitiesList = ({ qualities }) => {
  // console.log("qualities", qualities);
  return (
    <>
      {qualities.map((quality) => (
        <Quality key={quality} qualityId={quality} />
      ))}
    </>
  );
};

QualitiesList.propTypes = {
  qualities: PropTypes.array.isRequired
};

export default QualitiesList;
