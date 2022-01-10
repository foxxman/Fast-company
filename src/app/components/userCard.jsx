import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import API from "../api";
import UserInfo from "./userInfo";

const UserCard = ({ userId }) => {
  const [user, setUser] = useState();
  useEffect(() => API.users.getById(userId).then((user) => setUser(user)), []);

  return user ? <UserInfo {...{ user }} /> : <h1>Loading...</h1>;
};

UserCard.propTypes = {
  userId: PropTypes.string
};

export default UserCard;
