import React from "react";
import UsersListPage from "../components/page/usersListPage/index";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage/index";
import UserProvider from "../hooks/useUsers";

const Users = () => {
  const params = useParams();
  const { userId } = params;

  return (
    <>
      <UserProvider>
        {userId ? <UserPage {...{ userId }} /> : <UsersListPage />}
      </UserProvider>
    </>
  );
};

export default Users;
