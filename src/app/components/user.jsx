import React from "react";
import PropTypes from "prop-types";
import Bookmark from "./bookmark";
import Quality from "./quality";

const User = ({ handleBookmark, handleDelete, user }) => {
  return (
    <tr>
      <td>{user.name}</td>
      <td>
        {user.qualities.map((quality) => (
          <Quality key={quality._id} quality={quality} />
        ))}
      </td>
      <td>{user.profession.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{`${user.rate}/5`}</td>
      <td>
        <Bookmark
          id={user._id}
          handleBookmark={handleBookmark}
          bookmark={user.bookmark}
        />
      </td>
      <td>
        <button
          className="btn btn-danger btn-sm d-block m-auto"
          onClick={() => handleDelete(user._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

User.propTypes = {
  user: PropTypes.object.isRequired,
  handleBookmark: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default User;
