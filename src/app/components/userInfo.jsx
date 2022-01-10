import React from "react";
import PropTypes from "prop-types";
import QualitiesList from "./qualitiesList";
import { Link } from "react-router-dom";

const UserInfo = ({ user }) => {
  return (
    <div>
      <h1>{user.name}</h1>
      <h2>{`Профессия: ${user.profession.name}`}</h2>
      <div>
        <QualitiesList qualities={user.qualities} />
      </div>
      <p>{`Встречь: ${user.completedMeetings}`}</p>
      <p>{`Рейтинг: ${user.rate}`}</p>
      <Link to="/users">
        <button>Все пользователи</button>
      </Link>
    </div>
  );
};

UserInfo.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserInfo;
