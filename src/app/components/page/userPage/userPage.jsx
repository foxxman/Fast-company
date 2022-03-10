import React from "react";
import PropTypes from "prop-types";
import UserInfo from "./userInfo";
import { useUser } from "../../../hooks/useUsers";

const UserPage = ({ userId }) => {
  const { getUserById } = useUser();
  const user = getUserById(userId);

  return user ? <UserInfo {...{ user }} /> : <h1>Loading...</h1>;
};

UserPage.propTypes = {
  userId: PropTypes.string
};

export default UserPage;
