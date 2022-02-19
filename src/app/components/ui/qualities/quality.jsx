import React from "react";
import PropTypes from "prop-types";
import { useQuality } from "../../../hooks/useQuality";

const Quality = ({ qualityId }) => {
  const { getQuality } = useQuality();
  const quality = getQuality(qualityId);
  return (
    <span className={`badge bg-${quality.color} m-1`}>{quality.name}</span>
  );
};

Quality.propTypes = {
  qualityId: PropTypes.string.isRequired
};

export default Quality;
