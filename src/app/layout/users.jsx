import React from "react";
import UsersListPage from "../components/page/usersListPage/index";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage/index";

const Users = () => {
  const params = useParams();
  const { userId } = params;

  return <>{userId ? <UserPage {...{ userId }} /> : <UsersListPage />}</>;
};

export default Users;
