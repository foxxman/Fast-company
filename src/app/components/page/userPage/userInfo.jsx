import React from "react";
import PropTypes from "prop-types";
import Qualities from "../../ui/qualities";
import { Link } from "react-router-dom";

const UserInfo = ({ user }) => {
  return (
    <div>
      <h1>{user.name}</h1>
      <h2>{`Профессия: ${user.profession.name}`}</h2>
      <div>
        <Qualities qualities={user.qualities} />
      </div>
      <p>{`Встречь: ${user.completedMeetings}`}</p>
      <p>{`Рейтинг: ${user.rate}`}</p>
      <Link to={`/users/${user._id}/edit`}>
        <button>Изменить</button>
      </Link>
    </div>
  );
};

UserInfo.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserInfo;
