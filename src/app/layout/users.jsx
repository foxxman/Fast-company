import React from "react";
import UsersList from "../components/usersList";
import { useParams } from "react-router-dom";
import UserCard from "../components/userCard";

const Users = () => {
  const params = useParams();
  const { userId } = params;

  return <>{userId ? <UserCard {...{ userId }} /> : <UsersList />}</>;
};

export default Users;
