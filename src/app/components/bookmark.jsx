import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ id, handleBookmark, bookmark }) => {
  return (
    <button
      onClick={() => handleBookmark(id)}
      className="btn btn-success d-block m-auto"
    >
      <i className={`bi bi-bookmark${bookmark ? "-fill" : ""}`}></i>
    </button>
  );
};

Bookmark.propTypes = {
  id: PropTypes.number.isRequired,
  handleBookmark: PropTypes.func.isRequired,
  bookmark: PropTypes.bool.isRequired
};

export default Bookmark;
